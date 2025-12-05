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
      name: { fr: 'Annonces Officielles', en: 'Official Announcements' },
      slug: 'annonces-officielles',
      description: { fr: 'Annonces officielles du consulat', en: 'Official consulate announcements' },
      color: '#ff7f00',
      icon: 'megaphone',
      order: 4,
    },
    {
      name: { fr: 'Élections', en: 'Elections' },
      slug: 'elections',
      description: { fr: 'Informations électorales', en: 'Electoral information' },
      color: '#ff7f00',
      icon: 'vote',
      order: 5,
    },
    {
      name: { fr: 'Publications', en: 'Publications' },
      slug: 'publications',
      description: { fr: 'Publications officielles et documents', en: 'Official publications and documents' },
      color: '#8b5cf6',
      icon: 'book',
      order: 6,
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
    { name: 'Express54', slug: 'express54' },
    { name: 'Services Digitaux', slug: 'services-digitaux' },
    { name: 'Cartes d\'Électeur', slug: 'cartes-electeur' },
    { name: 'Élections', slug: 'elections' },
    { name: 'CEI', slug: 'cei' },
    { name: 'Bulletin', slug: 'bulletin' },
    { name: 'Magazine', slug: 'magazine' },
    { name: 'SPECI', slug: 'speci' },
    { name: 'Publication Officielle', slug: 'publication-officielle' },
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

  // Create actualites posts from mock data
  const publicationsCategory = await prisma.category.findUnique({ where: { slug: 'publications' } })
  const electionsCategory = await prisma.category.findUnique({ where: { slug: 'elections' } })
  const annoncesCategory = await prisma.category.findUnique({ where: { slug: 'annonces-officielles' } })

  // Get tags
  const bulletinTag = await prisma.tag.findUnique({ where: { slug: 'bulletin' } })
  const magazineTag = await prisma.tag.findUnique({ where: { slug: 'magazine' } })
  const speciTag = await prisma.tag.findUnique({ where: { slug: 'speci' } })
  const publicationTag = await prisma.tag.findUnique({ where: { slug: 'publication-officielle' } })
  const cartesElecteurTag = await prisma.tag.findUnique({ where: { slug: 'cartes-electeur' } })
  const electionsTag = await prisma.tag.findUnique({ where: { slug: 'elections' } })
  const ceiTag = await prisma.tag.findUnique({ where: { slug: 'cei' } })
  const express54Tag = await prisma.tag.findUnique({ where: { slug: 'express54' } })
  const servicesDigitauxTag = await prisma.tag.findUnique({ where: { slug: 'services-digitaux' } })

  // Create media for the posts
  const bulletinCoverMedia = await prisma.media.create({
    data: {
      filename: 'Bulletin-SPECI-cover.png',
      originalName: 'Bulletin SPECI Cover',
      url: '/assets/actualites/Bulletin-SPECI-cover.png',
      type: 'IMAGE',
      size: 2048000,
      mimeType: 'image/png',
      alt: 'Bulletin SPECI - Couverture du Magazine Consulaire',
      caption: 'Couverture du Bulletin SPECI - Magazine du Consulat Général',
      uploaderId: admin.id,
    },
  })

  const bulletinPdfMedia = await prisma.media.create({
    data: {
      filename: 'Bulettin-SPECI.pdf',
      originalName: 'Bulletin SPECI',
      url: '/assets/actualites/Bulettin-SPECI.pdf',
      type: 'DOCUMENT',
      size: 5120000,
      mimeType: 'application/pdf',
      alt: 'Bulletin SPECI - Magazine Consulaire PDF',
      caption: 'Bulletin SPECI - Magazine du Consulat Général',
      uploaderId: admin.id,
    },
  })

  const carteElecteurMedia = await prisma.media.create({
    data: {
      filename: 'retrait-carte-electeur.jpg',
      originalName: 'Retrait Carte Electeur',
      url: '/assets/actualites/retrait-carte-electeur.jpg',
      type: 'IMAGE',
      size: 1024000,
      mimeType: 'image/jpeg',
      alt: 'Distribution des Cartes d\'Électeur - Octobre 2025',
      caption: 'Information officielle sur la distribution des cartes d\'électeur',
      uploaderId: admin.id,
    },
  })

  const noteInfoMedia = await prisma.media.create({
    data: {
      filename: 'note-d-information.jpeg',
      originalName: 'Note d\'Information',
      url: '/assets/actualites/note-d-information.jpeg',
      type: 'IMAGE',
      size: 1024000,
      mimeType: 'image/jpeg',
      alt: 'Note d\'Information - Plateforme Express54',
      caption: 'Note d\'Information officielle du Consulat Général',
      uploaderId: admin.id,
    },
  })

  if (publicationsCategory && electionsCategory && annoncesCategory) {
    const actualitesPosts = [
      {
        title: {
          fr: 'Bulletin SPECI - Magazine Consulaire',
          en: 'Bulletin SPECI - Consular Magazine',
        },
        slug: 'bulletin-speci-magazine',
        content: {
          fr: `Découvrez le nouveau Bulletin SPECI, le magazine officiel du Consulat Général de Côte d'Ivoire à New York. Cette édition contient des informations importantes sur nos services, des actualités consulaires, et des nouvelles de la communauté ivoirienne aux États-Unis.

<div style='background-color: #fff5e6; border-left: 4px solid #ff7f00; padding: 16px; margin: 16px 0;'>
<h4 style='color: #ff7f00; margin: 0 0 8px 0; font-weight: bold;'>📖 Contenu du Magazine</h4>
<ul style='margin: 8px 0; padding-left: 20px;'>
<li>Services consulaires et nouveautés</li>
<li>Actualités de la communauté ivoirienne</li>
<li>Informations pratiques pour les ressortissants</li>
<li>Événements et activités culturelles</li>
</ul>
</div>

<div style='background-color: #f0f9f4; border-left: 4px solid #00aa4f; padding: 16px; margin: 16px 0;'>
<h4 style='color: #00aa4f; margin: 0 0 8px 0; font-weight: bold;'>📥 Téléchargement</h4>
<p style='margin: 0; font-weight: 600;'>Le magazine est disponible en format PDF pour consultation et téléchargement.</p>
</div>

<p style='text-align: center; margin-top: 20px;'>Consultez régulièrement notre site pour les nouvelles éditions du Bulletin SPECI.</p>`,
          en: `Discover the new Bulletin SPECI, the official magazine of the Consulate General of Côte d'Ivoire in New York. This edition contains important information about our services, consular news, and news from the Ivorian community in the United States.`,
        },
        excerpt: {
          fr: 'Découvrez le nouveau Bulletin SPECI, le magazine officiel du Consulat Général de Côte d\'Ivoire à New York avec les dernières actualités consulaires.',
          en: 'Discover the new Bulletin SPECI, the official magazine of the Consulate General of Côte d\'Ivoire in New York with the latest consular news.',
        },
        status: 'PUBLISHED' as const,
        type: 'DOCUMENTATION' as const,
        featured: false,
        publishedAt: new Date('2025-12-02T19:45:00'),
        authorId: admin.id,
        categoryId: publicationsCategory.id,
      },
      {
        title: {
          fr: 'Distribution des Cartes d\'Électeur',
          en: 'Distribution of Voter Cards',
        },
        slug: 'distribution-cartes-electeur-octobre-2025',
        content: {
          fr: `Distribution des cartes d'électeur pour les <strong style='color: #ff7f00;'>Ivoiriens et Ivoiriennes</strong> résidant aux États-Unis et inscrits sur la liste électorale.

<div style='background-color: #fff5e6; border-left: 4px solid #ff7f00; padding: 16px; margin: 16px 0;'>
<h4 style='color: #ff7f00; margin: 0 0 8px 0; font-weight: bold;'>📅 Dates et Horaires</h4>
<p style='margin: 0; font-weight: 600;'>Les <span style='color: #00aa4f; font-weight: bold;'>11, 12, 13, 18, 19 et 20 octobre 2025</span></p>
<p style='margin: 4px 0 0 0;'>de <strong style='color: #ff7f00;'>10H à 17H</strong></p>
</div>

<div style='background-color: #f0f9f4; border-left: 4px solid #00aa4f; padding: 16px; margin: 16px 0;'>
<h4 style='color: #00aa4f; margin: 0 0 8px 0; font-weight: bold;'>📍 Lieu</h4>
<p style='margin: 0; font-weight: 600;'>800 Second Avenue, 5 Floor</p>
<p style='margin: 4px 0 0 0;'>New York, NY 10017</p>
</div>

<div style='background-color: #fef7f0; border-left: 4px solid #ff7f00; padding: 16px; margin: 16px 0;'>
<h4 style='color: #ff7f00; margin: 0 0 8px 0; font-weight: bold;'>📞 Contact</h4>
<p style='margin: 0; font-size: 18px; font-weight: bold; color: #00aa4f;'>+1 347 200 8654</p>
</div>

<div style='background-color: #dc2626; color: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center;'>
<h4 style='color: white; margin: 0 0 8px 0; font-weight: bold; font-size: 16px;'>⚠️ IMPORTANT</h4>
<p style='margin: 0; font-weight: bold; font-size: 14px;'>RETIRER VOTRE CARTE D'ÉLECTEUR</p>
<p style='margin: 4px 0 0 0; font-size: 14px;'>ELLE CONTIENT VOS DONNÉES PERSONNELLES</p>
</div>

<p style='text-align: center; margin-top: 20px;'>Pour plus d'informations, visitez <a href='https://www.cei.ci' style='color: #00aa4f; font-weight: bold; text-decoration: underline;' target='_blank'>www.cei.ci</a></p>`,
          en: 'Distribution of voter cards for Ivorians residing in the United States and registered on the electoral list.',
        },
        excerpt: {
          fr: 'Distribution des cartes d\'électeur pour les Ivoiriens résidant aux États-Unis du 11 au 20 octobre 2025 au Consulat Général de New York.',
          en: 'Distribution of voter cards for Ivorians residing in the United States from October 11-20, 2025 at the Consulate General in New York.',
        },
        status: 'PUBLISHED' as const,
        type: 'EVENT' as const,
        featured: true,
        publishedAt: new Date('2025-10-14T11:22:00'),
        authorId: admin.id,
        categoryId: electionsCategory.id,
      },
      {
        title: {
          fr: 'Note d\'Information',
          en: 'Information Notice',
        },
        slug: 'note-d-information-express54',
        content: {
          fr: `Il est porté à la connaissance de l'ensemble des usagers du Consulat Général de Côte d'Ivoire à New York, que la plateforme digitale de demande des actes consulaires EXPRESS54 est disponible et fonctionnel.

À cet égard, le Consulat Général encourage les usagers résidents dans les États de : Connecticut ; Caroline du Nord ; Caroline du Sud ; Floride ; Géorgie ; Illinois ; Indiana ; Maine ; Massachusetts ; Michigan ; Minnesota ; Missouri ; New Hampshire ; New Jersey ; New York ; Ohio ; Pennsylvanie ; Rhodes Island ; Vermont ; Wisconsin, à soumettre leurs demandes via le lien suivant : https://www.express54.org, ou à télécharger l'application mobile sur App store en recherchant « Express54 ».

Le Consulat Général reste joignable au (917) 392-2797, pour répondre à toutes vos préoccupations.`,
          en: `It is brought to the attention of all users of the Consulate General of Côte d'Ivoire in New York, that the digital platform for requesting consular documents EXPRESS54 is available and functional.`,
        },
        excerpt: {
          fr: 'Il est porté à la connaissance de l\'ensemble des usagers du Consulat Général de Côte d\'Ivoire à New York, que la plateforme digitale de demande des actes consulaires EXPRESS54 est disponible et fonctionnel.',
          en: 'It is brought to the attention of all users of the Consulate General of Côte d\'Ivoire in New York, that the digital platform for requesting consular documents EXPRESS54 is available and functional.',
        },
        status: 'PUBLISHED' as const,
        type: 'NEWS' as const,
        featured: false,
        publishedAt: new Date('2025-10-08T10:00:00'),
        authorId: admin.id,
        categoryId: annoncesCategory.id,
      },
    ]

    // Create the posts and connect tags and media
    const createdPosts = []
    for (const [index, post] of actualitesPosts.entries()) {
      const createdPost = await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: post,
      })
      createdPosts.push(createdPost)
    }

    // Connect tags to bulletin post
    if (bulletinTag && magazineTag && speciTag && publicationTag) {
      await prisma.post.update({
        where: { slug: 'bulletin-speci-magazine' },
        data: {
          tags: {
            connect: [
              { id: bulletinTag.id },
              { id: magazineTag.id },
              { id: speciTag.id },
              { id: publicationTag.id },
            ],
          },
          media: {
            connect: [
              { id: bulletinCoverMedia.id },
              { id: bulletinPdfMedia.id },
            ],
          },
        },
      })
    }

    // Connect tags to elections post
    if (cartesElecteurTag && electionsTag && ceiTag) {
      await prisma.post.update({
        where: { slug: 'distribution-cartes-electeur-octobre-2025' },
        data: {
          tags: {
            connect: [
              { id: cartesElecteurTag.id },
              { id: electionsTag.id },
              { id: ceiTag.id },
            ],
          },
          media: {
            connect: [{ id: carteElecteurMedia.id }],
          },
        },
      })
    }

    // Connect tags to express54 post
    if (express54Tag && servicesDigitauxTag) {
      await prisma.post.update({
        where: { slug: 'note-d-information-express54' },
        data: {
          tags: {
            connect: [
              { id: express54Tag.id },
              { id: servicesDigitauxTag.id },
            ],
          },
          media: {
            connect: [{ id: noteInfoMedia.id }],
          },
        },
      })
    }

    console.log('✅ Actualites posts created with media and tags')
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