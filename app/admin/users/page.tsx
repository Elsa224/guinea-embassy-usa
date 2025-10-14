'use client'

import React, { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  User,
  Shield,
  Users,
  Clock
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
  }
}

interface UsersResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const roleColors = {
  SUPER_ADMIN: 'bg-red-100 text-red-800',
  ADMIN: 'bg-purple-100 text-purple-800',
  EDITOR: 'bg-blue-100 text-blue-800',
  AUTHOR: 'bg-green-100 text-green-800',
}

const roleLabels = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Administrateur',
  EDITOR: 'Éditeur',
  AUTHOR: 'Auteur',
}

function UsersContent() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [deletingUser, setDeletingUser] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const fetchUsers = async (page = 1, search = '', status = '') => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(status && { status })
      })

      const response = await fetch(`/api/admin/users?${params}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', response.status, errorData)
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }
      
      const data: UsersResponse = await response.json()
      console.log('Users data:', data)
      
      if (data && data.users && Array.isArray(data.users)) {
        setUsers(data.users)
        setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
      } else {
        console.error('Invalid users data structure:', data)
        setUsers([])
        setPagination({ page: 1, limit: 10, total: 0, pages: 0 })
      }
    } catch (error: any) {
      console.error('Error fetching users:', error)
      toast.error(`Erreur lors du chargement des utilisateurs: ${error.message}`)
      setUsers([])
      setPagination({ page: 1, limit: 10, total: 0, pages: 0 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = () => {
    fetchUsers(1, searchTerm, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    fetchUsers(1, searchTerm, status)
  }

  const handleDelete = async (userId: string, userName: string) => {
    try {
      setDeletingUser(userId)
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete user')
      }

      toast.success(`Utilisateur "${userName}" supprimé avec succès`)
      fetchUsers(pagination.page, searchTerm, statusFilter)
    } catch (error: any) {
      console.error('Error deleting user:', error)
      toast.error(error.message || 'Erreur lors de la suppression')
    } finally {
      setDeletingUser(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Jamais connecté'
    
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Aujourd\'hui'
    if (days === 1) return 'Hier'
    if (days < 7) return `Il y a ${days} jours`
    
    return formatDate(dateString)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-ci-orange rounded-full animate-spin"></div>
          <p className="text-gray-600">Chargement des utilisateurs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">
            Gérez les comptes et permissions des utilisateurs
          </p>
        </div>
        <Link href="/admin/users/new">
          <Button className="bg-ci-green text-white hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel utilisateur
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
                  placeholder="Rechercher un utilisateur..."
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
                    {statusFilter === 'active' ? 'Actifs' : statusFilter === 'inactive' ? 'Inactifs' : 'Statut'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusFilter('')}>
                    Tous les statuts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter('active')}>
                    Utilisateurs actifs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter('inactive')}>
                    Utilisateurs inactifs
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={handleSearch} className="bg-ci-orange hover:bg-ci-orange/90 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                Rechercher
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Utilisateurs ({pagination.total})</span>
            <div className="text-sm font-normal text-gray-500">
              Page {pagination.page} sur {pagination.pages}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter 
                  ? 'Aucun utilisateur ne correspond à vos critères de recherche.' 
                  : 'Commencez par créer votre premier utilisateur.'
                }
              </p>
              <Link href="/admin/users/new">
                <Button className="bg-ci-green text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un utilisateur
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-ci-orange rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                            {user.name}
                            {!user.isActive && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                Inactif
                              </Badge>
                            )}
                            {session?.user.id === user.id && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                Vous
                              </Badge>
                            )}
                          </h3>
                          <p className="text-gray-600 text-sm">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                        <Badge className={`text-xs ${roleColors[user.role]} border-0`}>
                          <Shield className="w-3 h-3 mr-1" />
                          {roleLabels[user.role]}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Créé le {formatDate(user.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatLastLogin(user.lastLoginAt)}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {user._count.posts} articles
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {user._count.media} médias
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/users/${user.id}`} className="flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir le profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/users/${user.id}/edit`} className="flex items-center">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        {session?.user.id !== user.id && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{user.name}</strong> ? 
                                  Cette action est irréversible et supprimera également tous les contenus associés.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(user.id, user.name)}
                                  className="bg-red-600 hover:bg-red-700"
                                  disabled={deletingUser === user.id}
                                >
                                  {deletingUser === user.id ? 'Suppression...' : 'Supprimer'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
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
            onClick={() => fetchUsers(pagination.page - 1, searchTerm, statusFilter)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Précédent
          </button>
          
          {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <button
                key={pageNum}
                onClick={() => fetchUsers(pageNum, searchTerm, statusFilter)}
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
            onClick={() => fetchUsers(pagination.page + 1, searchTerm, statusFilter)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}

export default function UsersPage() {
  return (
    <AdminLayout>
      <UsersContent />
    </AdminLayout>
  )
}