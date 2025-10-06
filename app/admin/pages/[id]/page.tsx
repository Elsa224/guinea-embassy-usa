'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Edit, 
  Trash, 
  Globe, 
  Calendar,
  User,
  Clock,
  FileText,
  DollarSign,
  Link as LinkIcon
} from 'lucide-react'
import { toast } from 'react-hot-toast'

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  REVIEW: 'bg-yellow-100 text-yellow-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-red-100 text-red-800',
}

const statusLabels = {
  DRAFT: 'Brouillon',
  REVIEW: 'En révision',
  PUBLISHED: 'Publié',
  ARCHIVED: 'Archivé',
}

interface Page {
  id: string
  title: { fr: string; en: string }
  slug: string
  content: { fr: string; en: string }
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED'
  template: string
  metaTitle?: { fr: string; en: string }
  metaDescription?: { fr: string; en: string }
  order: number
  serviceType?: string | null
  requiredDocs?: { fr: string[]; en: string[] } | null
  fees?: Record<string, number> | null
  processingTime?: { fr: string; en: string } | null
  paymentLink?: string | null
  formLink?: string | null
  parent?: { title: { fr: string; en: string } } | null
  children?: Page[]
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

export default function PageViewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [pageId, setPageId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setPageId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (pageId) {
      fetchPage()
    }
  }, [pageId])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/admin/pages/${pageId}`)
      if (!response.ok) throw new Error('Failed to fetch page')
      const data = await response.json()
      setPage(data)
    } catch (error) {
      toast.error('Erreur lors du chargement de la page')
      router.push('/admin/pages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) return

    try {
      const response = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete page')
      
      toast.success('Page supprimée avec succès')
      router.push('/admin/pages')
    } catch (error) {
      toast.error('Erreur lors de la suppression de la page')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!page) {
    return (
      <AdminLayout>
        <div className="text-center">Page non trouvée</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{page.title.fr}</h1>
            <p className="text-muted-foreground">{page.title.en}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/pages">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={`/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-2 h-4 w-4" />
                Voir sur le site
              </a>
            </Button>
            <Button asChild>
              <Link href={`/admin/pages/${pageId}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Slug</p>
                  <p className="text-sm">{page.slug}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Template</p>
                  <p className="text-sm">{page.template}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Statut</p>
                  <Badge className={statusColors[page.status]}>
                    {statusLabels[page.status]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ordre</p>
                  <p className="text-sm">{page.order}</p>
                </div>
              </div>
              
              {page.parent && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Page parente</p>
                  <p className="text-sm">{page.parent.title.fr}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500 mb-2">Aperçu du contenu (FR)</p>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.content.fr.substring(0, 300) + '...' }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Métadonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Créé le</span>
                  <span>{new Date(page.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Modifié le</span>
                  <span>{new Date(page.updatedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                {page.publishedAt && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">Publié le</span>
                    <span>{new Date(page.publishedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {page.serviceType && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations de service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type de service</p>
                    <Badge variant="outline">{page.serviceType}</Badge>
                  </div>
                  
                  {page.processingTime && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Délai de traitement</p>
                      <p className="text-sm">{page.processingTime.fr}</p>
                    </div>
                  )}

                  {page.fees && Object.keys(page.fees).length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Frais</p>
                      <div className="space-y-1 mt-1">
                        {Object.entries(page.fees).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-3 w-3 text-gray-400" />
                            <span className="capitalize">{key}:</span>
                            <span className="font-medium">${value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {page.requiredDocs && page.requiredDocs.fr.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Documents requis</p>
                      <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                        {page.requiredDocs.fr.slice(0, 3).map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                        {page.requiredDocs.fr.length > 3 && (
                          <li>... et {page.requiredDocs.fr.length - 3} autres</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {page.paymentLink && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lien de paiement</p>
                      <a
                        href={page.paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon className="h-3 w-3" />
                        {new URL(page.paymentLink).hostname}
                      </a>
                    </div>
                  )}

                  {page.formLink && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lien du formulaire</p>
                      <a
                        href={page.formLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        {new URL(page.formLink).hostname}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}