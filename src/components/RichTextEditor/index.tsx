import React from 'react'
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaCode,
  FaHighlighter,
  FaList,
  FaListOl,
} from 'react-icons/fa'

import { Box, Button, HStack, IconButton } from '@chakra-ui/react'
import Highlight from '@tiptap/extension-highlight'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { IRichTextEditorProps } from './types'

const RichTextEditor = ({
  content,
  onChange,
  readOnly,
}: IRichTextEditorProps) => {
  const editor = useEditor({
    content: content || '',
    extensions: [StarterKit, Highlight],
    onUpdate: ({ editor }) => {
      onChange?.(editor?.getHTML())
    },
  })

  return (
    <Box bg="#FFFFFF" py="4" borderRadius="md">
      {!readOnly && (
        <HStack px="2" pb="2" gap={0.5}>
          <IconButton
            icon={<FaBold />}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            isActive={editor?.isActive('bold')}
            variant="ghost"
            value="bold"
            aria-label="bold"
          />
          <IconButton
            icon={<FaItalic />}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            isActive={editor?.isActive('italic')}
            variant="ghost"
            value="italic"
            aria-label="italic"
          />
          <IconButton
            icon={<FaStrikethrough />}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            isActive={editor?.isActive('strike')}
            variant="ghost"
            value="strike"
            aria-label="strike"
          />
          <IconButton
            icon={<FaCode />}
            onClick={() => editor?.chain().focus().toggleCode().run()}
            isActive={editor?.isActive('code')}
            variant="ghost"
            value="code"
            aria-label="code"
          />
          <IconButton
            icon={<FaHighlighter />}
            onClick={() => editor?.chain().focus().toggleHighlight().run()}
            isActive={editor?.isActive('highlight')}
            variant="ghost"
            value="highlight"
            aria-label="highlight"
          />
          <IconButton
            icon={<FaList />}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            isActive={editor?.isActive('bullettList')}
            variant="ghost"
            value="bullettList"
            aria-label="bullettList"
          />
          <IconButton
            icon={<FaListOl />}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            isActive={editor?.isActive('orderedList')}
            variant="ghost"
            value="orderedList"
            aria-label="orderedList"
          />
        </HStack>
      )}
      <Box px="6">
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}

export default RichTextEditor
