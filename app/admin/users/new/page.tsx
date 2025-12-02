'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail,
  Shield,
  Key,
  UserPlus,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner'

const roleLabels = {
  AUTHOR: 'Auteur',
  EDITOR: 'Éditeur', 
  ADMIN: 'Administrateur',
  SUPER_ADMIN: 'Super Administrateur',
}

const roleDescriptions = {
  AUTHOR: 'Peut créer et gérer ses propres articles',
  EDITOR: 'Peut créer, modifier et publier des contenus',
  ADMIN: 'Gestion complète des utilisateurs et contenus',
  SUPER_ADMIN: 'Accès complet à toutes les fonctionnalités du système',
}

function CreateUserForm() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'AUTHOR';
  }>({
    name: '',
    email: '',
    password: '',
    role: 'AUTHOR',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setSaving(true)

    try {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
      }

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la création')
      }

      const newUser = await response.json()
      toast.success(`Utilisateur "${newUser.name}" créé avec succès`)
      
      router.push(`/admin/users/${newUser.id}`)
    } catch (error: any) {
      console.error('Error creating user:', error)
      
      if (error.message.includes('email already exists')) {
        setErrors({ email: 'Un utilisateur avec cet email existe déjà' })
      } else {
        toast.error(error.message || 'Erreur lors de la création')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nouvel Utilisateur</h1>
            <p className="text-gray-600">Créez un nouveau compte utilisateur</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="submit"
            form="create-user-form"
            disabled={saving}
            className="bg-ci-green text-white hover:opacity-90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
            {saving ? 'Création...' : 'Créer l\'utilisateur'}
          </button>
        </div>
      </div>

      <form id="create-user-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  placeholder="Ex: Jean Dupont"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
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
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative mt-1">
                  <Key className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 caractères"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 8 caractères. L'utilisateur pourra le modifier lors de sa première connexion.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Rôle et Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="role">Rôle utilisateur</Label>
                <Select value={formData.role} onValueChange={(value: any) => handleInputChange('role', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUTHOR">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Auteur</span>
                        <span className="text-xs text-gray-500">Création de contenus</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="EDITOR">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Éditeur</span>
                        <span className="text-xs text-gray-500">Création et modification</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ADMIN">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Administrateur</span>
                        <span className="text-xs text-gray-500">Gestion complète</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="SUPER_ADMIN">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Super Administrateur</span>
                        <span className="text-xs text-gray-500">Accès total</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {roleLabels[formData.role]}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {roleDescriptions[formData.role]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Permissions accordées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {formData.role === 'AUTHOR' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Créer des articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Modifier ses propres articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Télécharger des médias</span>
                    </div>
                  </>
                )}
                
                {formData.role === 'EDITOR' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Toutes les permissions Auteur</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Modifier tous les articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Publier des articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Gérer les catégories</span>
                    </div>
                  </>
                )}
                
                {formData.role === 'ADMIN' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Toutes les permissions Éditeur</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Gestion des utilisateurs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Modération des contenus</span>
                    </div>
                  </>
                )}
                
                {formData.role === 'SUPER_ADMIN' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Toutes les permissions Admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Configuration système</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Accès aux logs et analytics</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Note */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">À propos de la création d'utilisateurs</h3>
                  <p className="text-sm text-blue-700">
                    Le nouvel utilisateur recevra ses identifiants par email et devra se connecter pour la première fois avec le mot de passe que vous avez défini.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

export default function CreateUserPage() {
  return (
    <AdminLayout>
      <CreateUserForm />
    </AdminLayout>
  )
}