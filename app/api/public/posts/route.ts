import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const lang = searchParams.get('lang') || 'fr'
    
    const skip = (page - 1) * limit
    
    // Build where conditions
    const where: any = {
      status: 'PUBLISHED',
      publishedAt: {
        lte: new Date() // Only published articles with publishedAt in the past/present
      }
    }
    
    if (type) {
      where.type = type
    }
    
    if (category) {
      where.category = {
        slug: category
      }
    }
    
    if (featured === 'true') {
      where.featured = true
    }

    // Get posts with pagination
    const [posts, totalCount] = await Promise.all([
      db.post.findMany({
        where,
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
        },
        orderBy: [
          { featured: 'desc' },
          { publishedAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      db.post.count({ where })
    ])

    // Transform posts to include only the requested language content
    const transformedPosts = posts.map(post => {
      const title = post.title as any
      const content = post.content as any
      const excerpt = post.excerpt as any
      
      return {
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
        readingTime: Math.ceil(((content.fr || content.en || '').length || 0) / 1000) // Rough estimate: 1000 chars = 1 min
      }
    })

    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit
      }
    })

  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    )
  }
}