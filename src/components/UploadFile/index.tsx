import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { FaUpload } from 'react-icons/fa'

import {
  Flex,
  Icon,
  Input,
  Text,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
} from '@chakra-ui/react'

interface IUploadFileProps {
  id: string
  file: File | null
  isDisabled?: boolean
  onFileChange?: (file: File | null) => void
}

const UploadFile: React.FC<IUploadFileProps> = ({
  id,
  file,
  isDisabled,
  onFileChange,
}) => {
  const [hovered, setHovered] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(file)

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
  }

  useEffect(() => {
    onFileChange?.(selectedFile)
  }, [selectedFile])

  useEffect(() => {
    setSelectedFile(file || null)
  }, [file])

  return (
    <Flex
      alignItems="center"
      flexDirection="row"
      gap="8px"
      borderBottom="1px solid #ccc"
      paddingBottom="8px"
      fontSize="14px"
    >
      <FormControl isDisabled={isDisabled}>
        <Input
          id={id}
          type="file"
          name="file"
          hidden
          onChange={handleFileChange}
          multiple
        />
        <FormLabel htmlFor={id}>
          <HStack
            border="1.5px dashed"
            borderColor="gray.300"
            px={3}
            py={4}
            cursor="pointer"
            borderRadius="4px"
            bgColor={hovered ? 'gray.200' : '#fff'}
            onMouseEnter={() => setHovered(!isDisabled)}
            onMouseLeave={() => setHovered(false)}
          >
            <Icon as={FaUpload} color="blue.500" mr="2" />
            {selectedFile ? (
              <Text color="gray.600">{selectedFile.name}</Text>
            ) : (
              <Text>Selecione o arquivo</Text>
            )}
          </HStack>
        </FormLabel>
      </FormControl>
    </Flex>
  )
}

export default UploadFile
