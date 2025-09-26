'use client'

import React from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileQuestion, ArrowLeft, Home, Search } from 'lucide-react'

export default function AdminNotFound() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 gradient-ci rounded-full flex items-center justify-center mx-auto mb-6">
              <FileQuestion className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              404
            </CardTitle>
            <p className="text-xl text-gray-600 mt-2">
              Page non trouvée
            </p>
            <p className="text-sm text-gray-500 mt-4">
              La page que vous recherchez n'existe pas dans l'administration.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 text-center">
                Cette section de l'administration n'est pas disponible ou l'URL est incorrecte.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin" className="block">
                <Button className="w-full gradient-ci text-white hover:opacity-90 transition-opacity">
                  <Home className="w-4 h-4 mr-2" />
                  Tableau de bord
                </Button>
              </Link>
              
              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin/posts" className="block">
                  <Button variant="outline" className="w-full text-sm border-gray-300 hover:bg-gray-50">
                    Articles
                  </Button>
                </Link>
                
                <Link href="/admin/users" className="block">
                  <Button variant="outline" className="w-full text-sm border-gray-300 hover:bg-gray-50">
                    Utilisateurs
                  </Button>
                </Link>
              </div>

              <button 
                onClick={() => window.history.back()} 
                className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Page précédente
              </button>
            </div>

            <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-100">
              <p>Administration • Consulat de Côte d'Ivoire</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}