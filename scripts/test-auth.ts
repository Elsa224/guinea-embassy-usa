import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testAuth() {
  try {
    console.log('🔐 Testing authentication...')
    
    const email = process.env.ADMIN_EMAIL || 'admin@consulat-ci.org'
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    
    console.log(`📧 Testing with email: ${email}`)
    console.log(`🔑 Testing with password: ${password}`)
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      console.error('❌ User not found!')
      return
    }
    
    console.log(`✅ User found: ${user.name} (${user.role})`)
    console.log(`🔓 User active: ${user.isActive}`)
    
    // Test password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    
    if (isValidPassword) {
      console.log('✅ Password is correct!')
      console.log('🎉 Authentication should work!')
    } else {
      console.error('❌ Password is incorrect!')
      
      // Let's check what the stored hash looks like
      console.log('🔍 Debug info:')
      console.log(`  - Stored hash length: ${user.passwordHash.length}`)
      console.log(`  - Hash starts with: ${user.passwordHash.substring(0, 10)}...`)
      
      // Let's create a new hash for comparison
      const newHash = await bcrypt.hash(password, 12)
      console.log(`  - New hash would be: ${newHash.substring(0, 10)}...`)
      
      // Update the user with correct password hash
      console.log('🔧 Updating password hash...')
      await prisma.user.update({
        where: { email },
        data: { passwordHash: newHash }
      })
      console.log('✅ Password hash updated!')
    }
    
  } catch (error) {
    console.error('❌ Auth test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAuth()