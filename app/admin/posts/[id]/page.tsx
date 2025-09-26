'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Calendar,
  User,
  Tag,
  Eye,
  Globe,
  Clock,
  FolderOpen
} from 'lucide-react'
import { toast } from 'sonner'

interface Post {
  id: string
  title: { fr: string; en?: string }
  content: { fr: string; en?: string }
  excerpt?: { fr?: string; en?: string }
  slug: string
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED'
  type: 'NEWS' | 'EVENT' | 'SERVICE' | 'ANNOUNCEMENT' | 'DOCUMENTATION'
  featured: boolean
  featuredImage?: string
  publishedAt?: string
  views: number
  createdAt: string
  updatedAt: string
  author: {
    name: string
    email: string
    role: string
  }
  category?: {
    id: string
    name: { fr: string; en?: string }
    slug: string
    color?: string
  }
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  media: Array<{
    id: string
    filename: string
    url: string
    alt?: string
    caption?: string
  }>
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

function PostViewContent() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState<'fr' | 'en'>('fr')

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/posts/${params.id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Article non trouvé')
          router.push('/admin/posts')
          return
        }
        throw new Error('Failed to fetch post')
      }
      
      const data = await response.json()
      setPost(data)
    } catch (error) {
      console.error('Error fetching post:', error)
      toast.error('Erreur lors du chargement de l\'article')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  const handleDelete = async () => {
    if (!post) return
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'article "${post.title.fr}" ?`)) {
      return
    }

    try {
      setDeleting(true)
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete post')

      toast.success('Article supprimé avec succès')
      router.push('/admin/posts')
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-ci-orange rounded-full animate-spin"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Article non trouvé</h2>
        <p className="text-gray-600 mb-4">L'article que vous cherchez n'existe pas ou a été supprimé.</p>
        <Link href="/admin/posts">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux articles
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{post.title.fr}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author.name}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
              </div>
              {post.views > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views} vues
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href={`/admin/posts/${post.id}/edit`}>
            <Button variant="outline">
              <Edit3 className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {deleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status and Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${statusColors[post.status]} border-0`}>
                  {statusLabels[post.status]}
                </Badge>
                
                <Badge variant="outline">
                  {typeLabels[post.type]}
                </Badge>

                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-0">
                    ⭐ À la une
                  </Badge>
                )}

                {post.category && (
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: post.category.color,
                      color: post.category.color 
                    }}
                  >
                    <FolderOpen className="w-3 h-3 mr-1" />
                    {post.category.name.fr}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <CardTitle>Contenu</CardTitle>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('fr')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'fr'
                        ? 'bg-ci-orange text-white'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    🇫🇷 Français
                  </button>
                  {post.title.en && (
                    <button
                      onClick={() => setActiveTab('en')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'en'
                          ? 'bg-ci-green text-white'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Titre</h3>
                <p className="text-gray-900 text-xl">
                  {activeTab === 'fr' ? post.title.fr : post.title.en || post.title.fr}
                </p>
              </div>

              {/* Excerpt */}
              {((activeTab === 'fr' && post.excerpt?.fr) || (activeTab === 'en' && post.excerpt?.en)) && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Extrait</h3>
                  <p className="text-gray-600 italic">
                    {activeTab === 'fr' ? post.excerpt?.fr : post.excerpt?.en}
                  </p>
                </div>
              )}

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Contenu</h3>
                <div 
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: activeTab === 'fr' ? post.content.fr : post.content.en || post.content.fr
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          {post.media.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  Médias ({post.media.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.media.map((media) => (
                    <div key={media.id} className="group relative rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={media.url}
                        alt={media.alt || media.filename}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                      />
                      {media.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs p-2">
                          {media.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publication Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Informations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Créé le</label>
                <p className="text-sm text-gray-900">{formatDate(post.createdAt)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Modifié le</label>
                <p className="text-sm text-gray-900">{formatDate(post.updatedAt)}</p>
              </div>
              
              {post.publishedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Publié le</label>
                  <p className="text-sm text-gray-900">{formatDate(post.publishedAt)}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-600">Slug</label>
                <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                  {post.slug}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Auteur</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 bg-ci-orange rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {post.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-600" />
                  Tags ({post.tags.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href={`/admin/posts/${post.id}/edit`} className="block">
                  <div className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all hover-lift cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Edit3 className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Modifier</p>
                        <p className="text-xs text-gray-500">Éditer le contenu</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {post.status === 'PUBLISHED' && (
                  <a
                    href={`/actualites/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="w-full p-3 text-left bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all hover-lift cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Voir en ligne</p>
                          <p className="text-xs text-gray-500">Ouvrir sur le site</p>
                        </div>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function PostViewPage() {
  return (
    <AdminLayout>
      <PostViewContent />
    </AdminLayout>
  )
}