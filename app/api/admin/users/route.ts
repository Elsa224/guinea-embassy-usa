import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { createUserSchema, paginationSchema } from '@/lib/validations'
import { hasPermission } from '@/lib/permissions'
import { withLogging, logDataChange } from '@/lib/middleware/logging'
import { logger } from '@/lib/logger'
import bcrypt from 'bcryptjs'

async function handleGET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'manage_users')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const validation = paginationSchema.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    search: searchParams.get('search'),
    status: searchParams.get('status'), // isActive filter
    sortBy: searchParams.get('sortBy'),
    sortOrder: searchParams.get('sortOrder'),
  })

  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', issues: validation.error.issues },
      { status: 400 }
    )
  }

  const { page, limit, search, status, sortBy, sortOrder } = validation.data

  const where: any = {}
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }
  
  if (status === 'active') where.isActive = true
  if (status === 'inactive') where.isActive = false

  const orderBy: any = {}
  if (sortBy) {
    orderBy[sortBy] = sortOrder
  } else {
    orderBy.createdAt = 'desc'
  }

  try {
    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          lastLoginAt: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              posts: true,
              media: true,
            },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    await logger.logError('Failed to fetch users', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

async function handlePOST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'manage_users')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const validation = createUserSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12)

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        passwordHash,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Log the creation
    await logDataChange(
      'USER',
      user.id,
      'CREATE',
      null,
      { ...user, passwordHash: '[REDACTED]' },
      request
    )

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    await logger.logError('Failed to create user', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)
export const POST = withLogging(handlePOST)