import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { createCategorySchema, paginationSchema } from '@/lib/validations'
import { hasPermission } from '@/lib/permissions'
import { withLogging, logDataChange } from '@/lib/middleware/logging'
import { logger } from '@/lib/logger'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáäâ]/g, 'a')
    .replace(/[èéëê]/g, 'e')
    .replace(/[ìíïî]/g, 'i')
    .replace(/[òóöô]/g, 'o')
    .replace(/[ùúüû]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function handleGET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'manage_categories')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const includeEmpty = searchParams.get('includeEmpty') === 'true'
  
  try {
    const categories = await db.category.findMany({
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'asc' },
      ],
    })

    // Filter out empty categories if requested
    const filteredCategories = includeEmpty 
      ? categories 
      : categories.filter(cat => cat._count.posts > 0 || cat.children.length > 0)

    return NextResponse.json(filteredCategories)
  } catch (error) {
    await logger.logError('Failed to fetch categories', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

async function handlePOST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'manage_categories')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const validation = createCategorySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data
    const slug = generateSlug(data.name.fr)

    // Check if slug already exists
    const existingCategory = await db.category.findUnique({ where: { slug } })
    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 409 }
      )
    }

    const category = await db.category.create({
      data: {
        ...data,
        slug,
      },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: {
            posts: true,
          },
        },
      },
    })

    // Log the creation
    await logDataChange(
      'CATEGORY',
      category.id,
      'CREATE',
      null,
      category,
      request
    )

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    await logger.logError('Failed to create category', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)
export const POST = withLogging(handlePOST)