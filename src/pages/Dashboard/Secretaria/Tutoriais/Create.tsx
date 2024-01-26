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
          <Input placeholder="Escreva o título do tutorial" variant="filled" />
        </FormControl>
        <FormControl id="descrição">
          <FormLabel color="#444A63">Descrição</FormLabel>
          <Textarea
            placeholder="Escreva o título do tutorial"
            variant="filled"
            maxH="100px"
          />
        </FormControl>
        <FormControl id="conteudo">
          <FormLabel color="#444A63">Conteúdo</FormLabel>
          <Textarea
            placeholder="Escreva o título do tutorial"
            variant="filled"
            maxH="250px"
          />
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
