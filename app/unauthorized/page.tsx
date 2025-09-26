import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldX, ArrowLeft, Home } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldX className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Accès Refusé
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Vous n'avez pas les permissions nécessaires
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700 text-center">
                Cette section est réservée au personnel autorisé du consulat.
                Veuillez contacter un administrateur si vous pensez qu'il s'agit d'une erreur.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/" className="block">
                <Button className="w-full gradient-ci text-white hover:opacity-90 transition-opacity">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
              
              <Link href="/auth/signin" className="block">
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la connexion
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
              <p>Consulat Général de Côte d'Ivoire</p>
              <p className="text-xs mt-1">New York</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}