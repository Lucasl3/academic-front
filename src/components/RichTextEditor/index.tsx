import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = () => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]
  const handleEditorContentChange = (content: string) => {
    console.log('content: ', content)
    localStorage.setItem('content', content)
  }
  return (
    <div className="text-editor">
      <ReactQuill
        modules={modules}
        formats={formats}
        onChange={(e) => handleEditorContentChange(e)}
        placeholder="Escreva o conteúdo do tutorial aqui..."
        style={{
          backgroundColor: 'white',
        }}
      >
        <div
          className="my-editing-area"
          style={{
            minHeight: '200px',
          }}
        />
      </ReactQuill>
    </div>
  )
}

export default RichTextEditor
