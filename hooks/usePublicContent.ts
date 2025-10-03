"use client";

import { useState, useEffect } from 'react'

interface Post {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  type: string
  featured: boolean
  publishedAt: string
  author: {
    id: string
    name: string
  }
  category: {
    id: string
    name: string
    slug: string
    color: string
  }
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  media: Array<{
    id: string
    url: string
    alt: string
    caption: string
  }>
  readingTime: number
}

interface PostsResponse {
  posts: Post[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  }
}

interface UsePostsOptions {
  page?: number
  limit?: number
  type?: string
  category?: string
  featured?: boolean
  lang?: 'fr' | 'en'
}

export function usePosts(options: UsePostsOptions = {}) {
  const [data, setData] = useState<PostsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        
        if (options.page) params.append('page', options.page.toString())
        if (options.limit) params.append('limit', options.limit.toString())
        if (options.type) params.append('type', options.type)
        if (options.category) params.append('category', options.category)
        if (options.featured) params.append('featured', 'true')
        if (options.lang) params.append('lang', options.lang)

        const response = await fetch(`/api/public/posts?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles')
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [options.page, options.limit, options.type, options.category, options.featured, options.lang])

  return { data, loading, error, refetch: () => setLoading(true) }
}

interface UsePostOptions {
  slug: string
  lang?: 'fr' | 'en'
}

interface PostResponse {
  post: Post
  relatedPosts: Post[]
}

export function usePost({ slug, lang = 'fr' }: UsePostOptions) {
  const [data, setData] = useState<PostResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (lang) params.append('lang', lang)

        const response = await fetch(`/api/public/posts/${slug}?${params.toString()}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article non trouvé')
          }
          throw new Error('Erreur lors de la récupération de l\'article')
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, lang])

  return { data, loading, error }
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  postCount: number
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/public/categories')
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories')
        }

        const result = await response.json()
        setCategories(result.categories)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export function useSettings(category?: string) {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = category ? `?category=${category}` : ''
        const response = await fetch(`/api/public/settings${params}`)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des paramètres')
        }

        const result = await response.json()
        setSettings(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [category])

  return { settings, loading, error }
}