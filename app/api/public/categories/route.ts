import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        color: true,
        _count: {
          select: {
            posts: {
              where: {
                status: 'PUBLISHED',
                publishedAt: {
                  lte: new Date()
                }
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Transform to include post count and proper name handling
    const transformedCategories = categories.map(category => {
      const name = category.name as any
      const description = category.description as any
      
      return {
        id: category.id,
        name: name.fr || name.en || 'Untitled',
        slug: category.slug,
        description: description?.fr || description?.en,
        color: category.color,
        postCount: category._count.posts
      }
    })

    return NextResponse.json({
      categories: transformedCategories
    })

  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des catégories' },
      { status: 500 }
    )
  }
}

// Cache categories for better performance
export const revalidate = 1800 // Revalidate every 30 minutes