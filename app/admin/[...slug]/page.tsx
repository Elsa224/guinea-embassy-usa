'use client'

import { notFound } from 'next/navigation'

export default function AdminCatchAll() {
  // This will trigger the admin/not-found.tsx page
  notFound()
}