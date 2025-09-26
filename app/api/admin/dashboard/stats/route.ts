import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { hasPermission } from '@/lib/permissions'
import { withLogging } from '@/lib/middleware/logging'
import { logger } from '@/lib/logger'

async function handleGET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'view_analytics')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const now = new Date()
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      totalUsers,
      activeUsers,
      totalCategories,
      recentPosts,
      recentUsers,
      postsByStatus,
      postsByType,
      usersByRole,
      recentActivity,
    ] = await Promise.all([
      // Total posts
      db.post.count(),
      
      // Published posts
      db.post.count({
        where: { status: 'PUBLISHED' },
      }),
      
      // Draft posts
      db.post.count({
        where: { status: 'DRAFT' },
      }),
      
      // Total users
      db.user.count(),
      
      // Active users (logged in last 30 days)
      db.user.count({
        where: {
          lastLoginAt: { gte: last30Days },
          isActive: true,
        },
      }),
      
      // Total categories
      db.category.count(),
      
      // Recent posts (last 7 days)
      db.post.count({
        where: {
          createdAt: { gte: last7Days },
        },
      }),
      
      // Recent users (last 7 days)
      db.user.count({
        where: {
          createdAt: { gte: last7Days },
        },
      }),
      
      // Posts by status
      db.post.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      
      // Posts by type
      db.post.groupBy({
        by: ['type'],
        _count: { type: true },
      }),
      
      // Users by role
      db.user.groupBy({
        by: ['role'],
        _count: { role: true },
        where: { isActive: true },
      }),
      
      // Recent activity (audit logs)
      db.auditLog.findMany({
        where: {
          createdAt: { gte: last7Days },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ])

    const stats = {
      overview: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalUsers,
        activeUsers,
        totalCategories,
        recentPosts,
        recentUsers,
      },
      charts: {
        postsByStatus: postsByStatus.map(item => ({
          status: item.status,
          count: item._count.status,
        })),
        postsByType: postsByType.map(item => ({
          type: item.type,
          count: item._count.type,
        })),
        usersByRole: usersByRole.map(item => ({
          role: item.role,
          count: item._count.role,
        })),
      },
      recentActivity: recentActivity.map(activity => ({
        id: activity.id,
        action: activity.action,
        entity: activity.entity,
        entityId: activity.entityId,
        user: activity.user ? {
          name: activity.user.name,
          email: activity.user.email,
        } : null,
        createdAt: activity.createdAt,
      })),
    }

    return NextResponse.json(stats)
  } catch (error) {
    await logger.logError('Failed to fetch dashboard stats', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)