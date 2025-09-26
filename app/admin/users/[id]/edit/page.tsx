'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  User, 
  Mail,
  Shield,
  Key,
  Clock,
  Loader2
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR'
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
  _count: {
    posts: number
    media: number
    auditLogs: number
  }
}

const roleLabels = {
  SUPER_ADMIN: 'Super Administrateur',
  ADMIN: 'Administrateur',
  EDITOR: 'Éditeur',
  AUTHOR: 'Auteur',
}

const roleDescriptions = {
  SUPER_ADMIN: 'Accès complet à toutes les fonctionnalités',
  ADMIN: 'Gestion des utilisateurs et des contenus',
  EDITOR: 'Création et modification des contenus',
  AUTHOR: 'Création de contenus uniquement',
}

function EditUserForm() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR';
    isActive: boolean;
    password: string;
  }>({
    name: '',
    email: '',
    role: 'AUTHOR',
    isActive: true,
    password: '', // Only for updates
  })

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Utilisateur non trouvé')
          router.push('/admin/users')
          return
        }
        throw new Error('Failed to fetch user')
      }
      
      const userData: User = await response.json()
      setUser(userData)
      setFormData({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        isActive: userData.isActive,
        password: '',
      })
    } catch (error) {
      console.error('Error fetching user:', error)
      toast.error('Erreur lors du chargement de l\'utilisateur')
      router.push('/admin/users')
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchUser()
      setLoading(false)
    }
    
    if (params.id) {
      loadData()
    }
  }, [params.id])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Le nom est requis')
      return
    }
    
    if (!formData.email.trim()) {
      toast.error('L\'email est requis')
      return
    }

    setSaving(true)

    try {
      const submitData: any = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        isActive: formData.isActive,
      }

      // Only include password if it's provided
      if (formData.password.trim()) {
        submitData.password = formData.password
      }

      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la sauvegarde')
      }

      const updatedUser = await response.json()
      toast.success('Utilisateur modifié avec succès')
      
      router.push(`/admin/users/${updatedUser.id}`)
    } catch (error: any) {
      console.error('Error saving user:', error)
      toast.error(error.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
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
          <p className="text-gray-600">Chargement de l'utilisateur...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const isOwnProfile = session?.user.id === user.id
  const canChangeRole = !isOwnProfile && session?.user.role === 'SUPER_ADMIN'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/users/${params.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Modifier {isOwnProfile ? 'votre profil' : 'l\'utilisateur'}
            </h1>
            <p className="text-gray-600">
              {isOwnProfile ? 'Mettez à jour vos informations personnelles' : `Éditez les informations de ${user.name}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="submit"
            form="user-form"
            disabled={saving}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          <Link href={`/admin/users/${user.id}`}>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Voir le profil
            </Button>
          </Link>
        </div>
      </div>

      <form id="user-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-ci-orange" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  placeholder="Saisissez le nom complet..."
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Adresse email *</Label>
                <div className="relative mt-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@consulat.ci"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-ci-green" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="password">
                  {isOwnProfile ? 'Nouveau mot de passe (optionnel)' : 'Réinitialiser le mot de passe (optionnel)'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isOwnProfile ? "Laissez vide pour conserver l'actuel" : "Laissez vide pour ne pas modifier"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {isOwnProfile 
                    ? "Minimum 8 caractères. Laissez vide pour conserver votre mot de passe actuel."
                    : "Minimum 8 caractères. Laissez vide pour ne pas modifier le mot de passe de l'utilisateur."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Role and Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Rôle et Statut
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {canChangeRole ? (
                <div>
                  <Label htmlFor="role">Rôle utilisateur</Label>
                  <Select value={formData.role} onValueChange={(value: any) => handleInputChange('role', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AUTHOR">
                        <div className="flex flex-col items-start">
                          <span>Auteur</span>
                          <span className="text-xs text-gray-500">Création de contenus</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="EDITOR">
                        <div className="flex flex-col items-start">
                          <span>Éditeur</span>
                          <span className="text-xs text-gray-500">Création et modification</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ADMIN">
                        <div className="flex flex-col items-start">
                          <span>Administrateur</span>
                          <span className="text-xs text-gray-500">Gestion complète</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="SUPER_ADMIN">
                        <div className="flex flex-col items-start">
                          <span>Super Administrateur</span>
                          <span className="text-xs text-gray-500">Accès total</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    {roleDescriptions[formData.role]}
                  </p>
                </div>
              ) : (
                <div>
                  <Label>Rôle utilisateur</Label>
                  <div className="mt-1">
                    <Badge className="bg-purple-100 text-purple-800">
                      <Shield className="w-3 h-3 mr-1" />
                      {roleLabels[formData.role]}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {isOwnProfile 
                        ? "Vous ne pouvez pas modifier votre propre rôle"
                        : "Seuls les Super Administrateurs peuvent modifier les rôles"
                      }
                    </p>
                  </div>
                </div>
              )}

              {!isOwnProfile && canChangeRole && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Compte actif</Label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                Informations du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ID Utilisateur</label>
                <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded mt-1">
                  {user.id}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Compte créé</label>
                <p className="text-sm text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Dernière modification</label>
                <p className="text-sm text-gray-900">{formatDate(user.updatedAt)}</p>
              </div>
              
              {user.lastLoginAt && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Dernière connexion</label>
                  <p className="text-sm text-gray-900">{formatDate(user.lastLoginAt)}</p>
                </div>
              )}

              <div className="pt-2 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-ci-orange">{user._count.posts}</div>
                    <div className="text-xs text-gray-500">Articles</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-ci-green">{user._count.media}</div>
                    <div className="text-xs text-gray-500">Médias</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

export default function EditUserPage() {
  return (
    <AdminLayout>
      <EditUserForm />
    </AdminLayout>
  )
}