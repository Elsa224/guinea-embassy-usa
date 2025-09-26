import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { updatePostSchema } from '@/lib/validations'
import { hasPermission, canEditPost, canDeletePost } from '@/lib/permissions'
import { withLogging, logDataChange } from '@/lib/middleware/logging'
import { logger } from '@/lib/logger'

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

  if (!hasPermission(session.user.role, 'edit_posts') && !hasPermission(session.user.role, 'edit_own_posts')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const post = await db.post.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
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
        media: {
          select: {
            id: true,
            filename: true,
            url: true,
            alt: true,
            caption: true,
          },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check if user can edit this post
    if (!canEditPost(session.user.role, session.user.id, post.authorId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(post)
  } catch (error) {
    await logger.logError('Failed to fetch post', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
      entityId: params.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch post' },
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
    // Get the existing post first
    const existingPost = await db.post.findUnique({
      where: { id: params.id },
      include: {
        author: true,
      },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check permissions
    if (!canEditPost(session.user.role, session.user.id, existingPost.authorId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validation = updatePostSchema.safeParse({ ...body, id: params.id })

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data
    const { tags, ...updateData } = data
    delete (updateData as any).id

    // Handle status changes
    if (data.status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED') {
      (updateData as any).publishedAt = new Date()
    } else if (data.status !== 'PUBLISHED' && existingPost.status === 'PUBLISHED') {
      (updateData as any).publishedAt = null
    }

    const updatedPost = await db.post.update({
      where: { id: params.id },
      data: {
        ...updateData,
        // Handle tags if they exist
        ...(tags && {
          tags: {
            set: tags.map(tagId => ({ id: tagId }))
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

    // Log the update
    await logDataChange(
      'POST',
      params.id,
      'UPDATE',
      existingPost,
      updatedPost,
      request
    )

    return NextResponse.json(updatedPost)
  } catch (error) {
    await logger.logError('Failed to update post', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
      entityId: params.id,
    })
    return NextResponse.json(
      { error: 'Failed to update post' },
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

  try {
    // Get the existing post first
    const existingPost = await db.post.findUnique({
      where: { id: params.id },
      include: {
        author: true,
      },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Check permissions
    if (!canDeletePost(session.user.role, session.user.id, existingPost.authorId)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await db.post.delete({
      where: { id: params.id },
    })

    // Log the deletion
    await logDataChange(
      'POST',
      params.id,
      'DELETE',
      existingPost,
      null,
      request
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    await logger.logError('Failed to delete post', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
      entityId: params.id,
    })
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)
export const PUT = withLogging(handlePUT)
export const DELETE = withLogging(handleDELETE)