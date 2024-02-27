import React from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'

import RichTexEditor from '@/components/RichTextEditor'

const CreateTutorial = () => {
  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Criar novo tutorial
        </Text>
        <Button colorScheme="red">Descartar tutorial</Button>
      </HStack>
      <Stack>
        <FormControl id="titulo">
          <FormLabel color="#444A63">Título</FormLabel>
          <Input
            placeholder="Escreva o título do tutorial"
            variant="filled"
            sx={{
              backgroundColor: 'white',
              _hover: {
                backgroundColor: 'white',
              },
              _focus: {
                backgroundColor: 'white',
              },
            }}
            onChange={(e) => console.log('titulo: ', e.target.value)}
          />
        </FormControl>
        <FormControl id="descrição">
          <FormLabel color="#444A63">Descrição</FormLabel>
          <Textarea
            placeholder="Escreva a descrição do tutorial"
            variant="filled"
            sx={{
              maxH: '100px',
              backgroundColor: 'white',
              _hover: {
                backgroundColor: 'white',
              },
              _focus: {
                backgroundColor: 'white',
              },
            }}
            onChange={(e) => console.log('descricao: ', e.target.value)}
          />
        </FormControl>
        <FormControl id="conteudo">
          <FormLabel color="#444A63">Conteúdo</FormLabel>
          <RichTexEditor />
        </FormControl>
      </Stack>
      <HStack justify="space-between">
        <Button as={Link} to="/dashboard/secretaria/tutoriais" variant="ghost">
          Voltar
        </Button>
        <HStack>
          <Button
            variant="outline"
            colorScheme="blue"
            borderColor="#495796"
            color="#495796"
          >
            Salvar para depois
          </Button>
          <Button bg="#495796" colorScheme="blue">
            Criar
          </Button>
        </HStack>
      </HStack>
    </Stack>
  )
}

export default CreateTutorial
