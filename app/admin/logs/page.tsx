'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Eye, Download, Clock, User, Database } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { formatDistanceToNow, format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AuditLog {
  id: string
  action: string
  entity: string
  entityId: string
  userId?: string
  user?: {
    id: string
    name: string
    email: string
  }
  data?: any
  ipAddress?: string
  userAgent?: string
  createdAt: string
}

const ActionBadge = ({ action }: { action: string }) => {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-green-100 text-green-800 border-green-200'
      case 'UPDATE': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200'
      case 'LOGIN': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'LOGOUT': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getActionText = (action: string) => {
    switch (action) {
      case 'CREATE': return 'Créé'
      case 'UPDATE': return 'Modifié'
      case 'DELETE': return 'Supprimé'
      case 'LOGIN': return 'Connexion'
      case 'LOGOUT': return 'Déconnexion'
      default: return action
    }
  }

  return (
    <Badge className={getActionColor(action)}>
      {getActionText(action)}
    </Badge>
  )
}

const EntityBadge = ({ entity }: { entity: string }) => {
  const getEntityText = (entity: string) => {
    switch (entity) {
      case 'User': return 'Utilisateur'
      case 'Post': return 'Article'
      case 'Category': return 'Catégorie'
      case 'Media': return 'Média'
      case 'Page': return 'Page'
      default: return entity
    }
  }

  return (
    <Badge variant="outline">
      {getEntityText(entity)}
    </Badge>
  )
}

function ActivityLogsContent() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [entityFilter, setEntityFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    fetchLogs()
  }, [currentPage, actionFilter, entityFilter, userFilter, searchTerm])

  const fetchLogs = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      })

      if (actionFilter) params.append('action', actionFilter)
      if (entityFilter) params.append('entity', entityFilter)
      if (userFilter) params.append('userId', userFilter)
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/admin/logs?${params}`)
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs)
        setTotalPages(data.totalPages)
        setTotalCount(data.pagination?.totalCount || 0)
      }
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportLogs = async () => {
    try {
      const params = new URLSearchParams()
      if (actionFilter) params.append('action', actionFilter)
      if (entityFilter) params.append('entity', entityFilter)
      if (userFilter) params.append('userId', userFilter)
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/admin/logs/export?${params}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `activity-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error exporting logs:', error)
    }
  }

  const resetFilters = () => {
    setSearchTerm('')
    setActionFilter('')
    setEntityFilter('')
    setUserFilter('')
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1) // Reset to first page when filtering
    
    switch (filterType) {
      case 'action':
        setActionFilter(value === 'all' ? '' : value)
        break
      case 'entity':
        setEntityFilter(value === 'all' ? '' : value)
        break
      case 'user':
        setUserFilter(value === 'all' ? '' : value)
        break
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Journal d'activité</h1>
          <p className="text-gray-600">Suivez toutes les actions effectuées dans le système</p>
        </div>
        <Button onClick={exportLogs} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={actionFilter || 'all'} onValueChange={(value) => handleFilterChange('action', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les actions</SelectItem>
                <SelectItem value="CREATE">Créé</SelectItem>
                <SelectItem value="UPDATE">Modifié</SelectItem>
                <SelectItem value="DELETE">Supprimé</SelectItem>
                <SelectItem value="LOGIN">Connexion</SelectItem>
                <SelectItem value="LOGOUT">Déconnexion</SelectItem>
              </SelectContent>
            </Select>

            <Select value={entityFilter || 'all'} onValueChange={(value) => handleFilterChange('entity', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type d'entité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les entités</SelectItem>
                <SelectItem value="User">Utilisateur</SelectItem>
                <SelectItem value="Post">Article</SelectItem>
                <SelectItem value="Category">Catégorie</SelectItem>
                <SelectItem value="Media">Média</SelectItem>
                <SelectItem value="Page">Page</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={resetFilters} variant="outline">
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {logs.map((log) => (
          <Card key={log.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <ActionBadge action={log.action} />
                    <EntityBadge entity={log.entity} />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      {log.user && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{log.user.name}</span>
                          <span className="text-gray-400">({log.user.email})</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatDistanceToNow(new Date(log.createdAt), { 
                            addSuffix: true, 
                            locale: fr 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Database className="w-4 h-4" />
                        <span>ID: {log.entityId.slice(0, 8)}...</span>
                      </div>
                      
                      {log.ipAddress && (
                        <span>IP: {log.ipAddress}</span>
                      )}
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Détails de l'activité</DialogTitle>
                      <DialogDescription>
                        {format(new Date(log.createdAt), 'dd MMMM yyyy à HH:mm:ss', { locale: fr })}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Action</label>
                          <div className="mt-1">
                            <ActionBadge action={log.action} />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Entité</label>
                          <div className="mt-1">
                            <EntityBadge entity={log.entity} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {log.user && (
                          <div>
                            <label className="text-sm font-medium text-gray-700">Utilisateur</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">{log.user.name}</p>
                              <p className="text-xs text-gray-600">{log.user.email}</p>
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="text-sm font-medium text-gray-700">ID de l'entité</label>
                          <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-900 font-mono break-all">{log.entityId}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {log.ipAddress && (
                          <div>
                            <label className="text-sm font-medium text-gray-700">Adresse IP</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-900 font-mono">{log.ipAddress}</p>
                            </div>
                          </div>
                        )}

                        {log.userAgent && (
                          <div>
                            <label className="text-sm font-medium text-gray-700">Navigateur</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-900 break-words line-clamp-3" title={log.userAgent}>
                                {log.userAgent}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {log.data && (
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Données de l'activité</label>
                          <Card>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {/* Handle different data structures */}
                                {typeof log.data === 'object' && log.data !== null ? (
                                  <div className="space-y-3">
                                    {/* Show before/after for updates */}
                                    {log.data.before && log.data.after && (
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="text-sm font-medium text-gray-700 mb-2">Avant</h4>
                                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                                              {JSON.stringify(log.data.before, null, 2)}
                                            </pre>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-gray-700 mb-2">Après</h4>
                                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                                              {JSON.stringify(log.data.after, null, 2)}
                                            </pre>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Show regular data if not before/after structure */}
                                    {!log.data.before && !log.data.after && (
                                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words overflow-x-auto">
                                          {JSON.stringify(log.data, null, 2)}
                                        </pre>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">{String(log.data)}</p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {logs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune activité trouvée
            </h3>
            <p className="text-gray-600">
              Aucune activité ne correspond à vos critères de recherche.
            </p>
          </CardContent>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {((currentPage - 1) * 20) + 1} à {Math.min(currentPage * 20, totalCount)} sur {totalCount} entrées
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ActivityLogsPage() {
  return (
    <AdminLayout breadcrumbTitle="Journal d'activité">
      <ActivityLogsContent />
    </AdminLayout>
  )
}