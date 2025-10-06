'use client'

import { Textarea } from '@/components/ui/textarea'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  return (
    <Textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Entrez votre contenu ici...'}
      className="min-h-[400px] font-mono text-sm"
    />
  )
}