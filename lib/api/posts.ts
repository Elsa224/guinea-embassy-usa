export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  type: string
  featured: boolean
  publishedAt: string
  views: number
  author: {
    id: string
    name: string
  }
  category: {
    id: string
    name: string
    slug: string
    color: string | null
    icon: string | null
  } | null
  tags: Array<{ id: string; name: string; slug: string }>
  media: Array<{
    id: string
    url: string
    thumbnailUrl: string | null
    alt: string | null
    caption: string | null
    mimeType: string
  }>
}

export interface PostsResponse {
  posts: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function fetchPosts(params?: {
  page?: number
  limit?: number
  type?: string
  category?: string
  featured?: boolean
  lang?: string
}): Promise<PostsResponse> {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.type) searchParams.append('type', params.type)
  if (params?.category) searchParams.append('category', params.category)
  if (params?.featured !== undefined) searchParams.append('featured', params.featured.toString())
  searchParams.append('lang', params?.lang || 'fr')

  const response = await fetch(`/api/posts?${searchParams}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  return response.json()
}

export async function fetchPostBySlug(slug: string, lang: string = 'fr') {
  const response = await fetch(`/api/posts/${slug}?lang=${lang}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }

  return response.json()
}