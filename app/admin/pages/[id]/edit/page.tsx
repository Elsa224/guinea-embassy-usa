'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { PageForm } from '@/components/admin/pages/PageForm'
import { toast } from 'react-hot-toast'

export default function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pageId, setPageId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setPageId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (pageId) {
      fetchPage()
    }
  }, [pageId])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/admin/pages/${pageId}`)
      if (!response.ok) throw new Error('Failed to fetch page')
      const data = await response.json()
      setPage(data)
    } catch (error) {
      toast.error('Erreur lors du chargement de la page')
      router.push('/admin/pages')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/pages/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update page')
      }

      toast.success('Page mise à jour avec succès')
      router.push(`/admin/pages/${pageId}`)
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour de la page')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!page) {
    return (
      <AdminLayout>
        <div className="text-center">Page non trouvée</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Modifier la page</h1>
          <p className="text-muted-foreground">
            Modifiez les informations de votre page
          </p>
        </div>

        <PageForm
          initialData={page}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Mettre à jour"
        />
      </div>
    </AdminLayout>
  )
}