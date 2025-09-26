import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db as prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has analytics access
    if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can access analytics" },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") || "7d";
    
    // Calculate date range
    const now = new Date();
    const getDaysAgo = (days: number) => {
      const date = new Date();
      date.setDate(now.getDate() - days);
      return date;
    };

    let startDate: Date;
    switch (period) {
      case "24h":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startDate = getDaysAgo(7);
        break;
      case "30d":
        startDate = getDaysAgo(30);
        break;
      case "90d":
        startDate = getDaysAgo(90);
        break;
      default:
        startDate = getDaysAgo(7);
    }

    // Get basic statistics
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalUsers,
      activeUsers,
      totalMedia,
      recentActivity,
      postsByStatus,
      postsByType,
      usersByRole,
      dailyStats
    ] = await Promise.all([
      // Total posts
      prisma.post.count(),
      
      // Published posts
      prisma.post.count({
        where: { status: "PUBLISHED" }
      }),
      
      // Draft posts
      prisma.post.count({
        where: { status: "DRAFT" }
      }),
      
      // Total users
      prisma.user.count(),
      
      // Active users (logged in within period)
      prisma.user.count({
        where: {
          isActive: true
        }
      }),
      
      // Total media files
      prisma.media.count(),
      
      // Recent activity from audit logs
      prisma.auditLog.findMany({
        where: {
          createdAt: {
            gte: startDate
          }
        },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      }),
      
      // Posts by status
      prisma.post.groupBy({
        by: ['status'],
        _count: {
          id: true
        }
      }),
      
      // Posts by type
      prisma.post.groupBy({
        by: ['type'],
        _count: {
          id: true
        }
      }),
      
      // Users by role
      prisma.user.groupBy({
        by: ['role'],
        _count: {
          id: true
        }
      }),
      
      // Daily activity stats (simplified version)
      prisma.auditLog.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: startDate
          }
        },
        _count: {
          id: true
        }
      })
    ]);

    // Process daily stats for charts
    const dailyActivity = dailyStats.reduce((acc: Record<string, number>, log: any) => {
      const date = log.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + log._count.id;
      return acc;
    }, {});

    // Fill missing dates with 0
    const days = period === "24h" ? 1 : parseInt(period.replace('d', ''));
    const chartData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = getDaysAgo(i);
      const dateStr = date.toISOString().split('T')[0];
      chartData.push({
        date: dateStr,
        activity: dailyActivity[dateStr] || 0,
        label: date.toLocaleDateString('fr-FR', { 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }

    const analytics = {
      overview: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalUsers,
        activeUsers,
        totalMedia,
        engagementRate: publishedPosts > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0
      },
      charts: {
        dailyActivity: chartData,
        postsByStatus: postsByStatus.map((item: any) => ({
          status: item.status,
          count: item._count.id
        })),
        postsByType: postsByType.map((item: any) => ({
          type: item.type,
          count: item._count.id
        })),
        usersByRole: usersByRole.map((item: any) => ({
          role: item.role,
          count: item._count.id
        }))
      },
      recentActivity: recentActivity.map((log: any) => ({
        id: log.id,
        action: log.action,
        entity: log.entity,
        user: log.user?.name || 'System',
        createdAt: log.createdAt,
        description: `${log.action} ${log.entity.toLowerCase()}`
      }))
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}