import { db } from './db'

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  AUDIT = 'audit',
}

export enum LogAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPLOAD = 'UPLOAD',
  DOWNLOAD = 'DOWNLOAD',
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
  BACKUP = 'BACKUP',
  RESTORE = 'RESTORE',
  CLEANUP = 'CLEANUP',
}

export interface LogContext {
  userId?: string
  userEmail?: string
  userRole?: string
  ipAddress?: string
  userAgent?: string
  sessionId?: string
  requestId?: string
  action?: LogAction
  entity?: string
  entityId?: string
  metadata?: Record<string, any>
  beforeData?: Record<string, any>
  afterData?: Record<string, any>
  error?: Error | string
  duration?: number
  url?: string
  method?: string
}

class Logger {
  private serviceName: string = 'consulat-admin'
  private environment: string = process.env.NODE_ENV || 'development'

  constructor() {
    // Ensure log directory exists
    if (typeof window === 'undefined') {
      this.initializeFileLogging()
    }
  }

  private initializeFileLogging() {
    try {
      const fs = require('fs')
      const path = require('path')
      const logDir = path.join(process.cwd(), 'logs')
      
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true })
      }
    } catch (error) {
      console.warn('Failed to initialize file logging:', error)
    }
  }

  private async writeToFile(level: LogLevel, message: string, context: LogContext = {}) {
    if (typeof window !== 'undefined') return // Skip file logging on client side

    try {
      const fs = require('fs').promises
      const path = require('path')
      
      const timestamp = new Date().toISOString()
      const logEntry = {
        timestamp,
        level,
        service: this.serviceName,
        environment: this.environment,
        message,
        ...context,
      }

      const logLine = JSON.stringify(logEntry) + '\n'
      
      // Write to daily log file
      const date = timestamp.split('T')[0]
      const logFile = path.join(process.cwd(), 'logs', `${date}.log`)
      
      await fs.appendFile(logFile, logLine)

      // Also write to level-specific file for errors and audit logs
      if (level === LogLevel.ERROR) {
        const errorFile = path.join(process.cwd(), 'logs', 'errors.log')
        await fs.appendFile(errorFile, logLine)
      }

      if (level === LogLevel.AUDIT) {
        const auditFile = path.join(process.cwd(), 'logs', 'audit.log')
        await fs.appendFile(auditFile, logLine)
      }
    } catch (error) {
      console.error('Failed to write to log file:', error)
    }
  }

  private async writeToDatabase(level: LogLevel, message: string, context: LogContext = {}) {
    try {
      // Only write audit logs and errors to database
      if (level === LogLevel.AUDIT || level === LogLevel.ERROR) {
        await db.auditLog.create({
          data: {
            action: context.action || 'UNKNOWN',
            entity: context.entity || 'SYSTEM',
            entityId: context.entityId || '',
            userId: context.userId || null,
            data: JSON.parse(JSON.stringify({
              level,
              message,
              ...context,
            })),
            ipAddress: context.ipAddress || null,
            userAgent: context.userAgent || null,
          },
        })
      }
    } catch (error) {
      console.error('Failed to write to database:', error)
      // Fallback to console logging
      console.log('DB Log failed, fallback:', { level, message, context })
    }
  }

  private formatMessage(message: string, context: LogContext = {}): string {
    const parts = [message]
    
    if (context.userId) parts.push(`user:${context.userId}`)
    if (context.entity && context.entityId) parts.push(`${context.entity}:${context.entityId}`)
    if (context.action) parts.push(`action:${context.action}`)
    if (context.duration) parts.push(`duration:${context.duration}ms`)
    
    return parts.join(' | ')
  }

  private async log(level: LogLevel, message: string, context: LogContext = {}) {
    const formattedMessage = this.formatMessage(message, context)
    const timestamp = new Date().toISOString()
    
    // Console logging with colors
    if (this.environment === 'development') {
      const colors = {
        debug: '\x1b[36m', // cyan
        info: '\x1b[32m',  // green
        warn: '\x1b[33m',  // yellow
        error: '\x1b[31m', // red
        audit: '\x1b[35m', // magenta
      }
      
      console.log(
        `${colors[level]}[${timestamp}] ${level.toUpperCase()}\x1b[0m: ${formattedMessage}`,
        context.error ? context.error : ''
      )
    }

    // Write to file (async, don't await)
    this.writeToFile(level, formattedMessage, context).catch(console.error)

    // Write to database (async, don't await)
    this.writeToDatabase(level, formattedMessage, context).catch(console.error)
  }

  debug(message: string, context: LogContext = {}) {
    return this.log(LogLevel.DEBUG, message, context)
  }

  info(message: string, context: LogContext = {}) {
    return this.log(LogLevel.INFO, message, context)
  }

  warn(message: string, context: LogContext = {}) {
    return this.log(LogLevel.WARN, message, context)
  }

  error(message: string, context: LogContext = {}) {
    return this.log(LogLevel.ERROR, message, context)
  }

  audit(message: string, context: LogContext = {}) {
    return this.log(LogLevel.AUDIT, message, context)
  }

  // Convenience methods for common operations
  async logUserAction(action: LogAction, userId: string, context: Partial<LogContext> = {}) {
    return this.audit(`User ${action.toLowerCase()} action`, {
      ...context,
      userId,
      action,
    })
  }

  async logEntityAction(action: LogAction, entity: string, entityId: string, userId?: string, context: Partial<LogContext> = {}) {
    return this.audit(`${entity} ${action.toLowerCase()}d`, {
      ...context,
      action,
      entity,
      entityId,
      userId,
    })
  }

  async logApiRequest(method: string, url: string, userId?: string, context: Partial<LogContext> = {}) {
    return this.info(`API request: ${method} ${url}`, {
      ...context,
      method,
      url,
      userId,
    })
  }

  async logApiResponse(method: string, url: string, status: number, duration: number, context: Partial<LogContext> = {}) {
    const level = status >= 400 ? LogLevel.WARN : LogLevel.INFO
    return this.log(level, `API response: ${method} ${url} ${status}`, {
      ...context,
      method,
      url,
      duration,
      metadata: { status },
    })
  }

  async logError(error: Error | string, context: Partial<LogContext> = {}) {
    const errorMessage = error instanceof Error ? error.message : error
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return this.error(errorMessage, {
      ...context,
      error: errorMessage,
      metadata: {
        ...context.metadata,
        stack: errorStack,
      },
    })
  }

  async logAuthEvent(action: 'LOGIN' | 'LOGOUT' | 'FAILED_LOGIN', userId?: string, context: Partial<LogContext> = {}) {
    return this.audit(`Authentication: ${action}`, {
      ...context,
      userId,
      action: action as LogAction,
      entity: 'AUTH',
    })
  }

  async logDataChange(entity: string, entityId: string, action: LogAction, beforeData?: any, afterData?: any, userId?: string, context: Partial<LogContext> = {}) {
    return this.audit(`Data change: ${entity} ${action}`, {
      ...context,
      action,
      entity,
      entityId,
      userId,
      beforeData,
      afterData,
    })
  }

  // Performance logging
  async logPerformance(operation: string, duration: number, context: Partial<LogContext> = {}) {
    const level = duration > 5000 ? LogLevel.WARN : LogLevel.INFO
    return this.log(level, `Performance: ${operation} took ${duration}ms`, {
      ...context,
      duration,
      entity: 'PERFORMANCE',
    })
  }

  // Security logging
  async logSecurityEvent(event: string, context: Partial<LogContext> = {}) {
    return this.audit(`Security event: ${event}`, {
      ...context,
      entity: 'SECURITY',
    })
  }

  // Create a child logger with default context
  child(defaultContext: Partial<LogContext>) {
    return {
      debug: (message: string, context: LogContext = {}) => 
        this.debug(message, { ...defaultContext, ...context }),
      info: (message: string, context: LogContext = {}) => 
        this.info(message, { ...defaultContext, ...context }),
      warn: (message: string, context: LogContext = {}) => 
        this.warn(message, { ...defaultContext, ...context }),
      error: (message: string, context: LogContext = {}) => 
        this.error(message, { ...defaultContext, ...context }),
      audit: (message: string, context: LogContext = {}) => 
        this.audit(message, { ...defaultContext, ...context }),
    }
  }
}

// Create singleton instance
export const logger = new Logger()

// Export commonly used functions
export const logUserAction = logger.logUserAction.bind(logger)
export const logEntityAction = logger.logEntityAction.bind(logger)
export const logApiRequest = logger.logApiRequest.bind(logger)
export const logApiResponse = logger.logApiResponse.bind(logger)
export const logError = logger.logError.bind(logger)
export const logAuthEvent = logger.logAuthEvent.bind(logger)
export const logDataChange = logger.logDataChange.bind(logger)
export const logPerformance = logger.logPerformance.bind(logger)
export const logSecurityEvent = logger.logSecurityEvent.bind(logger)

// Export default logger
export default logger