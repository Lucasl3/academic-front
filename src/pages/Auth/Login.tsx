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
  Checkbox,
  Button,
  Image,
} from '@chakra-ui/react'

const Login = () => {
  const navigate = useNavigate()

  return (
    <Stack minH="100vh" direction="row" gap={0}>
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
              Faça login em sua conta
            </Heading>
          </Stack>
          <Box rounded="lg" bg="#FBFBFB" boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel color="#444A63">Email Institucional</FormLabel>
                <Input type="email" borderColor="gray.400" />
              </FormControl>
              <FormControl id="password">
                <FormLabel color="#444A63">Senha</FormLabel>
                <Input type="password" borderColor="gray.400" />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox borderColor="gray.400">Lembrar de mim</Checkbox>
                  <Button color="#495796" variant="link">
                    Esqueceu a senha?
                  </Button>
                </Stack>
                <Button
                  bg="#495796"
                  colorScheme="blue"
                  color="#FBFBFB"
                  variant="solid"
                >
                  Entrar
                </Button>
                <Stack align="center">
                  <Text>
                    Ainda não tem uma conta?{' '}
                    <Button
                      color="#495796"
                      variant="link"
                      onClick={() => navigate('/auth/cadastrar')}
                    >
                      Cadastre-se
                    </Button>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Hide below="lg">
        <Flex flex={1}>
          <Image
            alt="Login Image"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          />
        </Flex>
      </Hide>
    </Stack>
  )
}

export default Login
