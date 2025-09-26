import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { updateUserSchema } from '@/lib/validations'
import { hasPermission, canManageUser } from '@/lib/permissions'
import { withLogging, logDataChange } from '@/lib/middleware/logging'
import { logger } from '@/lib/logger'
import bcrypt from 'bcryptjs'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

async function handleGET(request: NextRequest, context: RouteParams) {
  const params = await context.params
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Allow users to view their own profile or require manage_users permission
  if (params.id !== session.user.id && !hasPermission(session.user.role, 'manage_users')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
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
            auditLogs: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    await logger.logError('Failed to fetch user', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
      entityId: params.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

async function handlePUT(request: NextRequest, context: RouteParams) {
  const params = await context.params
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get the existing user first
    const existingUser = await db.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const validation = updateUserSchema.safeParse({ ...body, id: params.id })

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data
    const isOwnProfile = params.id === session.user.id

    // Permission checks
    if (!isOwnProfile) {
      if (!hasPermission(session.user.role, 'manage_users')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
      
      if (!canManageUser(session.user.role, existingUser.role)) {
        return NextResponse.json(
          { error: 'Cannot manage user with equal or higher role' },
          { status: 403 }
        )
      }
    }

    // Users can only update their own name, email, and password
    // Admins can update role and isActive status
    const updateData: any = {}
    
    if (data.name) updateData.name = data.name
    if (data.email && data.email !== existingUser.email) {
      // Check if email is already taken
      const emailExists = await db.user.findUnique({
        where: { email: data.email },
      })
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 409 }
        )
      }
      updateData.email = data.email
    }
    
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 12)
    }

    // Only admins can change role and active status
    if (!isOwnProfile && hasPermission(session.user.role, 'manage_users')) {
      if (data.role !== undefined) updateData.role = data.role
      if (data.isActive !== undefined) updateData.isActive = data.isActive
    }

    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Log the update (without sensitive data)
    const logData: any = { ...updatedUser }
    if (updateData.passwordHash) {
      logData.passwordHash = '[REDACTED]'
    }

    await logDataChange(
      'USER',
      params.id,
      'UPDATE',
      { ...existingUser, passwordHash: '[REDACTED]' },
      logData,
      request
    )

    return NextResponse.json(updatedUser)
  } catch (error) {
    await logger.logError('Failed to update user', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
      entityId: params.id,
    })
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

async function handleDELETE(request: NextRequest, context: RouteParams) {
  const params = await context.params
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'manage_users')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Prevent self-deletion
  if (params.id === session.user.id) {
    return NextResponse.json(
      { error: 'Cannot delete your own account' },
      { status: 400 }
    )
  }

  try {
    // Get the existing user first
    const existingUser = await db.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!canManageUser(session.user.role, existingUser.role)) {
      return NextResponse.json(
        { error: 'Cannot delete user with equal or higher role' },
        { status: 403 }
      )
    }

    await db.user.delete({
      where: { id: params.id },
    })

    // Log the deletion
    await logDataChange(
      'USER',
      params.id,
      'DELETE',
      { ...existingUser, passwordHash: '[REDACTED]' },
      null,
      request
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    await logger.logError('Failed to delete user', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
      entityId: params.id,
    })
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)
export const PUT = withLogging(handlePUT)
export const DELETE = withLogging(handleDELETE)