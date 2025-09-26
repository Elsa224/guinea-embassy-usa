#!/usr/bin/env tsx

/**
 * Log rotation script for the Consulat Admin Dashboard
 * This script should be run daily via cron job to rotate and compress log files
 * 
 * Usage: tsx scripts/rotate-logs.ts
 * Cron: 0 2 * * * /path/to/node_modules/.bin/tsx /path/to/scripts/rotate-logs.ts
 */

import { promises as fs } from 'fs'
import { join, extname } from 'path'
import { createGzip } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

interface LogRotationConfig {
  logDir: string
  retentionDays: number
  compressAfterDays: number
  maxLogSize: number // in MB
}

const config: LogRotationConfig = {
  logDir: join(process.cwd(), 'logs'),
  retentionDays: 90, // Keep logs for 90 days
  compressAfterDays: 7, // Compress logs older than 7 days
  maxLogSize: 100, // Rotate if log file exceeds 100MB
}

class LogRotator {
  private config: LogRotationConfig

  constructor(config: LogRotationConfig) {
    this.config = config
  }

  async rotate() {
    console.log('🔄 Starting log rotation...')

    try {
      // Ensure log directory exists
      await this.ensureLogDirectory()

      // Get all log files
      const logFiles = await this.getLogFiles()
      
      console.log(`📁 Found ${logFiles.length} log files`)

      // Process each log file
      for (const logFile of logFiles) {
        await this.processLogFile(logFile)
      }

      // Clean up old files
      await this.cleanupOldFiles()

      // Compress old files
      await this.compressOldFiles()

      console.log('✅ Log rotation completed successfully')
    } catch (error) {
      console.error('❌ Log rotation failed:', error)
      process.exit(1)
    }
  }

  private async ensureLogDirectory() {
    try {
      await fs.access(this.config.logDir)
    } catch {
      await fs.mkdir(this.config.logDir, { recursive: true })
      console.log(`📁 Created log directory: ${this.config.logDir}`)
    }
  }

  private async getLogFiles(): Promise<string[]> {
    const files = await fs.readdir(this.config.logDir)
    return files
      .filter(file => file.endsWith('.log'))
      .map(file => join(this.config.logDir, file))
  }

  private async processLogFile(logPath: string) {
    const stats = await fs.stat(logPath)
    const fileSizeMB = stats.size / (1024 * 1024)
    const fileName = logPath.split('/').pop() || 'unknown'

    console.log(`📄 Processing ${fileName} (${fileSizeMB.toFixed(2)}MB)`)

    // Check if file needs rotation due to size
    if (fileSizeMB > this.config.maxLogSize) {
      await this.rotateBySize(logPath)
    }

    // Check if file needs rotation due to date
    const fileDate = this.extractDateFromFileName(fileName)
    if (fileDate && this.shouldRotateByDate(fileDate)) {
      await this.rotateByDate(logPath, fileDate)
    }
  }

  private extractDateFromFileName(fileName: string): Date | null {
    // Extract date from filename like "2025-01-25.log"
    const match = fileName.match(/(\d{4}-\d{2}-\d{2})\.log$/)
    if (match) {
      return new Date(match[1])
    }
    return null
  }

  private shouldRotateByDate(fileDate: Date): boolean {
    const today = new Date()
    const diffDays = Math.floor((today.getTime() - fileDate.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays >= 1 // Rotate files from yesterday and older
  }

  private async rotateBySize(logPath: string) {
    const fileName = logPath.split('/').pop()!.replace('.log', '')
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')
    const rotatedPath = join(this.config.logDir, `${fileName}.${timestamp}.log`)

    await fs.rename(logPath, rotatedPath)
    console.log(`🔄 Rotated ${fileName}.log to ${fileName}.${timestamp}.log`)

    // Create new empty log file
    await fs.writeFile(logPath, '', 'utf8')
  }

  private async rotateByDate(logPath: string, fileDate: Date) {
    // For date-based files, just ensure they're not actively being written to
    // We'll handle compression and cleanup in other methods
    console.log(`📅 Date-based file ${logPath} is ready for compression/cleanup`)
  }

  private async compressOldFiles() {
    const files = await fs.readdir(this.config.logDir)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.config.compressAfterDays)

    for (const file of files) {
      if (!file.endsWith('.log') || file.endsWith('.gz')) {
        continue
      }

      const filePath = join(this.config.logDir, file)
      const stats = await fs.stat(filePath)

      if (stats.mtime < cutoffDate) {
        await this.compressFile(filePath)
      }
    }
  }

  private async compressFile(filePath: string) {
    const compressedPath = `${filePath}.gz`
    
    try {
      // Check if compressed file already exists
      await fs.access(compressedPath)
      console.log(`⚠️  Compressed file already exists: ${compressedPath}`)
      return
    } catch {
      // File doesn't exist, proceed with compression
    }

    const readStream = createReadStream(filePath)
    const writeStream = createWriteStream(compressedPath)
    const gzipStream = createGzip()

    await pipelineAsync(readStream, gzipStream, writeStream)

    // Verify compression was successful
    const originalSize = (await fs.stat(filePath)).size
    const compressedSize = (await fs.stat(compressedPath)).size
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)

    console.log(`🗜️  Compressed ${filePath.split('/').pop()} (${compressionRatio}% reduction)`)

    // Remove original file
    await fs.unlink(filePath)
  }

  private async cleanupOldFiles() {
    const files = await fs.readdir(this.config.logDir)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays)

    let deletedCount = 0

    for (const file of files) {
      const filePath = join(this.config.logDir, file)
      const stats = await fs.stat(filePath)

      if (stats.mtime < cutoffDate) {
        await fs.unlink(filePath)
        deletedCount++
        console.log(`🗑️  Deleted old log file: ${file}`)
      }
    }

    if (deletedCount > 0) {
      console.log(`🧹 Cleaned up ${deletedCount} old log files`)
    }
  }

  async getLogStats() {
    try {
      const files = await fs.readdir(this.config.logDir)
      let totalSize = 0
      let activeFiles = 0
      let compressedFiles = 0
      let oldestFile: Date | null = null
      let newestFile: Date | null = null

      for (const file of files) {
        const filePath = join(this.config.logDir, file)
        const stats = await fs.stat(filePath)
        
        totalSize += stats.size
        
        if (file.endsWith('.gz')) {
          compressedFiles++
        } else if (file.endsWith('.log')) {
          activeFiles++
        }

        if (!oldestFile || stats.mtime < oldestFile) {
          oldestFile = stats.mtime
        }
        if (!newestFile || stats.mtime > newestFile) {
          newestFile = stats.mtime
        }
      }

      return {
        totalFiles: files.length,
        activeFiles,
        compressedFiles,
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
        oldestFile: oldestFile?.toISOString(),
        newestFile: newestFile?.toISOString(),
      }
    } catch (error) {
      console.error('Failed to get log stats:', error)
      return null
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'rotate'

  const rotator = new LogRotator(config)

  switch (command) {
    case 'rotate':
      await rotator.rotate()
      break
    
    case 'stats':
      const stats = await rotator.getLogStats()
      if (stats) {
        console.log('📊 Log Statistics:')
        console.log(`   Total files: ${stats.totalFiles}`)
        console.log(`   Active files: ${stats.activeFiles}`)
        console.log(`   Compressed files: ${stats.compressedFiles}`)
        console.log(`   Total size: ${stats.totalSizeMB} MB`)
        console.log(`   Oldest file: ${stats.oldestFile}`)
        console.log(`   Newest file: ${stats.newestFile}`)
      }
      break
    
    case 'help':
      console.log(`
📋 Log Rotation Script Usage:

Commands:
  rotate     Perform log rotation (default)
  stats      Show log statistics
  help       Show this help message

Configuration:
  Log directory: ${config.logDir}
  Retention days: ${config.retentionDays}
  Compress after: ${config.compressAfterDays} days
  Max log size: ${config.maxLogSize} MB

Examples:
  tsx scripts/rotate-logs.ts
  tsx scripts/rotate-logs.ts rotate
  tsx scripts/rotate-logs.ts stats
      `)
      break
    
    default:
      console.error(`❌ Unknown command: ${command}`)
      console.error('Run "tsx scripts/rotate-logs.ts help" for usage information')
      process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
}

export { LogRotator, config as defaultConfig }