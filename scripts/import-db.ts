import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

interface ExportData {
  users: any[]
  categories: any[]
  tags: any[]
  posts: any[]
  media: any[]
  pages: any[]
  settings: any[]
  auditLogs: any[]
  exportedAt: string
}

async function importDatabase(importFilePath: string) {
  try {
    console.log('🚀 Starting database import...')
    console.log(`📁 Reading from: ${importFilePath}`)

    // Check if file exists
    if (!fs.existsSync(importFilePath)) {
      throw new Error(`Import file not found: ${importFilePath}`)
    }

    // Read and parse the export file
    const exportData: ExportData = JSON.parse(fs.readFileSync(importFilePath, 'utf-8'))
    
    console.log(`📊 Found: ${exportData.posts?.length || 0} posts, ${exportData.users?.length || 0} users, ${exportData.categories?.length || 0} categories`)
    
    // Clear existing data (optional - comment out if you want to merge)
    console.log('🧹 Clearing existing data...')
    await prisma.auditLog.deleteMany()
    await prisma.post.deleteMany()
    await prisma.media.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.page.deleteMany()
    await prisma.category.deleteMany()
    await prisma.settings.deleteMany()
    await prisma.user.deleteMany()

    // Import users first (needed for foreign keys)
    console.log('👥 Importing users...')
    for (const user of exportData.users || []) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          passwordHash: user.passwordHash, // Already hashed
          isActive: user.isActive,
          lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt) : null,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        },
      })
    }

    // Import categories
    console.log('📂 Importing categories...')
    for (const category of exportData.categories || []) {
      await prisma.category.create({
        data: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          color: category.color,
          icon: category.icon,
          order: category.order,
          parentId: category.parentId,
          createdAt: new Date(category.createdAt),
          updatedAt: new Date(category.updatedAt),
        },
      })
    }

    // Import tags
    console.log('🏷️ Importing tags...')
    for (const tag of exportData.tags || []) {
      await prisma.tag.create({
        data: {
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          createdAt: new Date(tag.createdAt),
        },
      })
    }

    // Import media
    console.log('🖼️ Importing media...')
    for (const mediaItem of exportData.media || []) {
      await prisma.media.create({
        data: {
          id: mediaItem.id,
          filename: mediaItem.filename,
          originalName: mediaItem.originalName,
          mimeType: mediaItem.mimeType,
          type: mediaItem.type,
          size: mediaItem.size,
          url: mediaItem.url,
          thumbnailUrl: mediaItem.thumbnailUrl,
          alt: mediaItem.alt,
          caption: mediaItem.caption,
          dimensions: mediaItem.dimensions,
          uploaderId: mediaItem.uploaderId,
          createdAt: new Date(mediaItem.createdAt),
        },
      })
    }

    // Import posts (without relationships first)
    console.log('📝 Importing posts...')
    for (const post of exportData.posts || []) {
      await prisma.post.create({
        data: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          featuredImage: post.featuredImage,
          status: post.status,
          type: post.type,
          featured: post.featured,
          publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
          views: post.views,
          authorId: post.authorId,
          categoryId: post.categoryId,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        },
      })
    }

    // Connect post relationships
    console.log('🔗 Connecting post relationships...')
    for (const post of exportData.posts || []) {
      if (post.tags && post.tags.length > 0) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            tags: {
              connect: post.tags.map((tag: any) => ({ id: tag.id })),
            },
          },
        })
      }
      
      if (post.media && post.media.length > 0) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            media: {
              connect: post.media.map((media: any) => ({ id: media.id })),
            },
          },
        })
      }
    }

    // Import pages
    console.log('📄 Importing pages...')
    for (const page of exportData.pages || []) {
      await prisma.page.create({
        data: {
          id: page.id,
          title: page.title,
          slug: page.slug,
          content: page.content,
          status: page.status,
          template: page.template,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          order: page.order,
          serviceType: page.serviceType,
          requiredDocs: page.requiredDocs,
          fees: page.fees,
          processingTime: page.processingTime,
          paymentLink: page.paymentLink,
          formLink: page.formLink,
          parentId: page.parentId,
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt),
          publishedAt: page.publishedAt ? new Date(page.publishedAt) : null,
        },
      })
    }

    // Import settings
    console.log('⚙️ Importing settings...')
    for (const setting of exportData.settings || []) {
      await prisma.settings.create({
        data: {
          id: setting.id,
          key: setting.key,
          value: setting.value,
          type: setting.type,
        },
      })
    }

    // Import audit logs (optional)
    console.log('📋 Importing audit logs...')
    for (const auditLog of exportData.auditLogs || []) {
      await prisma.auditLog.create({
        data: {
          id: auditLog.id,
          action: auditLog.action,
          entity: auditLog.entity,
          entityId: auditLog.entityId,
          userId: auditLog.userId,
          data: auditLog.data,
          ipAddress: auditLog.ipAddress,
          userAgent: auditLog.userAgent,
          createdAt: new Date(auditLog.createdAt),
        },
      })
    }

    console.log('✅ Database import completed successfully!')
    console.log(`📊 Imported: ${exportData.posts?.length || 0} posts, ${exportData.users?.length || 0} users, ${exportData.categories?.length || 0} categories`)
    
  } catch (error) {
    console.error('❌ Error importing database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Get import file from command line argument
const importFile = process.argv[2]
if (!importFile) {
  console.error('❌ Please provide the import file path as an argument')
  console.log('Usage: tsx scripts/import-db.ts <path-to-export-file>')
  process.exit(1)
}

importDatabase(importFile)
  .then(() => {
    console.log('🎉 Import complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Import failed:', error)
    process.exit(1)
  })