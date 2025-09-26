import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
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

  console.log('✅ Admin user created:', admin.email)

  // Create default categories
  const categories = [
    {
      name: { fr: 'Actualités', en: 'News' },
      slug: 'actualites',
      description: { fr: 'Dernières nouvelles du consulat', en: 'Latest consulate news' },
      color: '#FF7F00',
      icon: 'newspaper',
      order: 1,
    },
    {
      name: { fr: 'Services', en: 'Services' },
      slug: 'services',
      description: { fr: 'Services consulaires disponibles', en: 'Available consular services' },
      color: '#00AA4F',
      icon: 'briefcase',
      order: 2,
    },
    {
      name: { fr: 'Événements', en: 'Events' },
      slug: 'evenements',
      description: { fr: 'Événements et cérémonies', en: 'Events and ceremonies' },
      color: '#003366',
      icon: 'calendar',
      order: 3,
    },
    {
      name: { fr: 'Annonces', en: 'Announcements' },
      slug: 'annonces',
      description: { fr: 'Annonces officielles', en: 'Official announcements' },
      color: '#FF4444',
      icon: 'megaphone',
      order: 4,
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log('✅ Default categories created')

  // Create default tags
  const tags = [
    { name: 'Important', slug: 'important' },
    { name: 'Visa', slug: 'visa' },
    { name: 'Passeport', slug: 'passeport' },
    { name: 'Urgence', slug: 'urgence' },
    { name: 'Communauté', slug: 'communaute' },
    { name: 'Diplomatie', slug: 'diplomatie' },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    })
  }

  console.log('✅ Default tags created')

  // Create default settings
  const settings = [
    {
      key: 'site_title',
      value: { fr: 'Consulat Général de Côte d\'Ivoire - New York', en: 'Consulate General of Côte d\'Ivoire - New York' },
      type: 'text',
    },
    {
      key: 'site_description',
      value: { fr: 'Site officiel du Consulat Général de Côte d\'Ivoire à New York', en: 'Official website of the Consulate General of Côte d\'Ivoire in New York' },
      type: 'text',
    },
    {
      key: 'contact_email',
      value: 'consulat.newyork@diplomatie.gouv.ci',
      type: 'email',
    },
    {
      key: 'contact_phone',
      value: '+1 (212) 697-0900',
      type: 'phone',
    },
    {
      key: 'address',
      value: '801 Second Avenue, 5th Floor, New York, NY 10017',
      type: 'text',
    },
    {
      key: 'opening_hours',
      value: {
        fr: 'Lundi - Vendredi: 9h00 - 17h00',
        en: 'Monday - Friday: 9:00 AM - 5:00 PM',
      },
      type: 'text',
    },
    {
      key: 'social_facebook',
      value: 'https://facebook.com/consulat-ci-ny',
      type: 'url',
    },
    {
      key: 'social_twitter',
      value: 'https://twitter.com/consulat_ci_ny',
      type: 'url',
    },
    {
      key: 'posts_per_page',
      value: '10',
      type: 'number',
    },
    {
      key: 'site_language_default',
      value: 'fr',
      type: 'select',
    },
  ]

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('✅ Default settings created')

  // Create sample posts
  const actualitesCategory = await prisma.category.findUnique({ where: { slug: 'actualites' } })
  const servicesCategory = await prisma.category.findUnique({ where: { slug: 'services' } })

  if (actualitesCategory) {
    const samplePosts = [
      {
        title: {
          fr: 'Nouvelle procédure de demande de visa',
          en: 'New visa application procedure',
        },
        slug: 'nouvelle-procedure-visa-2025',
        content: {
          fr: '<p>À partir du 1er février 2025, une nouvelle procédure simplifiée sera mise en place pour les demandes de visa...</p>',
          en: '<p>Starting February 1st, 2025, a new simplified procedure will be implemented for visa applications...</p>',
        },
        excerpt: {
          fr: 'Découvrez la nouvelle procédure simplifiée pour les demandes de visa.',
          en: 'Discover the new simplified procedure for visa applications.',
        },
        status: 'PUBLISHED' as const,
        type: 'NEWS' as const,
        featured: true,
        publishedAt: new Date('2025-01-15'),
        authorId: admin.id,
        categoryId: actualitesCategory.id,
      },
      {
        title: {
          fr: 'Horaires d\'ouverture modifiés',
          en: 'Modified opening hours',
        },
        slug: 'horaires-ouverture-modifies',
        content: {
          fr: '<p>Nous vous informons que nos horaires d\'ouverture ont été modifiés temporairement...</p>',
          en: '<p>We inform you that our opening hours have been temporarily modified...</p>',
        },
        excerpt: {
          fr: 'Modification temporaire des horaires d\'ouverture du consulat.',
          en: 'Temporary modification of consulate opening hours.',
        },
        status: 'PUBLISHED' as const,
        type: 'ANNOUNCEMENT' as const,
        featured: false,
        publishedAt: new Date('2025-01-12'),
        authorId: admin.id,
        categoryId: actualitesCategory.id,
      },
    ]

    for (const post of samplePosts) {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: post,
      })
    }

    console.log('✅ Sample posts created')
  }

  // Create sample pages
  const samplePages = [
    {
      title: {
        fr: 'À propos',
        en: 'About',
      },
      slug: 'a-propos',
      content: {
        fr: '<p>Le Consulat Général de Côte d\'Ivoire à New York...</p>',
        en: '<p>The Consulate General of Côte d\'Ivoire in New York...</p>',
      },
      status: 'PUBLISHED' as const,
      template: 'page',
      metaTitle: {
        fr: 'À propos du Consulat',
        en: 'About the Consulate',
      },
      metaDescription: {
        fr: 'Découvrez l\'histoire et la mission du Consulat Général de Côte d\'Ivoire à New York.',
        en: 'Discover the history and mission of the Consulate General of Côte d\'Ivoire in New York.',
      },
      order: 1,
      publishedAt: new Date(),
    },
    {
      title: {
        fr: 'Mentions légales',
        en: 'Legal notices',
      },
      slug: 'mentions-legales',
      content: {
        fr: '<p>Mentions légales du site web...</p>',
        en: '<p>Legal notices of the website...</p>',
      },
      status: 'PUBLISHED' as const,
      template: 'legal',
      order: 2,
      publishedAt: new Date(),
    },
  ]

  for (const page of samplePages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    })
  }

  console.log('✅ Sample pages created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })