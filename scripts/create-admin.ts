import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔐 Creating admin user...')

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12)
    
    const admin = await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL || 'admin@consulat-ci.org' },
      update: {},
      create: {
        email: process.env.ADMIN_EMAIL || 'admin@consulat-ci.org',
        name: 'Administrateur',
        passwordHash: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log(`📧 Email: ${admin.email}`)
    console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`)
    console.log(`👤 Role: ${admin.role}`)
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()