import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params
    const fullSlug = slug.join('/')

    const page = await prisma.page.findUnique({
      where: { 
        slug: fullSlug,
        status: 'PUBLISHED' // Only return published pages for public API
      },
      include: {
        parent: true,
        children: {
          where: {
            status: 'PUBLISHED'
          }
        },
      },
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}