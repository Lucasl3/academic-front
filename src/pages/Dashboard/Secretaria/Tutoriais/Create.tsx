import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'

import { useMutationPostTutorial } from '@/api/dashboard/mutations'
import RichTexEditor from '@/components/RichTextEditor'

import { TFormValues } from './types'

const CreateTutorial = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const { mutate: postTutorial, isLoading: isPostTutorialLoading } =
    useMutationPostTutorial({
      onSuccess: () => {
        toast({
          title: 'Tutorial criado com sucesso!',
          status: 'success',
          duration: 5000,
        })
        navigate('/dashboard/secretaria/tutoriais')
      },
      onError: () => {
        toast({
          title: 'Houve um erro ao criar o tutorial.',
          status: 'error',
          duration: 3000,
        })
      },
    })

  const validateSchema = yup.object().shape({
    title: yup.string().required('O título é obrigatório'),
    description: yup.string().required('A descrição é obrigatória'),
    content: yup
      .string()
      .required('O conteúdo é obrigatório')
      .min(8, 'O conteúdo é obrigatório'),
  })

  const formikRef = useRef<FormikProps<TFormValues>>(null)

  const onSubmit = (values: TFormValues) => {
    const payload = {
      no_tutorial: values.title,
      ds_tutorial: values.description,
      content_tutorial: values.content,
    }

    postTutorial(payload)
  }

  const handleOnSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit()
    }
  }

  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Criar novo tutorial
        </Text>
        <Button colorScheme="red">Descartar tutorial</Button>
      </HStack>
      <Formik
        innerRef={formikRef}
        initialValues={{
          title: '',
          description: '',
          content: '',
        }}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
      >
        <Stack>
          <FormControl>
            <FormLabel color="#444A63">Título</FormLabel>
            <Field
              as={Input}
              name="title"
              placeholder="Escreva o título do tutorial"
              variant="filled"
              bgColor="white"
              _hover={{
                bgColor: 'white',
              }}
              _focus={{
                bgColor: 'white',
              }}
            />
            <ErrorMessage name="title">
              {(message: string) => (
                <Text color="red.600" fontSize="sm">
                  {message}
                </Text>
              )}
            </ErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel color="#444A63">Descrição</FormLabel>
            <Field
              as={Textarea}
              name="description"
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
            />
            <ErrorMessage name="description">
              {(message: string) => (
                <Text color="red.600" fontSize="sm">
                  {message}
                </Text>
              )}
            </ErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel color="#444A63">Conteúdo</FormLabel>
            <Field name="content">
              {({ field, form }: FieldProps) => (
                <RichTexEditor
                  onChange={(content) => {
                    form.setFieldValue(field.name, content)
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="content">
              {(message: string) => (
                <Text color="red.600" fontSize="sm">
                  {message}
                </Text>
              )}
            </ErrorMessage>
          </FormControl>
        </Stack>
      </Formik>
      <HStack justify="space-between">
        <Button
          isDisabled={isPostTutorialLoading}
          onClick={() => navigate('/dashboard/secretaria/tutoriais')}
        >
          Voltar
        </Button>
        <HStack>
          <Button
            variant="outline"
            colorScheme="blue"
            borderColor="#495796"
            color="#495796"
            isDisabled={isPostTutorialLoading}
          >
            Salvar para depois
          </Button>
          <Button
            bg="#495796"
            colorScheme="blue"
            isLoading={isPostTutorialLoading}
            onClick={handleOnSubmit}
          >
            Criar
          </Button>
        </HStack>
      </HStack>
    </Stack>
  )
}

export default CreateTutorial
