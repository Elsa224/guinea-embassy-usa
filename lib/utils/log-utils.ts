import { db } from '@/lib/db'
import { logger, LogAction } from '@/lib/logger'

export interface LogQueryOptions {
  page?: number
  limit?: number
  entity?: string
  action?: string
  userId?: string
  startDate?: Date
  endDate?: Date
  level?: string
}

export interface LogAnalytics {
  totalLogs: number
  errorCount: number
  auditCount: number
  uniqueUsers: number
  topEntities: Array<{ entity: string; count: number }>
  topActions: Array<{ action: string; count: number }>
  dailyActivity: Array<{ date: string; count: number }>
}

/**
 * Query audit logs with filters and pagination
 */
export async function getAuditLogs(options: LogQueryOptions = {}) {
  const {
    page = 1,
    limit = 50,
    entity,
    action,
    userId,
    startDate,
    endDate,
  } = options

  const where: any = {}
  
  if (entity) where.entity = entity
  if (action) where.action = action
  if (userId) where.userId = userId
  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = startDate
    if (endDate) where.createdAt.lte = endDate
  }

  try {
    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.auditLog.count({ where }),
    ])

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    await logger.logError('Failed to query audit logs', { error: error instanceof Error ? error : new Error(String(error)) })
    throw new Error('Failed to retrieve audit logs')
  }
}

/**
 * Get log analytics and statistics
 */
export async function getLogAnalytics(
  startDate?: Date,
  endDate?: Date
): Promise<LogAnalytics> {
  try {
    const dateFilter: any = {}
    if (startDate || endDate) {
      dateFilter.createdAt = {}
      if (startDate) dateFilter.createdAt.gte = startDate
      if (endDate) dateFilter.createdAt.lte = endDate
    }

    const [
      totalLogs,
      errorLogs,
      auditLogs,
      uniqueUsers,
      entityStats,
      actionStats,
      dailyStats,
    ] = await Promise.all([
      // Total logs
      db.auditLog.count({ where: dateFilter }),

      // Error count (assuming errors have specific actions or data patterns)
      db.auditLog.count({
        where: {
          ...dateFilter,
          data: {
            path: ['level'],
            equals: 'error',
          },
        },
      }),

      // Audit count (all audit logs)
      db.auditLog.count({ where: dateFilter }),

      // Unique users
      db.auditLog.findMany({
        where: {
          ...dateFilter,
          userId: { not: null },
        },
        select: { userId: true },
        distinct: ['userId'],
      }),

      // Top entities
      db.auditLog.groupBy({
        by: ['entity'],
        where: dateFilter,
        _count: { entity: true },
        orderBy: { _count: { entity: 'desc' } },
        take: 10,
      }),

      // Top actions
      db.auditLog.groupBy({
        by: ['action'],
        where: dateFilter,
        _count: { action: true },
        orderBy: { _count: { action: 'desc' } },
        take: 10,
      }),

      // Daily activity (last 30 days or specified range)
      db.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM audit_logs
        ${startDate || endDate ? 'WHERE' : ''}
        ${startDate ? 'created_at >= ' + startDate.toISOString() : ''}
        ${startDate && endDate ? 'AND' : ''}
        ${endDate ? 'created_at <= ' + endDate.toISOString() : ''}
        GROUP BY DATE(created_at)
        ORDER BY date DESC
        LIMIT 30
      `,
    ])

    return {
      totalLogs,
      errorCount: errorLogs,
      auditCount: auditLogs,
      uniqueUsers: uniqueUsers.length,
      topEntities: entityStats.map(stat => ({
        entity: stat.entity,
        count: stat._count.entity,
      })),
      topActions: actionStats.map(stat => ({
        action: stat.action,
        count: stat._count.action,
      })),
      dailyActivity: dailyStats.map(stat => ({
        date: stat.date,
        count: Number(stat.count),
      })),
    }
  } catch (error) {
    await logger.logError('Failed to get log analytics', { error: error instanceof Error ? error : new Error(String(error)) })
    throw new Error('Failed to retrieve log analytics')
  }
}

/**
 * Clean up old logs (retention policy)
 */
export async function cleanupOldLogs(retentionDays: number = 90) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays)

  try {
    const result = await db.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    })

    await logger.info(`Cleaned up ${result.count} old audit logs`, {
      action: LogAction.CLEANUP,
      entity: 'AUDIT_LOG',
      metadata: {
        retentionDays,
        cutoffDate: cutoffDate.toISOString(),
        deletedCount: result.count,
      },
    })

    return result.count
  } catch (error) {
    await logger.logError('Failed to cleanup old logs', { error: error instanceof Error ? error : new Error(String(error)) })
    throw new Error('Failed to cleanup old logs')
  }
}

/**
 * Export logs to CSV format
 */
export async function exportLogsToCSV(options: LogQueryOptions = {}) {
  try {
    const { logs } = await getAuditLogs({ ...options, limit: 10000 })
    
    const csvHeaders = [
      'Date',
      'Action',
      'Entity',
      'Entity ID',
      'User',
      'User Email',
      'IP Address',
      'User Agent',
      'Data',
    ]

    const csvRows = logs.map(log => [
      log.createdAt.toISOString(),
      log.action,
      log.entity,
      log.entityId,
      log.user?.name  || 'System' ,
      log.user?.email || '',
      log.ipAddress || '',
      log.userAgent || '',
      JSON.stringify(log.data),
    ])

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    await logger.logEntityAction(LogAction.EXPORT, 'AUDIT_LOG', 'csv', options.userId, {
      metadata: {
        exportOptions: options,
        recordCount: logs.length,
      },
    })

    return csvContent
  } catch (error) {
    await logger.logError('Failed to export logs to CSV', { error: error instanceof Error ? error : new Error(String(error)) })
    throw new Error('Failed to export logs')
  }
}

/**
 * Get user activity summary
 */
export async function getUserActivitySummary(userId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  try {
    const [totalActions, actionsByType, recentActivity] = await Promise.all([
      // Total actions
      db.auditLog.count({
        where: {
          userId,
          createdAt: { gte: startDate },
        },
      }),

      // Actions by type
      db.auditLog.groupBy({
        by: ['action'],
        where: {
          userId,
          createdAt: { gte: startDate },
        },
        _count: { action: true },
        orderBy: { _count: { action: 'desc' } },
      }),

      // Recent activity
      db.auditLog.findMany({
        where: {
          userId,
          createdAt: { gte: startDate },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
    ])

    return {
      totalActions,
      actionsByType: actionsByType.map(action => ({
        action: action.action,
        count: action._count.action,
      })),
      recentActivity,
    }
  } catch (error) {
    await logger.logError('Failed to get user activity summary', { 
      error: error instanceof Error ? error : new Error(String(error)),
      userId,
    })
    throw new Error('Failed to retrieve user activity')
  }
}

/**
 * Monitor system health based on logs
 */
export async function getSystemHealth() {
  const last24Hours = new Date()
  last24Hours.setHours(last24Hours.getHours() - 24)

  try {
    const [
      totalRequests,
      errorCount,
      slowRequests,
      activeUsers,
    ] = await Promise.all([
      // Total requests (approximate from audit logs)
      db.auditLog.count({
        where: {
          createdAt: { gte: last24Hours },
        },
      }),

      // Error count
      db.auditLog.count({
        where: {
          createdAt: { gte: last24Hours },
          data: {
            path: ['level'],
            equals: 'error',
          },
        },
      }),

      // Slow requests (duration > 3000ms)
      db.auditLog.count({
        where: {
          createdAt: { gte: last24Hours },
          data: {
            path: ['duration'],
            gte: 3000,
          },
        },
      }),

      // Active users (last 24 hours)
      db.auditLog.findMany({
        where: {
          createdAt: { gte: last24Hours },
          userId: { not: null },
        },
        select: { userId: true },
        distinct: ['userId'],
      }),
    ])

    const errorRate = totalRequests > 0 ? (errorCount / totalRequests) * 100 : 0
    const slowRequestRate = totalRequests > 0 ? (slowRequests / totalRequests) * 100 : 0

    const healthStatus = 
      errorRate > 10 || slowRequestRate > 20 ? 'unhealthy' :
      errorRate > 5 || slowRequestRate > 10 ? 'degraded' : 'healthy'

    return {
      status: healthStatus,
      metrics: {
        totalRequests,
        errorCount,
        errorRate: Math.round(errorRate * 100) / 100,
        slowRequests,
        slowRequestRate: Math.round(slowRequestRate * 100) / 100,
        activeUsers: activeUsers.length,
      },
    }
  } catch (error) {
    await logger.logError('Failed to get system health', { error: error instanceof Error ? error : new Error(String(error)) })
    return {
      status: 'unknown' as const,
      metrics: {
        totalRequests: 0,
        errorCount: 0,
        errorRate: 0,
        slowRequests: 0,
        slowRequestRate: 0,
        activeUsers: 0,
      },
    }
  }
}