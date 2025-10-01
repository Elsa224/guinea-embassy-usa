import { NextResponse } from "next/server"
import { db as prisma } from "@/lib/db"
import { PostStatus } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get("lang") || "fr"
    const includeCount = searchParams.get("includeCount") === "true"

    const categories = await prisma.category.findMany({
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" }
      ],
      include: {
        _count: includeCount ? {
          select: {
            posts: {
              where: {
                status: PostStatus.PUBLISHED,
                publishedAt: {
                  lte: new Date()
                }
              }
            }
          }
        } : false,
        parent: true,
        children: true
      }
    })

    // Build hierarchical structure
    const buildHierarchy = (categories: any[], parentId: string | null = null): any[] => {
      return categories
        .filter(cat => cat.parentId === parentId)
        .map(cat => ({
          id: cat.id,
          name: (cat.name as any)[lang] || (cat.name as any).fr,
          slug: cat.slug,
          description: cat.description ? (cat.description as any)[lang] || (cat.description as any).fr : null,
          color: cat.color,
          icon: cat.icon,
          order: cat.order,
          postCount: cat._count?.posts || 0,
          children: buildHierarchy(categories, cat.id)
        }))
    }

    const hierarchicalCategories = buildHierarchy(categories)

    return NextResponse.json({
      categories: hierarchicalCategories
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}