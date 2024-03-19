import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa'

import { Flex, Icon } from '@chakra-ui/react'

interface HandleFillProps {
  handleFill: (id: string, value: boolean) => void
  id: string
  step: number
}

const UploadFile: React.FC<HandleFillProps> = ({ id, handleFill, step }) => {
  const [hovered, setHovered] = useState(false)

  const truncateFileName = (fileName: string): string => {
    const file = fileName.split('.').shift()
    if (file && file.length <= 15) {
      return fileName
    } else {
      const extension = fileName.split('.').pop()
      const truncatedName = fileName.substring(0, 15)
      return `${truncatedName}...${extension}`
    }
  }

  const handleFileUpload = (e: any) => {
    const files: FileList = e.target.files
    const fileChosenElement = document.getElementById('file-chosen' + id)

    console.log(files)

    if (files.length === 1) {
      const file = files[0]
      const fileName = truncateFileName(file.name)
      fileChosenElement!.textContent = fileName
    } else if (files.length > 1) {
      Array.from(files).forEach((item: File) => {
        let fileListString = ''
        Array.from(files).forEach((file: File, index: number) => {
          const fileName = truncateFileName(file.name)
          fileListString += fileName
          if (index < files.length - 1) {
            fileListString += ', '
          }
        })
        fileChosenElement!.textContent = fileListString
      })
    }
    handleFill(id, true)
  }

  const clearFiles = () => {
    const fileInputElement = document.getElementById(
      'upload' + id,
    ) as HTMLInputElement
    const fileChosenElement = document.getElementById('file-chosen' + id)
    fileInputElement.value = '' // Reset input value
    fileChosenElement!.textContent = 'Nenhum arquivo selecionado' // Update text content
    handleFill(id, false) // Update handleFill to indicate no file selected
  }

  const handleMouseHover = (e: any) => {
    setHovered(true)
  }

  const handleMouseLeave = (e: any) => {
    setHovered(false)
  }

  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'row',
        gap: '8px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '8px',
        fontSize: '14px',
      }}
    >
      <input
        type="file"
        id={'upload' + id}
        hidden
        onChange={handleFileUpload}
        multiple
        disabled={step === 2}
      />
      {step !== 2 && (
        <label
          style={{
            border: '1.5px dashed #E1E6FC',
            padding: '10px 16px',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: hovered ? '#ccc' : '#fff',
          }}
          htmlFor={'upload' + id}
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          <Icon as={FaUpload} mr="2" />
          Selecione o arquivo
        </label>
      )}
      <span id={'file-chosen' + id} style={{ opacity: step === 2 ? 0.5 : 1 }}>
        Nenhum arquivo selecionado
      </span>
    </Flex>
  )
}

export default UploadFile
