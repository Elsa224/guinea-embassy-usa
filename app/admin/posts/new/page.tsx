'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import TipTapEditor from '@/components/admin/TipTapEditor'
import { PostPreviewModal } from '@/components/admin/PostPreviewModal'
import { SchedulePublishDialog } from '@/components/admin/SchedulePublishDialog'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  FileText, 
  Calendar,
  Tag,
  X,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'
import { useAutoSave } from '@/hooks/useAutoSave'
import Link from 'next/link'

interface Category {
  id: string
  name: { fr: string; en?: string }
  color?: string
}

interface Tag {
  id: string
  name: string
  slug: string
}

function NewPostForm() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [lastSaved, setLastSaved] = useState<Date | undefined>()
  const [showPreview, setShowPreview] = useState(false)
  const [previewLanguage, setPreviewLanguage] = useState<'fr' | 'en'>('fr')
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [createdPostId, setCreatedPostId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: { fr: '', en: '' },
    content: { fr: '', en: '' },
    excerpt: { fr: '', en: '' },
    status: 'DRAFT' as const,
    type: 'NEWS' as const,
    featured: false,
    categoryId: '',
    publishedAt: '',
  })

  // Auto-save functionality for new posts
  const autoSaveData = {
    ...formData,
    tags: selectedTags,
  }

  const { isSaving: isAutoSaving } = useAutoSave({
    data: autoSaveData,
    onSave: async (data) => {
      // Only auto-save if there's actual content
      if (!data.title.fr && !data.content.fr) return

      if (createdPostId) {
        // Update existing draft
        const response = await fetch(`/api/admin/posts/${createdPostId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            status: 'DRAFT',
          }),
        })
        
        if (!response.ok) {
          throw new Error('Auto-save failed')
        }
      } else {
        // Create new draft
        const response = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            status: 'DRAFT',
          }),
        })
        
        if (!response.ok) {
          throw new Error('Auto-save failed')
        }
        
        const result = await response.json()
        setCreatedPostId(result.id)
      }
    },
    onSuccess: () => {
      setLastSaved(new Date())
    },
    onError: (error) => {
      console.error('Auto-save error:', error)
    },
    enabled: true,
    delay: 5000, // Auto-save every 5 seconds
  })

  useEffect(() => {
    fetchCategories()
    fetchTags()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        console.log('Categories data:', data) // Debug log
        setCategories(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Erreur lors du chargement des catégories')
      setCategories([])
    }
  }

  const fetchTags = async () => {
    try {
      // For now, we'll create a simple tag system
      // In a real implementation, you might have a tags API endpoint
      const mockTags: Tag[] = [
        { id: '1', name: 'Important', slug: 'important' },
        { id: '2', name: 'Visa', slug: 'visa' },
        { id: '3', name: 'Passeport', slug: 'passeport' },
        { id: '4', name: 'Urgence', slug: 'urgence' },
        { id: '5', name: 'Communauté', slug: 'communaute' },
        { id: '6', name: 'Diplomatie', slug: 'diplomatie' },
      ]
      setAvailableTags(mockTags)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const handleInputChange = (field: string, value: any, lang?: string) => {
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev] as any,
          [lang]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const addTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId))
  }

  const createNewTag = () => {
    if (newTag.trim()) {
      const id = Date.now().toString()
      const tag: Tag = {
        id,
        name: newTag.trim(),
        slug: newTag.toLowerCase().replace(/\s+/g, '-')
      }
      setAvailableTags([...availableTags, tag])
      addTag(id)
      setNewTag('')
      toast.success('Tag créé et ajouté')
    }
  }

  const handleSubmit = async (e: React.FormEvent, action: 'save' | 'publish') => {
    e.preventDefault()
    
    if (!formData.title.fr) {
      toast.error('Le titre en français est requis')
      return
    }
    
    if (!formData.content.fr) {
      toast.error('Le contenu en français est requis')
      return
    }

    setSaving(true)

    try {
      const submitData = {
        ...formData,
        status: action === 'publish' ? 'PUBLISHED' : formData.status,
        tags: selectedTags,
        publishedAt: action === 'publish' ? new Date().toISOString() : formData.publishedAt || null,
      }

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la sauvegarde')
      }

      const post = await response.json()
      toast.success(
        action === 'publish' ? 'Article publié avec succès' : 'Article sauvegardé avec succès'
      )
      
      router.push(`/admin/posts/${post.id}`)
    } catch (error: any) {
      console.error('Error saving post:', error)
      toast.error(error.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouvel Article</h1>
            <p className="text-gray-600">Créez un nouveau contenu pour le site</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowScheduleDialog(true)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Programmer
          </Button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'save')}
            disabled={saving}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'publish')}
            disabled={saving}
            className="gradient-ci text-white hover:opacity-90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
          >
            <FileText className="w-4 h-4 mr-2" />
            Publier
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-ci-orange" />
                Titre de l'article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title-fr">Titre (Français) *</Label>
                <Input
                  id="title-fr"
                  placeholder="Saisissez le titre en français..."
                  value={formData.title.fr}
                  onChange={(e) => handleInputChange('title', e.target.value, 'fr')}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="title-en">Titre (Anglais)</Label>
                <Input
                  id="title-en"
                  placeholder="Enter title in English..."
                  value={formData.title.en}
                  onChange={(e) => handleInputChange('title', e.target.value, 'en')}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Contenu de l'article</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="content-fr">Contenu (Français) *</Label>
                <div className="mt-2">
                  <TipTapEditor
                    content={formData.content.fr}
                    onChange={(content) => handleInputChange('content', content, 'fr')}
                    placeholder="Rédigez votre article en français..."
                    showStatus={true}
                    isSaving={isAutoSaving}
                    lastSaved={lastSaved}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="content-en">Contenu (Anglais)</Label>
                <div className="mt-2">
                  <TipTapEditor
                    content={formData.content.en}
                    onChange={(content) => handleInputChange('content', content, 'en')}
                    placeholder="Write your article in English..."
                    showStatus={true}
                    isSaving={isAutoSaving}
                    lastSaved={lastSaved}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardHeader>
              <CardTitle>Extrait (optionnel)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="excerpt-fr">Extrait (Français)</Label>
                <Textarea
                  id="excerpt-fr"
                  placeholder="Résumé court de l'article..."
                  value={formData.excerpt.fr}
                  onChange={(e) => handleInputChange('excerpt', e.target.value, 'fr')}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="excerpt-en">Extrait (Anglais)</Label>
                <Textarea
                  id="excerpt-en"
                  placeholder="Short summary of the article..."
                  value={formData.excerpt.en}
                  onChange={(e) => handleInputChange('excerpt', e.target.value, 'en')}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-ci-green" />
                Publication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Brouillon</SelectItem>
                    <SelectItem value="REVIEW">En révision</SelectItem>
                    <SelectItem value="PUBLISHED">Publié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Type d'article</Label>
                <Select value={formData.type} onValueChange={(value: any) => handleInputChange('type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEWS">Actualité</SelectItem>
                    <SelectItem value="EVENT">Événement</SelectItem>
                    <SelectItem value="SERVICE">Service</SelectItem>
                    <SelectItem value="ANNOUNCEMENT">Annonce</SelectItem>
                    <SelectItem value="DOCUMENTATION">Documentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="featured">Article à la une</Label>
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name.fr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tagId) => {
                    const tag = availableTags.find(t => t.id === tagId)
                    return tag ? (
                      <Badge key={tagId} variant="secondary" className="flex items-center gap-1">
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => removeTag(tagId)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ) : null
                  })}
                </div>
              )}

              {/* Available Tags */}
              <div>
                <Label>Tags disponibles</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableTags
                    .filter(tag => !selectedTags.includes(tag.id))
                    .map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => addTag(tag.id)}
                        className="inline-flex items-center rounded-md border border-input bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        + {tag.name}
                      </button>
                    ))
                  }
                </div>
              </div>

              {/* New Tag */}
              <div>
                <Label>Créer un nouveau tag</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Nom du tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && createNewTag()}
                  />
                  <button
                    type="button"
                    onClick={createNewTag}
                    disabled={!newTag.trim()}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>

      {/* Preview Modal */}
      <PostPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        post={{
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          status: formData.status,
          type: formData.type,
          featured: formData.featured,
          publishedAt: formData.publishedAt,
          category: categories.find(c => c.id === formData.categoryId),
          tags: selectedTags.map(tagId => {
            const tag = availableTags.find(t => t.id === tagId);
            return tag ? { name: tag.name } : null;
          }).filter(Boolean) as Array<{ name: string }>
        }}
        language={previewLanguage}
      />

      {/* Schedule Publish Dialog */}
      <SchedulePublishDialog
        open={showScheduleDialog}
        onClose={() => setShowScheduleDialog(false)}
        currentDate={formData.publishedAt}
        onSchedule={(publishDate) => {
          setFormData(prev => ({ ...prev, publishedAt: publishDate, status: 'DRAFT' }));
          toast.success('Publication programmée avec succès');
        }}
      />
    </div>
  )
}

export default function NewPostPage() {
  return (
    <AdminLayout>
      <NewPostForm />
    </AdminLayout>
  )
}