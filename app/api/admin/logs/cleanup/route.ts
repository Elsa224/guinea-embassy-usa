import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { hasPermission } from '@/lib/permissions'
import { withLogging } from '@/lib/middleware/logging'
import { cleanupOldLogs } from '@/lib/utils/log-utils'
import { logger } from '@/lib/logger'
import { z } from 'zod'

const cleanupSchema = z.object({
  retentionDays: z.number().min(1).max(365),
})

async function handlePOST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!hasPermission(session.user.role, 'manage_system')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const validation = cleanupSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: validation.error.issues },
        { status: 400 }
      )
    }

    const { retentionDays } = validation.data
    const deletedCount = await cleanupOldLogs(retentionDays)

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `Cleaned up ${deletedCount} old log entries`,
    })
  } catch (error) {
    await logger.logError('Failed to cleanup logs', {
      error: error instanceof Error ? error : new Error(String(error)),
      userId: session.user.id,
    })
    return NextResponse.json(
      { error: 'Failed to cleanup logs' },
      { status: 500 }
    )
  }
}

export const POST = withLogging(handlePOST)