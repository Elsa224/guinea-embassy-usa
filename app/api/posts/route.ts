import { NextResponse } from "next/server"
import { db as prisma } from "@/lib/db"
import { PostType, PostStatus } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") as PostType | null
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"
    const lang = searchParams.get("lang") || "fr"
    
    const skip = (page - 1) * limit

    const where = {
      status: PostStatus.PUBLISHED,
      publishedAt: {
        lte: new Date()
      },
      ...(type && { type }),
      ...(category && { category: { slug: category } }),
      ...(featured && { featured: true })
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { featured: "desc" },
          { publishedAt: "desc" }
        ],
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          category: true,
          tags: true,
          media: true
        }
      }),
      prisma.post.count({ where })
    ])

    // Transform posts to include only the requested language
    const transformedPosts = posts.map(post => ({
      id: post.id,
      title: (post.title as any)[lang] || (post.title as any).fr,
      slug: post.slug,
      excerpt: post.excerpt ? (post.excerpt as any)[lang] || (post.excerpt as any).fr : null,
      content: (post.content as any)[lang] || (post.content as any).fr,
      featuredImage: post.featuredImage,
      type: post.type,
      featured: post.featured,
      publishedAt: post.publishedAt,
      views: post.views,
      author: {
        id: post.author.id,
        name: post.author.name
      },
      category: post.category ? {
        id: post.category.id,
        name: (post.category.name as any)[lang] || (post.category.name as any).fr,
        slug: post.category.slug,
        color: post.category.color,
        icon: post.category.icon
      } : null,
      tags: post.tags,
      media: post.media.map(m => ({
        id: m.id,
        url: m.url,
        thumbnailUrl: m.thumbnailUrl,
        alt: m.alt,
        caption: m.caption,
        mimeType: m.mimeType
      }))
    }))

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}