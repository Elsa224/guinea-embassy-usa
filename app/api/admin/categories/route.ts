import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')

    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.slug = { contains: search, mode: 'insensitive' }
    }

    // Get total count
    const totalCount = await db.category.count({ where })
    const totalPages = Math.ceil(totalCount / limit)

    const categories = await db.category.findMany({
      where,
      include: {
        parent: true,
        children: true,
        _count: {
          select: { posts: true }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      skip: offset,
      take: limit
    })

    return NextResponse.json({
      categories,
      totalCount,
      totalPages,
      currentPage: page
    })
  } catch (error) {
    console.error('Categories GET error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des catégories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = await request.json()
    const { name, description, color, icon, parentId, order } = data

    if (!name?.fr || !name?.en) {
      return NextResponse.json(
        { error: 'Le nom est requis en français et en anglais' },
        { status: 400 }
      )
    }

    // Generate slug from French name
    const slug = generateSlug(name.fr)

    // Check if slug already exists
    const existingCategory = await db.category.findUnique({
      where: { slug }
    })

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Une catégorie avec ce nom existe déjà' },
        { status: 400 }
      )
    }

    const category = await db.category.create({
      data: {
        name,
        slug,
        description: description?.fr || description?.en ? description : undefined,
        color: color || null,
        icon: icon || null,
        parentId: parentId || null,
        order: order || 0
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { posts: true }
        }
      }
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'CREATE',
        entity: 'Category',
        entityId: category.id,
        userId: session.user.id,
        data: { name, slug, color, icon, parentId, order }
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Categories POST error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la catégorie' },
      { status: 500 }
    )
  }
}