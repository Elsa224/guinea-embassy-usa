import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { withLogging } from '@/lib/middleware/logging'
import { getLogAnalytics } from '@/lib/utils/log-utils'
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
  
  const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined
  const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined

  try {
    const analytics = await getLogAnalytics(startDate, endDate)
    return NextResponse.json(analytics)
  } catch (error) {
    await logger.logError('Failed to fetch log analytics', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch log analytics' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)