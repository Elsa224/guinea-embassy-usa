'use client'

import { useEffect, useState } from 'react'
import { Layout } from '@/components/layout'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Page {
  id: string
  title: { fr: string; en: string }
  slug: string
  content: { fr: string; en: string }
  serviceType?: string | null
  requiredDocs?: { fr: string[]; en: string[] } | null
  fees?: Record<string, number> | null
  processingTime?: { fr: string; en: string } | null
  paymentLink?: string | null
  formLink?: string | null
  children?: Page[]
}

const serviceTypeLabels: Record<string, { fr: string; en: string }> = {
  'visa': { fr: 'Visa', en: 'Visa' },
  'passeport': { fr: 'Passeport', en: 'Passport' },
  'carte-consulaire': { fr: 'Carte Consulaire', en: 'Consular Card' },
  'transcription': { fr: 'Transcription', en: 'Transcription' },
  'legalisation': { fr: 'Légalisation', en: 'Legalization' },
  'certification': { fr: 'Certification', en: 'Certification' },
  'autres-documents': { fr: 'Autres Documents', en: 'Other Documents' },
}

export default function DynamicServicePage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }>
}) {
  const router = useRouter()
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<'fr' | 'en'>('fr')
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      const resolvedSlug = `services/${resolvedParams.slug.join('/')}`
      setSlug(resolvedSlug)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (slug) {
      fetchPage()
    }
  }, [slug])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/pages/${encodeURIComponent(slug)}`)
      if (response.ok) {
        const data = await response.json()
        setPage(data)
      } else {
        // Page not found, redirect to services
        router.push('/services')
      }
    } catch (error) {
      console.error('Error fetching page:', error)
      router.push('/services')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ci-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!page) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Page non trouvée</h1>
            <Button asChild>
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux services
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  const currentContent = {
    title: page.title[language],
    content: page.content[language],
    requiredDocs: page.requiredDocs?.[language] || [],
    processingTime: page.processingTime?.[language] || '',
  }

  return (
    <Layout>
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center"
            >
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                {currentContent.title}
              </h1>
              {page.serviceType && (
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  Service {serviceTypeLabels[page.serviceType]?.[language] || page.serviceType}
                </p>
              )}
            </motion.div>

            {/* Navigation and Language Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 flex items-center justify-between"
            >
              <Button variant="outline" asChild>
                <Link href="/services">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux services
                </Link>
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant={language === 'fr' ? 'default' : 'outline'}
                  onClick={() => setLanguage('fr')}
                  className={`rounded-lg px-4 py-2 text-sm ${language === 'fr' ? 'bg-gray-800 hover:bg-gray-900' : ''}`}
                >
                  FR
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className={`rounded-lg px-4 py-2 text-sm ${language === 'en' ? 'bg-gray-800 hover:bg-gray-900' : ''}`}
                >
                  EN
                </Button>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Page Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.content }}
              />

              {/* Children Pages */}
              {page.children && page.children.length > 0 && (
                <Card className="overflow-hidden border-0 bg-gray-50 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">
                      {language === 'fr' ? 'Services connexes' : 'Related Services'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {page.children.map((child) => (
                        <motion.div
                          key={child.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="group cursor-pointer"
                        >
                          <Link href={`/${child.slug}`}>
                            <Card className="overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
                              <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                  {child.title[language]}
                                </h3>
                                {child.serviceType && (
                                  <Badge variant="outline" className="text-xs">
                                    {serviceTypeLabels[child.serviceType]?.[language] || child.serviceType}
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}