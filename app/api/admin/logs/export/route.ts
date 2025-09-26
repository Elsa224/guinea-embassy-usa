import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { withLogging } from '@/lib/middleware/logging'
import { exportLogsToCSV } from '@/lib/utils/log-utils'
import { logger } from '@/lib/logger'

async function handleGET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'view_analytics')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  
  const options = {
    entity: searchParams.get('entity') || undefined,
    action: searchParams.get('action') || undefined,
    userId: session.user.id, // Add current user ID for audit purposes
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
  }

  try {
    const csvContent = await exportLogsToCSV(options)
    
    const headers = new Headers()
    headers.set('Content-Type', 'text/csv')
    headers.set('Content-Disposition', `attachment; filename="audit-logs-${new Date().toISOString().split('T')[0]}.csv"`)
    
    return new NextResponse(csvContent, { headers })
  } catch (error) {
    await logger.logError('Failed to export logs', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to export logs' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)