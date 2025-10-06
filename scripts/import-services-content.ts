import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

interface ServiceMapping {
  fileName: string
  slug: string
  serviceType: string
  title: { fr: string; en: string }
  template: 'service'
  order: number
}

const servicesMapping: ServiceMapping[] = [
  {
    fileName: 'conditions-visa.md',
    slug: 'services/visa',
    serviceType: 'visa',
    title: { fr: 'Services de Visa', en: 'Visa Services' },
    template: 'service',
    order: 1,
  },
  {
    fileName: 'conditions-passeport.md',
    slug: 'services/passeport',
    serviceType: 'passeport',
    title: { fr: 'Services de Passeport', en: 'Passport Services' },
    template: 'service',
    order: 2,
  },
  {
    fileName: 'conditions-carte-consulaire.md',
    slug: 'services/carte-consulaire',
    serviceType: 'carte-consulaire',
    title: { fr: 'Carte Consulaire', en: 'Consular Card' },
    template: 'service',
    order: 3,
  },
  {
    fileName: 'transcription-acte-de-mariage.md',
    slug: 'services/etat-civil/transcription-mariage',
    serviceType: 'transcription',
    title: { fr: 'Transcription d\'Acte de Mariage', en: 'Marriage Certificate Transcription' },
    template: 'service',
    order: 4,
  },
  {
    fileName: 'transcription-deces.md',
    slug: 'services/etat-civil/transcription-deces',
    serviceType: 'transcription',
    title: { fr: 'Transcription d\'Acte de Décès', en: 'Death Certificate Transcription' },
    template: 'service',
    order: 5,
  },
  {
    fileName: 'conditions-transcription-et-copies-des-actes-de-civil.md',
    slug: 'services/etat-civil/transcription-actes',
    serviceType: 'transcription',
    title: { fr: 'Transcription et Copies d\'Actes d\'État Civil', en: 'Civil Status Transcription' },
    template: 'service',
    order: 6,
  },
  {
    fileName: 'conditions-laissez-passer.md',
    slug: 'services/autres-documents/laissez-passer',
    serviceType: 'autres-documents',
    title: { fr: 'Laissez-passer', en: 'Laissez-passer' },
    template: 'service',
    order: 7,
  },
  {
    fileName: 'conditions-legalisation-d-actes.md',
    slug: 'services/autres-documents/legalisation',
    serviceType: 'legalisation',
    title: { fr: 'Légalisation d\'Actes', en: 'Document Legalization' },
    template: 'service',
    order: 8,
  },
  {
    fileName: 'conditions-certification-d-actes.md',
    slug: 'services/autres-documents/certification',
    serviceType: 'certification',
    title: { fr: 'Certification d\'Actes', en: 'Document Certification' },
    template: 'service',
    order: 9,
  },
  {
    fileName: 'demarches-consulaires.md',
    slug: 'services',
    serviceType: '',
    title: { fr: 'Services Consulaires', en: 'Consular Services' },
    template: 'service',
    order: 0,
  },
]

async function parseMarkdownContent(content: string) {
  // Extract fees if present
  const fees: Record<string, number> = {}
  const feeMatches = content.matchAll(/(\d+)\s*\$|€(\d+)|USD\s*(\d+)/g)
  
  // Extract required documents
  const requiredDocs: string[] = []
  const docSection = content.match(/Pièces à fournir[:\s]*\n([\s\S]*?)(?=\n\n|\n#|$)/i)
  if (docSection) {
    const lines = docSection[1].split('\n')
    lines.forEach(line => {
      const cleaned = line.replace(/^[-*•]\s*/, '').trim()
      if (cleaned.length > 0) {
        requiredDocs.push(cleaned)
      }
    })
  }

  // Extract processing time
  let processingTime = ''
  const timeMatch = content.match(/(\d+\s*(?:jours?|days?)\s*(?:ouvrables?|business)?)/i)
  if (timeMatch) {
    processingTime = timeMatch[1]
  }

  // Extract payment link
  let paymentLink = ''
  const paymentMatch = content.match(/https?:\/\/[^\s]+embassyepay[^\s]*/i)
  if (paymentMatch) {
    paymentLink = paymentMatch[0]
  }

  return {
    content,
    fees,
    requiredDocs,
    processingTime,
    paymentLink,
  }
}

async function importServices() {
  try {
    console.log('🚀 Starting services content import...')

    const contentDir = path.join(process.cwd(), 'assets/services-consulaires-new-content')

    // First, create parent pages if they don't exist
    const parentPages = [
      {
        title: { fr: 'État Civil', en: 'Civil Status' },
        slug: 'services/etat-civil',
        content: { fr: 'Services d\'état civil', en: 'Civil status services' },
        status: 'PUBLISHED' as const,
        template: 'default',
        order: 4,
      },
      {
        title: { fr: 'Autres Documents', en: 'Other Documents' },
        slug: 'services/autres-documents',
        content: { fr: 'Autres services documentaires', en: 'Other document services' },
        status: 'PUBLISHED' as const,
        template: 'default',
        order: 5,
      },
    ]

    for (const parentPage of parentPages) {
      const existing = await prisma.page.findUnique({
        where: { slug: parentPage.slug },
      })

      if (!existing) {
        await prisma.page.create({
          data: {
            ...parentPage,
            publishedAt: new Date(),
          },
        })
        console.log(`✅ Created parent page: ${parentPage.title.fr}`)
      }
    }

    // Import service pages
    for (const service of servicesMapping) {
      try {
        const filePath = path.join(contentDir, service.fileName)
        const content = await fs.readFile(filePath, 'utf-8')
        
        const parsed = await parseMarkdownContent(content)
        
        // Check if page already exists
        const existingPage = await prisma.page.findUnique({
          where: { slug: service.slug },
        })

        let parentId: string | null = null
        if (service.slug.includes('etat-civil')) {
          const parent = await prisma.page.findUnique({
            where: { slug: 'services/etat-civil' },
          })
          parentId = parent?.id || null
        } else if (service.slug.includes('autres-documents')) {
          const parent = await prisma.page.findUnique({
            where: { slug: 'services/autres-documents' },
          })
          parentId = parent?.id || null
        }

        const pageData = {
          title: service.title,
          slug: service.slug,
          content: {
            fr: parsed.content,
            en: 'English content to be added', // Placeholder for English content
          },
          status: 'PUBLISHED' as const,
          template: service.template,
          serviceType: service.serviceType || null,
          requiredDocs: parsed.requiredDocs.length > 0 ? {
            fr: parsed.requiredDocs,
            en: [], // English docs to be added later
          } : null,
          fees: Object.keys(parsed.fees).length > 0 ? parsed.fees : null,
          processingTime: parsed.processingTime ? {
            fr: parsed.processingTime,
            en: parsed.processingTime, // Can be translated later
          } : null,
          paymentLink: parsed.paymentLink || 'https://www.ci-embassyepay.org/',
          order: service.order,
          parentId,
          publishedAt: new Date(),
        }

        if (existingPage) {
          await prisma.page.update({
            where: { id: existingPage.id },
            data: pageData,
          })
          console.log(`✅ Updated: ${service.title.fr}`)
        } else {
          await prisma.page.create({
            data: pageData,
          })
          console.log(`✅ Created: ${service.title.fr}`)
        }
      } catch (error) {
        console.error(`❌ Error processing ${service.fileName}:`, error)
      }
    }

    console.log('🎉 Services content import completed!')
  } catch (error) {
    console.error('❌ Import failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the import
importServices()