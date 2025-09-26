import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { logger } from '@/lib/logger'

interface RequestContext {
  startTime: number
  requestId: string
  userId?: string
  userEmail?: string
  userRole?: string
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddress = request.headers.get('x-remote-address')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  return realIP || remoteAddress || 'unknown'
}

export function withLogging<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse> | NextResponse
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const startTime = Date.now()
    const requestId = generateRequestId()
    const method = request.method
    const url = request.url
    const ipAddress = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    let session
    let context: RequestContext = {
      startTime,
      requestId,
    }

    try {
      // Get user session for authenticated requests
      session = await auth()
      if (session?.user) {
        context.userId = session.user.id
        context.userEmail = session.user.email || undefined
        context.userRole = session.user.role
      }

      // Log incoming request
      await logger.logApiRequest(method, url, context.userId, {
        requestId,
        ipAddress,
        userAgent,
        metadata: {
          headers: Object.fromEntries(request.headers.entries()),
          searchParams: Object.fromEntries(request.nextUrl.searchParams.entries()),
        },
      })

      // Execute the handler
      const response = await handler(request, ...args)
      const duration = Date.now() - startTime
      const status = response.status

      // Log response
      await logger.logApiResponse(method, url, status, duration, {
        requestId,
        userId: context.userId,
        ipAddress,
        metadata: {
          responseHeaders: Object.fromEntries(response.headers.entries()),
          status,
        },
      })

      // Log performance warning for slow requests
      if (duration > 3000) {
        await logger.logPerformance(`Slow API request: ${method} ${url}`, duration, {
          requestId,
          userId: context.userId,
          ipAddress,
        })
      }

      return response
    } catch (error) {
      const duration = Date.now() - startTime
      
      // Log error
      await logger.logError(error as Error, {
        requestId,
        userId: context.userId,
        ipAddress,
        userAgent,
        method,
        url,
        duration,
        metadata: {
          session: session ? { userId: session.user?.id, email: session.user?.email } : null,
        },
      })

      // Return error response
      if (error instanceof Error) {
        return NextResponse.json(
          { 
            error: 'Internal Server Error',
            requestId,
            message: process.env.NODE_ENV === 'development' ? error.message : undefined,
          },
          { status: 500 }
        )
      }

      throw error
    }
  }
}

// Middleware for logging data changes
export async function logDataChange(
  entity: string,
  entityId: string,
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  beforeData?: any,
  afterData?: any,
  request?: NextRequest
) {
  let userId: string | undefined
  let ipAddress: string | undefined
  let userAgent: string | undefined

  if (request) {
    const session = await auth()
    userId = session?.user?.id
    ipAddress = getClientIP(request)
    userAgent = request.headers.get('user-agent') || undefined
  }

  await logger.logDataChange(
    entity,
    entityId,
    action as any,
    beforeData,
    afterData,
    userId,
    {
      ipAddress,
      userAgent,
    }
  )
}

// Helper function to create service-specific loggers
export function createServiceLogger(serviceName: string) {
  return logger.child({ 
    metadata: { service: serviceName } 
  })
}

// Performance measurement decorator
export function measurePerformance(operationName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now()
      
      try {
        const result = await originalMethod.apply(this, args)
        const duration = Date.now() - startTime
        
        await logger.logPerformance(`${operationName}.${propertyKey}`, duration)
        
        return result
      } catch (error) {
        const duration = Date.now() - startTime
        
        await logger.logError(`Performance measurement failed for ${operationName}.${propertyKey}`, {
          duration,
          error: error instanceof Error ? error.message : String(error),
        })
        
        throw error
      }
    }

    return descriptor
  }
}

// Security logging helpers
export async function logSecurityIncident(
  incident: string,
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
  request?: NextRequest,
  additionalContext?: Record<string, any>
) {
  let ipAddress: string | undefined
  let userAgent: string | undefined
  let userId: string | undefined

  if (request) {
    ipAddress = getClientIP(request)
    userAgent = request.headers.get('user-agent') || undefined
    
    const session = await auth()
    userId = session?.user?.id
  }

  await logger.logSecurityEvent(`${severity}: ${incident}`, {
    userId,
    ipAddress,
    userAgent,
    metadata: {
      severity,
      ...additionalContext,
    },
  })
}

// Rate limiting logger
export async function logRateLimitExceeded(
  identifier: string,
  limit: number,
  window: string,
  request: NextRequest
) {
  await logSecurityIncident(
    `Rate limit exceeded for ${identifier}`,
    'MEDIUM',
    request,
    {
      limit,
      window,
      identifier,
    }
  )
}

// Authentication logging
export async function logAuthenticationAttempt(
  email: string,
  success: boolean,
  request: NextRequest,
  reason?: string
) {
  const ipAddress = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || undefined

  if (success) {
    await logger.logAuthEvent('LOGIN', undefined, {
      userEmail: email,
      ipAddress,
      userAgent,
    })
  } else {
    await logger.logAuthEvent('FAILED_LOGIN', undefined, {
      userEmail: email,
      ipAddress,
      userAgent,
      metadata: { reason },
    })

    // Log security incident for failed login
    await logSecurityIncident(
      `Failed login attempt for ${email}`,
      'LOW',
      request,
      { email, reason }
    )
  }
}

export default withLogging