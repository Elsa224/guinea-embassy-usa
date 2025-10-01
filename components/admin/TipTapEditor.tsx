'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link2,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Undo,
  Redo,
  Table as TableIcon,
  Type,
  Clock,
  Check,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCallback, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
  editable?: boolean
  showStatus?: boolean
  isSaving?: boolean
  lastSaved?: Date
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = 'Commencez à écrire...',
  className,
  editable = true,
  showStatus = false,
  isSaving = false,
  lastSaved,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-orange-600 underline hover:text-orange-700',
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[400px] max-w-none',
      },
    },
  })

  // Update content when it changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt('URL de l\'image')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className={cn('rounded-lg border bg-white', className)}>
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap gap-1 border-b bg-gray-50 p-2">
        {/* Text format select */}
        <Select
          value={
            editor.isActive('heading', { level: 1 })
              ? 'h1'
              : editor.isActive('heading', { level: 2 })
              ? 'h2'
              : editor.isActive('heading', { level: 3 })
              ? 'h3'
              : 'p'
          }
          onValueChange={(value) => {
            switch (value) {
              case 'p':
                editor.chain().focus().setParagraph().run()
                break
              case 'h1':
                editor.chain().focus().toggleHeading({ level: 1 }).run()
                break
              case 'h2':
                editor.chain().focus().toggleHeading({ level: 2 }).run()
                break
              case 'h3':
                editor.chain().focus().toggleHeading({ level: 3 }).run()
                break
            }
          }}
        >
          <SelectTrigger className="h-9 w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Paragraphe
              </div>
            </SelectItem>
            <SelectItem value="h1">
              <div className="flex items-center gap-2">
                <Heading1 className="h-4 w-4" />
                Titre 1
              </div>
            </SelectItem>
            <SelectItem value="h2">
              <div className="flex items-center gap-2">
                <Heading2 className="h-4 w-4" />
                Titre 2
              </div>
            </SelectItem>
            <SelectItem value="h3">
              <div className="flex items-center gap-2">
                <Heading3 className="h-4 w-4" />
                Titre 3
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="h-9 w-px bg-gray-300" />

        {/* Text formatting */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('bold') && 'bg-gray-200')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('italic') && 'bg-gray-200')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('underline') && 'bg-gray-200')}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('strike') && 'bg-gray-200')}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('highlight') && 'bg-gray-200')}
        >
          <Highlighter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('code') && 'bg-gray-200')}
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="h-9 w-px bg-gray-300" />

        {/* Text alignment */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={cn('h-9 w-9 p-0', editor.isActive({ textAlign: 'left' }) && 'bg-gray-200')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={cn('h-9 w-9 p-0', editor.isActive({ textAlign: 'center' }) && 'bg-gray-200')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={cn('h-9 w-9 p-0', editor.isActive({ textAlign: 'right' }) && 'bg-gray-200')}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={cn('h-9 w-9 p-0', editor.isActive({ textAlign: 'justify' }) && 'bg-gray-200')}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        <div className="h-9 w-px bg-gray-300" />

        {/* Lists */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('bulletList') && 'bg-gray-200')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('orderedList') && 'bg-gray-200')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn('h-9 w-9 p-0', editor.isActive('blockquote') && 'bg-gray-200')}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="h-9 w-px bg-gray-300" />

        {/* Links and media */}
        <Button
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={cn('h-9 w-9 p-0', editor.isActive('link') && 'bg-gray-200')}
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={addImage}
          className="h-9 w-9 p-0"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={addTable}
          className="h-9 w-9 p-0"
        >
          <TableIcon className="h-4 w-4" />
        </Button>

        <div className="h-9 w-px bg-gray-300" />

        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-9 w-9 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-9 w-9 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor content */}
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>

      {/* Status bar */}
      {showStatus && (
        <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-2 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>{editor.storage.characterCount?.words() || 0} mots</span>
            <span>{editor.storage.characterCount?.characters() || 0} caractères</span>
          </div>
          <div className="flex items-center gap-2">
            {isSaving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Sauvegarde...</span>
              </>
            ) : lastSaved ? (
              <>
                <Check className="h-3 w-3 text-green-600" />
                <span>
                  Sauvegardé à {lastSaved.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                <span>Non sauvegardé</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}