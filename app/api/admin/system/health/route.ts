import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { withLogging } from '@/lib/middleware/logging'
import { getSystemHealth } from '@/lib/utils/log-utils'
import { logger } from '@/lib/logger'

async function handleGET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'view_analytics')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const health = await getSystemHealth()
    return NextResponse.json(health)
  } catch (error) {
    await logger.logError('Failed to fetch system health', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to fetch system health' },
      { status: 500 }
    )
  }
}

export const GET = withLogging(handleGET)