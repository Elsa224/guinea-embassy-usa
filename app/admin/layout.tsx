import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Administration - Consulat de Côte d\'Ivoire',
  description: 'Tableau de bord administrateur du Consulat Général de Côte d\'Ivoire à New York',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}