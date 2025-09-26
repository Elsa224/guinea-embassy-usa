import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔗 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Check if tables exist
    const userCount = await prisma.user.count()
    console.log(`👥 Users in database: ${userCount}`)
    
    // List all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    })
    
    console.log('📋 All users:')
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.role}) - Active: ${user.isActive}`)
    })
    
    if (users.length === 0) {
      console.log('⚠️  No users found in database!')
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()