import React, { useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Select } from 'chakra-react-select'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikProps,
} from 'formik'
import * as yup from 'yup'

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'

import { useQueryTutorial } from '@/api/dashboard/tutorial/queries'
import RichTexEditor from '@/components/RichTextEditor'
import { formatDate } from '@/utils/date'

const ViewTutorial = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: tutorial, isFetching: isTutorialLoading } = useQueryTutorial(
    {
      id: Number(id),
    },
    {
      enabled: !!id,
      onError: () => {
        toast({
          title: 'Houve um erro ao buscar o tutorial.',
          status: 'error',
          duration: 3000,
        })
      },
    },
  )

  const tutorialData = useMemo(() => {
    return {
      id: tutorial?.coTutorial,
      title: tutorial?.noTutorial,
      description: tutorial?.dsTutorial,
      content: tutorial?.contentTutorial,
      last_update: tutorial?.dtUpdatedAt,
    }
  }, [tutorial])

  return (
    <Stack gap={5}>
      <Skeleton isLoaded={!isTutorialLoading}>
        {tutorial ? (
          <Stack>
            <FormControl id="titulo">
              <HStack justify="space-between">
                <FormLabel
                  fontSize={{ base: '3xl', md: '4xl' }}
                  color="#444A63"
                >
                  Título
                </FormLabel>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.500">
                  Última atualização em{' '}
                  {formatDate(
                    String(tutorialData.last_update),
                    'DD/MM/YYYY [ás] HH:mm',
                  )}
                </Text>
              </HStack>
              <Text fontSize="xl" fontWeight="medium" color="#444A63">
                {tutorialData.title}
              </Text>
            </FormControl>
            <Divider borderColor="gray.400" my={3} />
            <FormControl id="descrição">
              <FormLabel fontSize={{ base: '2xl', md: '3xl' }} color="#444A63">
                Descrição
              </FormLabel>
              <Text fontSize="lg" fontWeight="medium" color="#444A63">
                {tutorialData.description}
              </Text>
            </FormControl>
            <Divider borderColor="gray.400" my={3} />
            <FormControl id="conteudo">
              <FormLabel fontSize={{ base: '3xl', md: '3xl' }} color="#444A63">
                Conteúdo
              </FormLabel>
              <RichTexEditor content={tutorialData.content} readOnly />
            </FormControl>
            <Divider borderColor="gray.400" my={3} />
          </Stack>
        ) : (
          <Box>Tutorial não encontrado</Box>
        )}
      </Skeleton>
      <HStack justify="flex-end">
        <Button
          size="lg"
          colorScheme="blue"
          onClick={() => navigate('/dashboard/home')}
        >
          Voltar
        </Button>
      </HStack>
    </Stack>
  )
}

export default ViewTutorial
