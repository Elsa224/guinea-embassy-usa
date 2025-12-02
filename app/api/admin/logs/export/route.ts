import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const entity = searchParams.get('entity')
    const userId = searchParams.get('userId')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}
    
    if (action) {
      where.action = action
    }
    
    if (entity) {
      where.entity = entity
    }
    
    if (userId) {
      where.userId = userId
    }
    
    if (search) {
      where.OR = [
        { entity: { contains: search, mode: 'insensitive' } },
        { action: { contains: search, mode: 'insensitive' } },
        { entityId: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } }
      ]
    }

    // Get all logs (limited to 10000 for performance)
    const logs = await db.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10000
    })

    // Create CSV content
    const headers = [
      'Date/Heure',
      'Action',
      'Entité',
      'ID Entité',
      'Utilisateur',
      'Email Utilisateur',
      'Adresse IP',
      'Navigateur'
    ]

    const csvRows = [
      headers.join(','),
      ...logs.map(log => [
        new Date(log.createdAt).toLocaleString('fr-FR'),
        log.action,
        log.entity,
        log.entityId,
        log.user?.name || '',
        log.user?.email || '',
        log.ipAddress || '',
        log.userAgent ? `"${log.userAgent.replace(/"/g, '""')}"` : ''
      ].join(','))
    ]

    const csvContent = csvRows.join('\n')

    // Set headers for file download
    const headers_response = new Headers()
    headers_response.set('Content-Type', 'text/csv')
    headers_response.set('Content-Disposition', `attachment; filename="activity-logs-${new Date().toISOString().split('T')[0]}.csv"`)

    return new NextResponse(csvContent, { headers: headers_response })
  } catch (error) {
    console.error('Logs export error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'export des logs' },
      { status: 500 }
    )
  }
}