import { Role } from '@prisma/client'

export const PERMISSIONS = {
  SUPER_ADMIN: [
    'create_posts',
    'edit_posts', 
    'delete_posts',
    'publish_posts',
    'manage_users',
    'manage_settings',
    'manage_media',
    'create_pages',
    'edit_pages',
    'delete_pages',
    'manage_categories',
    'manage_tags',
    'view_analytics',
    'manage_system',
  ],
  ADMIN: [
    'create_posts',
    'edit_posts',
    'delete_posts', 
    'publish_posts',
    'manage_media',
    'create_pages',
    'edit_pages',
    'delete_pages',
    'manage_categories',
    'manage_tags',
    'view_analytics',
  ],
  EDITOR: [
    'create_posts',
    'edit_posts',
    'publish_posts',
    'manage_media',
    'edit_pages',
    'manage_categories',
    'manage_tags',
  ],
  AUTHOR: [
    'create_posts', 
    'edit_own_posts',
    'manage_own_media',
  ],
} as const

export function hasPermission(userRole: Role, permission: string): boolean {
  return PERMISSIONS[userRole]?.includes(permission as any) || false
}

export function canManageUser(currentUserRole: Role, targetUserRole: Role): boolean {
  const roleHierarchy = {
    SUPER_ADMIN: 4,
    ADMIN: 3,
    EDITOR: 2,
    AUTHOR: 1,
  }
  
  return roleHierarchy[currentUserRole] > roleHierarchy[targetUserRole]
}

export function canEditPost(userRole: Role, userId: string, postAuthorId: string): boolean {
  if (hasPermission(userRole, 'edit_posts')) {
    return true
  }
  
  if (hasPermission(userRole, 'edit_own_posts')) {
    return userId === postAuthorId
  }
  
  return false
}

export function canDeletePost(userRole: Role, userId: string, postAuthorId: string): boolean {
  if (hasPermission(userRole, 'delete_posts')) {
    return true
  }
  
  return false // Authors cannot delete their own posts
}