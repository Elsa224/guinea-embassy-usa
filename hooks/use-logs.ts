'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

interface LogQueryParams {
  page?: number
  limit?: number
  entity?: string
  action?: string
  userId?: string
  startDate?: string
  endDate?: string
}

interface AuditLog {
  id: string
  action: string
  entity: string
  entityId: string
  userId?: string
  user?: {
    name: string
    email: string
    role: string
  }
  data: any
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

interface LogsResponse {
  logs: AuditLog[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

interface LogAnalytics {
  totalLogs: number
  errorCount: number
  auditCount: number
  uniqueUsers: number
  topEntities: Array<{ entity: string; count: number }>
  topActions: Array<{ action: string; count: number }>
  dailyActivity: Array<{ date: string; count: number }>
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
  metrics: {
    totalRequests: number
    errorCount: number
    errorRate: number
    slowRequests: number
    slowRequestRate: number
    activeUsers: number
  }
}

// Fetch audit logs
export function useLogs(params: LogQueryParams = {}) {
  return useQuery<LogsResponse, Error>({
    queryKey: ['logs', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value))
        }
      })

      const response = await fetch(`/api/admin/logs?${searchParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch logs')
      }

      return response.json()
    },
    staleTime: 30000, // 30 seconds
  })
}

// Fetch log analytics
export function useLogAnalytics(startDate?: string, endDate?: string) {
  return useQuery<LogAnalytics, Error>({
    queryKey: ['log-analytics', startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)

      const response = await fetch(`/api/admin/logs/analytics?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch log analytics')
      }

      return response.json()
    },
    staleTime: 60000, // 1 minute
  })
}

// Fetch system health
export function useSystemHealth() {
  return useQuery<SystemHealth, Error>({
    queryKey: ['system-health'],
    queryFn: async () => {
      const response = await fetch('/api/admin/system/health')
      
      if (!response.ok) {
        throw new Error('Failed to fetch system health')
      }

      return response.json()
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refresh every minute
  })
}

// Fetch user activity
export function useUserActivity(userId: string, days: number = 30) {
  return useQuery({
    queryKey: ['user-activity', userId, days],
    queryFn: async () => {
      const response = await fetch(`/api/admin/logs/user-activity/${userId}?days=${days}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch user activity')
      }

      return response.json()
    },
    enabled: !!userId,
    staleTime: 60000,
  })
}

// Export logs mutation
export function useExportLogs() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: LogQueryParams) => {
      const searchParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value))
        }
      })

      const response = await fetch(`/api/admin/logs/export?${searchParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to export logs')
      }

      // Get the CSV content as blob
      const blob = await response.blob()
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return { success: true }
    },
    onSuccess: () => {
      toast.success('Logs exported successfully')
    },
    onError: (error: Error) => {
      toast.error(`Failed to export logs: ${error.message}`)
    },
  })
}

// Cleanup old logs mutation
export function useCleanupLogs() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (retentionDays: number) => {
      const response = await fetch('/api/admin/logs/cleanup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ retentionDays }),
      })

      if (!response.ok) {
        throw new Error('Failed to cleanup logs')
      }

      return response.json()
    },
    onSuccess: (data) => {
      toast.success(`Cleaned up ${data.deletedCount} old logs`)
      queryClient.invalidateQueries({ queryKey: ['logs'] })
      queryClient.invalidateQueries({ queryKey: ['log-analytics'] })
    },
    onError: (error: Error) => {
      toast.error(`Failed to cleanup logs: ${error.message}`)
    },
  })
}

// Custom hook for real-time log monitoring
export function useLogStream(entityType?: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['log-stream', entityType],
    queryFn: async () => {
      // This would connect to a WebSocket or SSE endpoint for real-time logs
      // For now, we'll just fetch recent logs
      const params = new URLSearchParams({
        limit: '20',
        ...(entityType && { entity: entityType }),
      })

      const response = await fetch(`/api/admin/logs?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch recent logs')
      }

      return response.json()
    },
    refetchInterval: 5000, // Refresh every 5 seconds for "real-time" effect
    staleTime: 0,
  })
}

// Hook for log filters and search
export function useLogFilters() {
  const queryClient = useQueryClient()

  const getEntityTypes = useQuery({
    queryKey: ['log-entity-types'],
    queryFn: async () => {
      const response = await fetch('/api/admin/logs/entity-types')
      
      if (!response.ok) {
        throw new Error('Failed to fetch entity types')
      }

      return response.json()
    },
    staleTime: 300000, // 5 minutes
  })

  const getActionTypes = useQuery({
    queryKey: ['log-action-types'],
    queryFn: async () => {
      const response = await fetch('/api/admin/logs/action-types')
      
      if (!response.ok) {
        throw new Error('Failed to fetch action types')
      }

      return response.json()
    },
    staleTime: 300000, // 5 minutes
  })

  return {
    entityTypes: getEntityTypes.data || [],
    actionTypes: getActionTypes.data || [],
    isLoading: getEntityTypes.isLoading || getActionTypes.isLoading,
  }
}

// Hook for log-based alerts
export function useLogAlerts() {
  return useQuery({
    queryKey: ['log-alerts'],
    queryFn: async () => {
      const response = await fetch('/api/admin/logs/alerts')
      
      if (!response.ok) {
        throw new Error('Failed to fetch log alerts')
      }

      return response.json()
    },
    staleTime: 30000,
    refetchInterval: 60000, // Check for alerts every minute
  })
}