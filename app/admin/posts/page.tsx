'use client'

import React, { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  FileText
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Post {
  id: string
  title: { fr: string; en?: string }
  excerpt?: { fr?: string; en?: string }
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED'
  type: 'NEWS' | 'EVENT' | 'SERVICE' | 'ANNOUNCEMENT' | 'DOCUMENTATION'
  featured: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author: {
    name: string
    email: string
    role: string
  }
  category?: {
    id: string
    name: { fr: string }
    color?: string
  }
  tags: Array<{
    id: string
    name: string
  }>
  _count?: {
    media: number
  }
}

interface PostsResponse {
  posts: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
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

const typeLabels = {
  NEWS: 'Actualité',
  EVENT: 'Événement',
  SERVICE: 'Service',
  ANNOUNCEMENT: 'Annonce',
  DOCUMENTATION: 'Documentation',
}

function PostsContent() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const fetchPosts = async (page = 1, search = '', status = '') => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(status && { status })
      })

      const response = await fetch(`/api/admin/posts?${params}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', response.status, errorData)
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }
      
      const data: PostsResponse = await response.json()
      console.log('Posts data:', data) // Debug log
      
      if (data && data.posts && Array.isArray(data.posts)) {
        setPosts(data.posts)
        setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
      } else {
        console.error('Invalid posts data structure:', data)
        setPosts([])
        setPagination({ page: 1, limit: 10, total: 0, pages: 0 })
      }
    } catch (error: any) {
      console.error('Error fetching posts:', error)
      toast.error(`Erreur lors du chargement des articles: ${error.message}`)
      setPosts([])
      setPagination({ page: 1, limit: 10, total: 0, pages: 0 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSearch = () => {
    fetchPosts(1, searchTerm, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    fetchPosts(1, searchTerm, status)
  }

  const handleDelete = async (postId: string, title: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'article "${title}" ?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete post')

      toast.success('Article supprimé avec succès')
      fetchPosts(pagination.page, searchTerm, statusFilter)
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 animate-spin"></div>
          <p className="text-gray-600">Chargement des articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles & Actualités</h1>
          <p className="text-gray-600 mt-1">
            Gérez les contenus publiés sur le site du consulat
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-ci-green text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Filter className="w-4 h-4 mr-2" />
                    {statusFilter ? statusLabels[statusFilter as keyof typeof statusLabels] : 'Statut'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusFilter('')}>
                    Tous les statuts
                  </DropdownMenuItem>
                  {Object.entries(statusLabels).map(([status, label]) => (
                    <DropdownMenuItem key={status} onClick={() => handleStatusFilter(status)}>
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={handleSearch} className="bg-ci-orange hover:bg-ci-orange/90 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                Rechercher
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Articles ({pagination.total})</span>
            <div className="text-sm font-normal text-gray-500">
              Page {pagination.page} sur {pagination.pages}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter 
                  ? 'Aucun article ne correspond à vos critères de recherche.' 
                  : 'Commencez par créer votre premier article.'
                }
              </p>
              <Link href="/admin/posts/new">
                <Button className="bg-ci-green text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un article
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {post.title.fr}
                        </h3>
                        {post.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                            ⭐ À la une
                          </Badge>
                        )}
                        <Badge className={`text-xs ${statusColors[post.status]}`}>
                          {statusLabels[post.status]}
                        </Badge>
                      </div>
                      
                      {post.excerpt?.fr && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt.fr}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {typeLabels[post.type]}
                        </div>
                        {post.category && (
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{ 
                              borderColor: post.category.color,
                              color: post.category.color 
                            }}
                          >
                            {post.category.name.fr}
                          </Badge>
                        )}
                      </div>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.id} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/posts/${post.id}`} className="flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/posts/${post.id}/edit`} className="flex items-center">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(post.id, post.title.fr)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={pagination.page === 1}
            onClick={() => fetchPosts(pagination.page - 1, searchTerm, statusFilter)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Précédent
          </button>
          
          {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <button
                key={pageNum}
                onClick={() => fetchPosts(pageNum, searchTerm, statusFilter)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
                  pageNum === pagination.page 
                    ? "bg-ci-green text-white" 
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          
          <button
            disabled={pagination.page === pagination.pages}
            onClick={() => fetchPosts(pagination.page + 1, searchTerm, statusFilter)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}

export default function PostsPage() {
  return (
    <AdminLayout>
      <PostsContent />
    </AdminLayout>
  )
}