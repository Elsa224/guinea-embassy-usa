import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: paramSlug } = await params
    // Convert the slug parameter which might be an array to a proper path
    const slug = Array.isArray(paramSlug) ? paramSlug.join('/') : paramSlug

    const page = await prisma.page.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED'
      },
      include: {
        parent: true,
        children: {
          where: { status: 'PUBLISHED' },
          orderBy: { order: 'asc' }
        },
      },
    })

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
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