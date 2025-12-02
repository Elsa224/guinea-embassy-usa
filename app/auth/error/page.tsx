'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: 'Erreur de Configuration',
    description: 'Il y a un problème avec la configuration du serveur. Veuillez contacter l\'administrateur.',
  },
  AccessDenied: {
    title: 'Accès Refusé',
    description: 'Vous n\'avez pas les permissions nécessaires pour accéder à cette ressource.',
  },
  Verification: {
    title: 'Erreur de Vérification',
    description: 'Le lien de vérification a expiré ou est invalide.',
  },
  Default: {
    title: 'Erreur d\'Authentification',
    description: 'Une erreur inattendue s\'est produite lors de l\'authentification.',
  },
}

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || 'Default'
  
  const errorInfo = errorMessages[error] || errorMessages.Default

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {errorInfo.title}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Consulat Général de Côte d'Ivoire
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700 text-center">
                {errorInfo.description}
              </p>
              {error === 'Configuration' && (
                <div className="mt-3 text-xs text-red-600 bg-red-100 p-2 rounded">
                  <strong>Code d'erreur:</strong> {error}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Link href="/auth/signin" className="block">
                <Button className="w-full bg-ci-green text-white hover:opacity-90 transition-opacity">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer la connexion
                </Button>
              </Link>
              
              <Link href="/" className="block">
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
              <p>Si le problème persiste, contactez:</p>
              <p className="text-xs mt-1 font-medium">support@consulat-ci.org</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}