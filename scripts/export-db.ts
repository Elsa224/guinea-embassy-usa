import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function exportDatabase() {
  try {
    console.log('🚀 Starting database export...')

    // Export all tables data
    const users = await prisma.user.findMany()
    const categories = await prisma.category.findMany()
    const tags = await prisma.tag.findMany()
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
        media: true,
      },
    })
    const media = await prisma.media.findMany()
    const pages = await prisma.page.findMany()
    const settings = await prisma.settings.findMany()
    const auditLogs = await prisma.auditLog.findMany()

    const exportData = {
      users,
      categories,
      tags,
      posts,
      media,
      pages,
      settings,
      auditLogs,
      exportedAt: new Date().toISOString(),
    }

    // Create exports directory if it doesn't exist
    const exportDir = path.join(process.cwd(), 'database-exports')
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true })
    }

    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `database-export-${timestamp}.json`
    const filepath = path.join(exportDir, filename)
    
    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2))
    
    console.log('✅ Database exported successfully!')
    console.log(`📁 Export saved to: ${filepath}`)
    console.log(`📊 Exported ${posts.length} posts, ${users.length} users, ${categories.length} categories`)
    
    return filepath
  } catch (error) {
    console.error('❌ Error exporting database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

exportDatabase()
  .then((filepath) => {
    console.log(`🎉 Export complete: ${filepath}`)
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Export failed:', error)
    process.exit(1)
  })