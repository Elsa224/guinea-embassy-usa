import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const updatePageSchema = z.object({
  title: z.object({
    fr: z.string().min(1),
    en: z.string().min(1),
  }).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-\/]+$/).optional(), // Allow slashes in slugs
  content: z.object({
    fr: z.string(),
    en: z.string(),
  }).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
  template: z.string().optional(),
  metaTitle: z.object({
    fr: z.string().optional(),
    en: z.string().optional(),
  }).optional().nullable(), // Allow null values
  metaDescription: z.object({
    fr: z.string().optional(),
    en: z.string().optional(),
  }).optional().nullable(), // Allow null values
  order: z.number().optional(),
  parentId: z.string().optional().nullable(),
  serviceType: z.string().optional().nullable(),
  requiredDocs: z.object({
    fr: z.array(z.string()).optional(),
    en: z.array(z.string()).optional(),
  }).optional().nullable(),
    //@ts-ignore
  fees: z.record(z.number()).optional().nullable(),
  processingTime: z.object({
    fr: z.string().optional(),
    en: z.string().optional(),
  }).optional().nullable(),
  paymentLink: z.string().url().optional().nullable(),
  formLink: z.string().url().optional().nullable(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = updatePageSchema.parse(body)

    // Check if the page exists
    const existingPage = await prisma.page.findUnique({
      where: { id },
    })

    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Check if slug is being changed and if it's already taken
    if (validatedData.slug && validatedData.slug !== existingPage.slug) {
      const slugExists = await prisma.page.findUnique({
        where: { slug: validatedData.slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'A page with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update publishedAt if status is changed to PUBLISHED
    const updateData: any = { ...validatedData }
    if (validatedData.status === 'PUBLISHED' && !existingPage.publishedAt) {
      updateData.publishedAt = new Date()
    } else if (validatedData.status !== 'PUBLISHED' && existingPage.status === 'PUBLISHED') {
      updateData.publishedAt = null
    }

    const page = await prisma.page.update({
      where: { id },
      data: {
        ...updateData,
        parentId: updateData.parentId === null ? null : updateData.parentId || undefined,
      },
      include: {
        parent: true,
        children: true,
      },
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE',
        entity: 'Page',
        entityId: page.id,
        userId: session.user.id,
        data: {
          before: existingPage,
          after: page,
        },
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }

    console.error('Error updating page:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    // Check if the page exists
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        children: true,
      },
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Prevent deletion if page has children
    if (page.children.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete page with child pages' },
        { status: 400 }
      )
    }

    await prisma.page.delete({
      where: { id },
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        action: 'DELETE',
        entity: 'Page',
        entityId: id,
        userId: session.user.id,
        data: { page },
      },
    })

    return NextResponse.json({ message: 'Page deleted successfully' })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}