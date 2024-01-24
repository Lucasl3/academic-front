import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import {
  Box,
  Flex,
  Hide,
  Text,
  Stack,
  Heading,
  Button,
  Image,
  useToast,
} from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google'

const Login = () => {
  const toast = useToast()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      localStorage.setItem('accessToken', access_token)
    },
    onError: () => {
      toast({
        title: 'Erro ao fazer login',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    },
  })

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
          </Stack>
          <Stack rounded="lg" bg="#FBFBFB" boxShadow="lg" p={8} spacing={4}>
            <Heading fontSize="2xl" color="#444A63">
              Faça login em sua conta
            </Heading>
            <Stack spacing={4}>
              <Button
                leftIcon={<FcGoogle size={20} />}
                onClick={() => handleGoogleLogin()}
              >
                Continuar com Google
              </Button>
            </Stack>
          </Stack>
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
