import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Flex,
  Hide,
  Text,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
} from '@chakra-ui/react'

const Register = () => {
  const navigate = useNavigate()

  return (
    <Stack minH="100vh" direction="row" gap={0}>
      <Hide below="lg">
        <Flex flex={1}>
          <Image
            alt="Login Image"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          />
        </Flex>
      </Hide>
      <Flex p={8} flex={1} align="center" justify="center" bg="#E1E6FC">
        <Stack spacing={4} w="full" maxW="md">
          <Stack align="center">
            <Text
              as="span"
              fontSize="5xl"
              fontFamily="monospace"
              fontWeight="bold"
              color="#444A63"
            >
              Academ
              <Text as="span" fontSize="6xl" color="#495796">
                IC
              </Text>
            </Text>
            <Heading fontSize="2xl" color="#444A63">
              Cadastre-se
            </Heading>
          </Stack>
          <Box rounded="lg" bg="#FBFBFB" boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <FormControl id="fullName" isRequired>
                <FormLabel>Nome completo</FormLabel>
                <Input type="text" borderColor="gray.400" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel color="#444A63">Email Institucional</FormLabel>
                <Input type="email" borderColor="gray.400" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color="#444A63">Senha</FormLabel>
                <Input type="password" borderColor="gray.400" />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  bg="#495796"
                  colorScheme="blue"
                  color="#FBFBFB"
                  variant="solid"
                >
                  Criar conta
                </Button>
                <Stack align="center">
                  <Text>
                    Já tem uma conta?{' '}
                    <Button
                      color="#495796"
                      variant="link"
                      onClick={() => navigate('/auth/login')}
                    >
                      Faça login
                    </Button>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default Register
