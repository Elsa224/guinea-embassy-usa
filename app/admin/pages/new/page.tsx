'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { PageForm } from '@/components/admin/pages/PageForm'
import { toast } from 'react-hot-toast'

export default function NewPagePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create page')
      }

      const page = await response.json()
      toast.success('Page créée avec succès')
      router.push(`/admin/pages/${page.id}`)
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la création de la page')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Nouvelle Page</h1>
          <p className="text-muted-foreground">
            Créez une nouvelle page de contenu pour votre site
          </p>
        </div>

        <PageForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Créer la page"
        />
      </div>
    </AdminLayout>
  )
}