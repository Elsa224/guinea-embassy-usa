'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Users, 
  Eye,
  TrendingUp,
  Activity,
  Calendar,
  Clock,
  BarChart3
} from 'lucide-react'

const statsData = [
  {
    title: 'Total Articles',
    value: '127',
    change: '+12%',
    trend: 'up',
    icon: FileText,
    color: 'bg-blue-500'
  },
  {
    title: 'Utilisateurs Actifs',
    value: '23',
    change: '+5%',
    trend: 'up', 
    icon: Users,
    color: 'bg-green-500'
  },
  {
    title: 'Vues ce mois',
    value: '12.4K',
    change: '+18%',
    trend: 'up',
    icon: Eye,
    color: 'bg-orange-500'
  },
  {
    title: 'Taux d\'engagement',
    value: '73%',
    change: '+3%',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-purple-500'
  }
]

const recentActivity = [
  {
    action: 'Nouvel article publié',
    user: 'Marie Kouassi',
    time: 'Il y a 2 heures',
    type: 'create'
  },
  {
    action: 'Utilisateur inscrit',
    user: 'Jean Baptiste',
    time: 'Il y a 4 heures', 
    type: 'user'
  },
  {
    action: 'Article mis à jour',
    user: 'Admin Système',
    time: 'Il y a 6 heures',
    type: 'update'
  },
  {
    action: 'Nouvelle catégorie créée',
    user: 'Marie Kouassi',
    time: 'Il y a 1 jour',
    type: 'create'
  }
]

function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-ci-green rounded-full flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-gray-600 mt-1">
              Consulat Général de Côte d'Ivoire à New York
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric', 
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover-lift border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">ce mois</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-ci-orange" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'create' ? 'bg-green-500' :
                    activity.type === 'update' ? 'bg-blue-500' :
                    activity.type === 'user' ? 'bg-purple-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">Par {activity.user}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/posts/new" className="block">
                <div className="w-full p-3 text-left bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-all hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-ci-orange" />
                    <div>
                      <p className="text-sm font-medium">Nouvel Article</p>
                      <p className="text-xs text-gray-500">Créer un nouveau contenu</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link href="/admin/users" className="block">
                <div className="w-full p-3 text-left bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-ci-green" />
                    <div>
                      <p className="text-sm font-medium">Gérer Utilisateurs</p>
                      <p className="text-xs text-gray-500">Permissions et rôles</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/admin/logs" className="block">
                <div className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Voir Journaux</p>
                      <p className="text-xs text-gray-500">Activité système</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  )
}