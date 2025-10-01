import { NextResponse } from "next/server"
import { db as prisma } from "@/lib/db"
import { PostStatus } from "@prisma/client"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get("lang") || "fr"
    const { slug } = await params

    const post = await prisma.post.findFirst({
      where: {
        slug,
        status: PostStatus.PUBLISHED,
        publishedAt: {
          lte: new Date()
        }
      },
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
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    })

    // Transform post to include only the requested language
    const transformedPost = {
      id: post.id,
      title: (post.title as any)[lang] || (post.title as any).fr,
      slug: post.slug,
      excerpt: post.excerpt ? (post.excerpt as any)[lang] || (post.excerpt as any).fr : null,
      content: (post.content as any)[lang] || (post.content as any).fr,
      featuredImage: post.featuredImage,
      type: post.type,
      featured: post.featured,
      publishedAt: post.publishedAt,
      views: post.views + 1,
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
        mimeType: m.mimeType,
        dimensions: m.dimensions
      }))
    }

    // Get related posts
    const relatedPosts = await prisma.post.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        publishedAt: {
          lte: new Date()
        },
        id: { not: post.id },
        OR: [
          { categoryId: post.categoryId },
          { type: post.type }
        ]
      },
      take: 4,
      orderBy: { publishedAt: "desc" },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    const transformedRelatedPosts = relatedPosts.map(p => ({
      id: p.id,
      title: (p.title as any)[lang] || (p.title as any).fr,
      slug: p.slug,
      excerpt: p.excerpt ? (p.excerpt as any)[lang] || (p.excerpt as any).fr : null,
      featuredImage: p.featuredImage,
      type: p.type,
      publishedAt: p.publishedAt,
      author: {
        id: p.author.id,
        name: p.author.name
      },
      category: p.category ? {
        name: (p.category.name as any)[lang] || (p.category.name as any).fr,
        slug: p.category.slug
      } : null
    }))

    return NextResponse.json({
      post: transformedPost,
      relatedPosts: transformedRelatedPosts
    })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    )
  }
}