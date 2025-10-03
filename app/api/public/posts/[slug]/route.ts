import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'fr'

    const post = await db.post.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
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
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true
          }
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        media: {
          select: {
            id: true,
            url: true,
            alt: true,
            caption: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    // Transform post to include only the requested language content
    const title = post.title as any
    const content = post.content as any
    const excerpt = post.excerpt as any
    
    const transformedPost = {
      id: post.id,
      slug: post.slug,
      title: lang === 'en' ? (title.en || title.fr) : (title.fr || title.en),
      content: lang === 'en' ? (content.en || content.fr) : (content.fr || content.en),
      excerpt: lang === 'en' ? (excerpt?.en || excerpt?.fr) : (excerpt?.fr || excerpt?.en),
      type: post.type,
      status: post.status,
      featured: post.featured,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      category: post.category ? {
        ...post.category,
        name: (post.category.name as any).fr || (post.category.name as any).en || 'Untitled'
      } : null,
      tags: post.tags,
      media: post.media,
      readingTime: Math.ceil(((content.fr || content.en || '').length || 0) / 1000)
    }

    // Get related posts (same category, excluding current post)
    const relatedPosts = await db.post.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: {
          lte: new Date()
        },
        categoryId: post.categoryId,
        NOT: {
          id: post.id
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        },
        category: {
          select: {
            name: true,
            slug: true,
            color: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 3
    })

    const transformedRelatedPosts = relatedPosts.map(relatedPost => {
      const relatedTitle = relatedPost.title as any
      const relatedExcerpt = relatedPost.excerpt as any
      
      return {
        id: relatedPost.id,
        slug: relatedPost.slug,
        title: lang === 'en' ? (relatedTitle.en || relatedTitle.fr) : (relatedTitle.fr || relatedTitle.en),
        excerpt: lang === 'en' ? (relatedExcerpt?.en || relatedExcerpt?.fr) : (relatedExcerpt?.fr || relatedExcerpt?.en),
        publishedAt: relatedPost.publishedAt,
        author: relatedPost.author,
        category: relatedPost.category ? {
          ...relatedPost.category,
          name: (relatedPost.category.name as any).fr || (relatedPost.category.name as any).en || 'Untitled'
        } : null,
        readingTime: Math.ceil(((relatedTitle.fr || relatedTitle.en || '').length || 0) / 1000)
      }
    })

    return NextResponse.json({
      post: transformedPost,
      relatedPosts: transformedRelatedPosts
    })

  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'article' },
      { status: 500 }
    )
  }
}