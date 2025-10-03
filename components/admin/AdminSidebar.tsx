'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  FolderOpen,
  Image,
  Settings,
  Activity,
  BarChart3,
  Globe,
  LogOut,
  Shield
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface AdminSidebarProps {
  user: {
    name?: string | null
    email?: string | null
    role: string
    image?: string | null
  }
}

const navigationItems = [
  {
    title: 'Tableau de bord',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR']
  },
  {
    title: 'Articles & Actualités',
    href: '/admin/posts',
    icon: FileText,
    roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR']
  },
  {
    title: 'Utilisateurs',
    href: '/admin/users',
    icon: Users,
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
  {
    title: 'Catégories',
    href: '/admin/categories',
    icon: FolderOpen,
    roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR']
  },
  {
    title: 'Médias',
    href: '/admin/media',
    icon: Image,
    roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR']
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
  {
    title: 'Journaux d\'activité',
    href: '/admin/logs',
    icon: Activity,
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
  {
    title: 'Site Web',
    href: '/',
    icon: Globe,
    roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'],
    external: true
  },
  {
    title: 'Paramètres',
    href: '/admin/settings',
    icon: Settings,
    roles: ['SUPER_ADMIN', 'ADMIN']
  }
]

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      toast.loading('Déconnexion en cours...')
      await signOut({ callbackUrl: '/' })
      toast.success('Déconnecté avec succès')
    } catch (error) {
      toast.error('Erreur lors de la déconnexion')
    }
  }

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(user.role)
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-red-500'
      case 'ADMIN':
        return 'bg-ci-orange'
      case 'EDITOR':
        return 'bg-ci-green'
      case 'AUTHOR':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Super Admin'
      case 'ADMIN':
        return 'Administrateur'
      case 'EDITOR':
        return 'Éditeur'
      case 'AUTHOR':
        return 'Auteur'
      default:
        return role
    }
  }

  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="w-10 h-10 gradient-ci rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">Admin Panel</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Consulat Côte d'Ivoire</p>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || 'Avatar'}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {user.name || user.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className={cn('w-2 h-2 rounded-full', getRoleColor(user.role))}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{getRoleLabel(user.role)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          
          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                {item.title}
              </a>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-orange-50 dark:bg-ci-orange/10 text-gray-900 dark:text-gray-100 shadow-sm border-l-4 border-ci-orange'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              <Icon className={cn(
                'w-5 h-5 transition-colors',
                isActive 
                  ? 'text-ci-orange' 
                  : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
              )} />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-700 dark:hover:text-red-300 transition-colors group"
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </div>
    </div>
  )
}