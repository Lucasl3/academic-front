import React from 'react'
import { useParams, Link } from 'react-router-dom'

import {
  Stack,
  Text,
  HStack,
  Avatar,
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Divider,
  Button,
  Tag,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Portal,
} from '@chakra-ui/react'

const FormularioView = () => {
  const { id } = useParams()

  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Stack>
          <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
            Título da demanda
          </Text>
          <Text fontSize="sm" color="#718096">
            SEGUNDA, 15/01/2024 ÀS 11:06
          </Text>
        </Stack>
        <Stack>
          <HStack>
            <Avatar
              size="sm"
              name="João da Silva"
              src="https://bit.ly/ryan-florence"
            />
            <Text fontWeight="medium">João da Silva</Text>
          </HStack>
          <Flex justify="center">
            <Tag colorScheme="red" textAlign="center">
              Aberta
            </Tag>
          </Flex>
        </Stack>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <FormControl id="nome" isReadOnly>
          <FormLabel color="#444A63">Nome</FormLabel>
          <Input value="João da Silva" variant="filled" />
        </FormControl>
        <FormControl id="email" isReadOnly>
          <FormLabel color="#444A63">E-mail</FormLabel>
          <Input value="js@ic.ufal.bn" variant="filled" />
        </FormControl>
        <FormControl id="matricula" isReadOnly>
          <FormLabel color="#444A63">Matrícula</FormLabel>
          <Input value="11111111" variant="filled" />
        </FormControl>
      </SimpleGrid>
      <FormControl id="descricao" isReadOnly>
        <FormLabel color="#444A63">Descrição</FormLabel>
        <Textarea
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          variant="filled"
          maxH="250px"
        />
      </FormControl>
      <Divider borderColor="gray.400" borderBottomWidth="2px" />
      <FormControl id="resposta">
        <FormLabel color="#444A63">Resposta</FormLabel>
        <Textarea
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          variant="filled"
          maxH="250px"
        />
      </FormControl>
      <HStack justify="space-between">
        <Button as={Link} to="/dashboard/secretaria/demandas" variant="ghost">
          Voltar
        </Button>
        <Button bg="#495796" colorScheme="blue">
          Enviar resposta
        </Button>
      </HStack>
    </Stack>
  )
}

export default FormularioView
