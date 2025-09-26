import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { withLogging } from '@/lib/middleware/logging'
import { getAuditLogs } from '@/lib/utils/log-utils'
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
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
    entity: searchParams.get('entity') || undefined,
    action: searchParams.get('action') || undefined,
    userId: searchParams.get('userId') || undefined,
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
  }

  try {
    const result = await getAuditLogs(options)
    return NextResponse.json(result)
  } catch (error) {
    await logger.logError('Failed to fetch audit logs', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)