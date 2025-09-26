import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

// User schemas
export const createUserSchema = z.object({
  name: z.string().min(2, 'Nom requis (minimum 2 caractères)'),
  email: z.string().email('Email invalide'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR']),
  password: z.string().min(8, 'Mot de passe trop court (minimum 8 caractères)'),
})

export const updateUserSchema = createUserSchema.partial().extend({
  id: z.string(),
  isActive: z.boolean().optional(),
})

// Post schemas
export const createPostSchema = z.object({
  title: z.object({
    fr: z.string().min(1, 'Titre français requis').max(200, 'Titre trop long'),
    en: z.string().optional(),
  }),
  content: z.object({
    fr: z.string().min(1, 'Contenu français requis'),
    en: z.string().optional(),
  }),
  excerpt: z.object({
    fr: z.string().max(500, 'Extrait trop long').optional(),
    en: z.string().max(500, 'Extrait trop long').optional(),
  }).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  type: z.enum(['NEWS', 'EVENT', 'SERVICE', 'ANNOUNCEMENT', 'DOCUMENTATION']).default('NEWS'),
  featured: z.boolean().default(false),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  publishedAt: z.date().optional(),
})

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string(),
})

// Category schemas
export const createCategorySchema = z.object({
  name: z.object({
    fr: z.string().min(1, 'Nom français requis'),
    en: z.string().optional(),
  }),
  description: z.object({
    fr: z.string().optional(),
    en: z.string().optional(),
  }).optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().min(0).default(0),
  parentId: z.string().optional(),
})

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string(),
})

// Page schemas
export const createPageSchema = z.object({
  title: z.object({
    fr: z.string().min(1, 'Titre français requis'),
    en: z.string().optional(),
  }),
  content: z.object({
    fr: z.string().min(1, 'Contenu français requis'),
    en: z.string().optional(),
  }),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  template: z.string().default('default'),
  metaTitle: z.object({
    fr: z.string().optional(),
    en: z.string().optional(),
  }).optional(),
  metaDescription: z.object({
    fr: z.string().optional(),
    en: z.string().optional(),
  }).optional(),
  order: z.number().int().min(0).default(0),
  parentId: z.string().optional(),
})

export const updatePageSchema = createPageSchema.partial().extend({
  id: z.string(),
})

// Settings schema
export const updateSettingSchema = z.object({
  key: z.string(),
  value: z.any(),
  type: z.string().optional(),
})

// Media schema
export const createMediaSchema = z.object({
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  url: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
})

// Query schemas
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().nullish(),
  status: z.string().nullish(),
  type: z.string().nullish(),
  categoryId: z.string().nullish(),
  sortBy: z.string().nullish(),
  sortOrder: z.enum(['asc', 'desc']).nullish().default('desc'),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
export type CreatePostSchema = z.infer<typeof createPostSchema>
export type UpdatePostSchema = z.infer<typeof updatePostSchema>
export type CreateCategorySchema = z.infer<typeof createCategorySchema>
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>
export type CreatePageSchema = z.infer<typeof createPageSchema>
export type UpdatePageSchema = z.infer<typeof updatePageSchema>
export type UpdateSettingSchema = z.infer<typeof updateSettingSchema>
export type CreateMediaSchema = z.infer<typeof createMediaSchema>
export type PaginationSchema = z.infer<typeof paginationSchema>