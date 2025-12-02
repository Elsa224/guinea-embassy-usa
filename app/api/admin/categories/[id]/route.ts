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
    .trim('-')
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const category = await db.category.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { posts: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Category GET error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la catégorie' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Get existing category
    const existingCategory = await db.category.findUnique({
      where: { id: params.id }
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 })
    }

    // Generate new slug from French name
    const slug = generateSlug(name.fr)

    // Check if slug already exists (but not for current category)
    const slugConflict = await db.category.findUnique({
      where: { 
        slug,
        NOT: { id: params.id }
      }
    })

    if (slugConflict) {
      return NextResponse.json(
        { error: 'Une catégorie avec ce nom existe déjà' },
        { status: 400 }
      )
    }

    // Check for circular parent relationship
    if (parentId && parentId === params.id) {
      return NextResponse.json(
        { error: 'Une catégorie ne peut pas être son propre parent' },
        { status: 400 }
      )
    }

    const category = await db.category.update({
      where: { id: params.id },
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
        action: 'UPDATE',
        entity: 'Category',
        entityId: category.id,
        userId: session.user.id,
        data: { 
          before: existingCategory,
          after: { name, slug, color, icon, parentId, order }
        }
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Category PUT error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la catégorie' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { 
            posts: true,
            children: true 
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: 'Catégorie non trouvée' }, { status: 404 })
    }

    // Check if category has posts or children
    if (category._count.posts > 0) {
      return NextResponse.json(
        { error: 'Cette catégorie contient des articles et ne peut pas être supprimée' },
        { status: 400 }
      )
    }

    if (category._count.children > 0) {
      return NextResponse.json(
        { error: 'Cette catégorie contient des sous-catégories et ne peut pas être supprimée' },
        { status: 400 }
      )
    }

    await db.category.delete({
      where: { id: params.id }
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        action: 'DELETE',
        entity: 'Category',
        entityId: params.id,
        userId: session.user.id,
        data: category
      }
    })

    return NextResponse.json({ message: 'Catégorie supprimée avec succès' })
  } catch (error) {
    console.error('Category DELETE error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la catégorie' },
      { status: 500 }
    )
  }
}