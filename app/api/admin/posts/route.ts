import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { createPostSchema, paginationSchema } from '@/lib/validations'
import { hasPermission } from '@/lib/permissions'
import { withLogging, logDataChange } from '@/lib/middleware/logging'
import { logger } from '@/lib/logger'

function generateSlug(title: string): string {
  return title
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

  if (!hasPermission(session.user.role, 'edit_posts')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const validation = paginationSchema.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    search: searchParams.get('search'),
    status: searchParams.get('status'),
    type: searchParams.get('type'),
    categoryId: searchParams.get('categoryId'),
    sortBy: searchParams.get('sortBy'),
    sortOrder: searchParams.get('sortOrder'),
  })

  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', issues: validation.error.issues },
      { status: 400 }
    )
  }

  const { page, limit, search, status, type, categoryId, sortBy, sortOrder } = validation.data

  const where: any = {}
  
  if (search && search.trim()) {
    where.OR = [
      { title: { path: ['fr'], string_contains: search } },
      { title: { path: ['en'], string_contains: search } },
      { content: { path: ['fr'], string_contains: search } },
      { content: { path: ['en'], string_contains: search } },
    ]
  }
  
  if (status && status.trim()) where.status = status
  if (type && type.trim()) where.type = type
  if (categoryId && categoryId.trim()) where.categoryId = categoryId

  const orderBy: any = {}
  if (sortBy && sortBy.trim()) {
    orderBy[sortBy] = sortOrder || 'desc'
  } else {
    orderBy.createdAt = 'desc'
  }

  try {
    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        include: {
          author: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              color: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          _count: {
            select: {
              media: true,
            },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.post.count({ where }),
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    await logger.logError('Failed to fetch posts', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

async function handlePOST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'create_posts')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const validation = createPostSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data
    const slug = generateSlug(data.title.fr)

    // Check if slug already exists
    const existingPost = await db.post.findUnique({ where: { slug } })
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 409 }
      )
    }

    const { tags, ...postData } = data
    
    const post = await db.post.create({
      data: {
        ...postData,
        slug,
        authorId: session.user.id,
        publishedAt: postData.status === 'PUBLISHED' ? new Date() : null,
        // Handle tags if they exist
        ...(tags && tags.length > 0 && {
          tags: {
            connect: tags.map(tagId => ({ id: tagId }))
          }
        })
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    // Log the creation
    await logDataChange(
      'POST',
      post.id,
      'CREATE',
      null,
      post,
      request
    )

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    await logger.logError('Failed to create post', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)
export const POST = withLogging(handlePOST)