'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  Trash,
  ChevronRight,
  FileText,
  Globe,
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Page {
  id: string
  title: { fr: string; en: string }
  slug: string
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED'
  serviceType?: string | null
  template: string
  order: number
  parent?: { title: { fr: string; en: string } } | null
  children?: Page[]
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

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

const serviceTypeLabels: Record<string, string> = {
  'visa': 'Visa',
  'passeport': 'Passeport',
  'carte-consulaire': 'Carte Consulaire',
  'etat-civil': 'État Civil',
  'autres-documents': 'Autres Documents',
  'transcription': 'Transcription',
  'legalisation': 'Légalisation',
  'certification': 'Certification',
}

export default function PagesPage() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterServiceType, setFilterServiceType] = useState<string>('')

  useEffect(() => {
    fetchPages()
  }, [filterStatus, filterServiceType])

  const fetchPages = async () => {
    try {
      const params = new URLSearchParams()
      if (filterStatus) params.append('status', filterStatus)
      if (filterServiceType) params.append('serviceType', filterServiceType)
      
      const response = await fetch(`/api/admin/pages?${params}`)
      if (!response.ok) throw new Error('Failed to fetch pages')
      const data = await response.json()
      setPages(data)
    } catch (error) {
      toast.error('Erreur lors du chargement des pages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) return

    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete page')
      
      toast.success('Page supprimée avec succès')
      fetchPages()
    } catch (error) {
      toast.error('Erreur lors de la suppression de la page')
    }
  }

  const filteredPages = pages.filter((page) => {
    const query = searchQuery.toLowerCase()
    return (
      page.title.fr.toLowerCase().includes(query) ||
      page.title.en.toLowerCase().includes(query) ||
      page.slug.toLowerCase().includes(query)
    )
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Pages</h1>
            <p className="text-muted-foreground">
              Gérez les pages de contenu du site, y compris les services consulaires
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/pages/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle page
            </Link>
          </Button>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-4 border-b space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher par titre ou slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="px-3 py-2 border rounded-md text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Tous les statuts</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              
              <select
                className="px-3 py-2 border rounded-md text-sm"
                value={filterServiceType}
                onChange={(e) => setFilterServiceType(e.target.value)}
              >
                <option value="">Tous les types</option>
                {Object.entries(serviceTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Modifié le</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : filteredPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Aucune page trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{page.title.fr}</p>
                            <p className="text-sm text-gray-500">{page.slug}</p>
                          </div>
                        </div>
                        {page.parent && (
                          <div className="flex items-center text-xs text-gray-500 ml-6">
                            <ChevronRight className="h-3 w-3 mr-1" />
                            {page.parent.title.fr}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {page.serviceType ? (
                        <Badge variant="outline">
                          {serviceTypeLabels[page.serviceType] || page.serviceType}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          Page standard
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[page.status]}>
                        {statusLabels[page.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/pages/${page.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/pages/${page.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <a
                              href={`/${page.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Globe className="mr-2 h-4 w-4" />
                              Voir sur le site
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(page.id)}
                            className="text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}