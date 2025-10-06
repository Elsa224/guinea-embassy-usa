import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const pages = await prisma.page.findMany({
      include: {
        parent: true,
        children: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json({
      message: 'Pages fetched successfully',
      count: pages.length,
      pages: pages.map(page => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        status: page.status,
        serviceType: page.serviceType,
        template: page.template,
        order: page.order,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
      }))
    })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages', details: error },
      { status: 500 }
    )
  }
}