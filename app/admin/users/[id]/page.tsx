'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Calendar,
  User,
  Shield,
  Clock,
  Mail,
  FileText,
  Image,
  Activity
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

const roleColors = {
  SUPER_ADMIN: 'bg-red-100 text-red-800',
  ADMIN: 'bg-purple-100 text-purple-800',
  EDITOR: 'bg-blue-100 text-blue-800',
  AUTHOR: 'bg-green-100 text-green-800',
}

const roleLabels = {
  SUPER_ADMIN: 'Super Administrateur',
  ADMIN: 'Administrateur',
  EDITOR: 'Éditeur',
  AUTHOR: 'Auteur',
}

const roleDescriptions = {
  SUPER_ADMIN: 'Accès complet à toutes les fonctionnalités du système',
  ADMIN: 'Gestion des utilisateurs et des contenus',
  EDITOR: 'Création et modification des contenus',
  AUTHOR: 'Création de contenus uniquement',
}

function UserViewContent() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/users/${params.id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Utilisateur non trouvé')
          router.push('/admin/users')
          return
        }
        throw new Error('Failed to fetch user')
      }
      
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error('Error fetching user:', error)
      toast.error('Erreur lors du chargement de l\'utilisateur')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchUser()
    }
  }, [params.id])

  const handleDelete = async () => {
    if (!user) return
    
    try {
      setDeleting(true)
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete user')
      }

      toast.success('Utilisateur supprimé avec succès')
      router.push('/admin/users')
    } catch (error: any) {
      console.error('Error deleting user:', error)
      toast.error(error.message || 'Erreur lors de la suppression')
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

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Jamais connecté'
    
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (hours < 1) return 'Il y a moins d\'une heure'
    if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
    if (days === 1) return 'Hier'
    if (days < 7) return `Il y a ${days} jours`
    
    return formatDate(dateString)
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
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Utilisateur non trouvé</h2>
        <p className="text-gray-600 mb-4">L'utilisateur que vous cherchez n'existe pas ou a été supprimé.</p>
        <Link href="/admin/users">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux utilisateurs
          </Button>
        </Link>
      </div>
    )
  }

  const isOwnProfile = session?.user.id === user.id

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-ci-orange to-ci-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {user.name}
                {isOwnProfile && (
                  <Badge className="bg-blue-100 text-blue-800">
                    Votre profil
                  </Badge>
                )}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Membre depuis {formatDate(user.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/${user.id}/edit`}>
            <Button variant="outline">
              <Edit3 className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          </Link>
          {!isOwnProfile && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{user.name}</strong> ? 
                    Cette action est irréversible et supprimera également tous les contenus associés ({user._count.posts} articles, {user._count.media} médias).
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={deleting}
                  >
                    {deleting ? 'Suppression...' : 'Supprimer'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status and Role */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${roleColors[user.role]} border-0`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {roleLabels[user.role]}
                </Badge>
                
                <Badge className={user.isActive ? 'bg-green-100 text-green-800 border-0' : 'bg-red-100 text-red-800 border-0'}>
                  {user.isActive ? 'Actif' : 'Inactif'}
                </Badge>

                {user.lastLoginAt && (
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    Connecté {formatLastLogin(user.lastLoginAt)}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-ci-orange" />
                Rôle et Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{roleLabels[user.role]}</h3>
                  <p className="text-gray-600 text-sm">
                    {roleDescriptions[user.role]}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Permissions principales :</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {user.role === 'SUPER_ADMIN' && (
                      <>
                        <li>• Gestion complète des utilisateurs</li>
                        <li>• Configuration système</li>
                        <li>• Accès aux logs et analytics</li>
                        <li>• Gestion des contenus</li>
                      </>
                    )}
                    {user.role === 'ADMIN' && (
                      <>
                        <li>• Gestion des utilisateurs</li>
                        <li>• Gestion des contenus</li>
                        <li>• Modération</li>
                      </>
                    )}
                    {user.role === 'EDITOR' && (
                      <>
                        <li>• Création et édition des contenus</li>
                        <li>• Gestion des médias</li>
                        <li>• Publication d'articles</li>
                      </>
                    )}
                    {user.role === 'AUTHOR' && (
                      <>
                        <li>• Création d'articles</li>
                        <li>• Gestion de ses propres contenus</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-ci-green" />
                Activité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{user._count.posts}</div>
                  <div className="text-sm text-gray-600">Articles créés</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Image className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{user._count.media}</div>
                  <div className="text-sm text-gray-600">Médias téléchargés</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">{user._count.auditLogs}</div>
                  <div className="text-sm text-gray-600">Actions enregistrées</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Informations du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ID Utilisateur</label>
                <p className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                  {user.id}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Nom complet</label>
                <p className="text-sm text-gray-900">{user.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Adresse email</label>
                <p className="text-sm text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Statut du compte</label>
                <Badge className={user.isActive ? 'bg-green-100 text-green-800 border-0' : 'bg-red-100 text-red-800 border-0'}>
                  {user.isActive ? 'Compte actif' : 'Compte désactivé'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                Historique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Compte créé</label>
                <p className="text-sm text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Dernière modification</label>
                <p className="text-sm text-gray-900">{formatDate(user.updatedAt)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Dernière connexion</label>
                <p className="text-sm text-gray-900">
                  {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Aucune connexion enregistrée'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href={`/admin/users/${user.id}/edit`} className="block">
                  <div className="w-full p-3 text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-lg transition-all hover-lift cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Edit3 className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Modifier le profil</p>
                        <p className="text-xs text-gray-500">Éditer les informations</p>
                      </div>
                    </div>
                  </div>
                </Link>

                {user._count.posts > 0 && (
                  <Link href={`/admin/posts?author=${user.id}`} className="block">
                    <div className="w-full p-3 text-left bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg transition-all hover-lift cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Voir les articles</p>
                          <p className="text-xs text-gray-500">{user._count.posts} articles</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function UserViewPage() {
  return (
    <AdminLayout>
      <UserViewContent />
    </AdminLayout>
  )
}