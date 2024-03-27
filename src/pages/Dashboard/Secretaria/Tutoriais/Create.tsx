import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { useMutationPostTutorial } from '@/api/dashboard/tutorial/mutations'
import RichTexEditor from '@/components/RichTextEditor'
import TutorialStatusTag from '@/components/Tags/TutorialStatus'

import { TFormValues, IOption } from './types'

const available = {
  value: 'available',
  label: <TutorialStatusTag tag="available" />,
}

const hidden = {
  value: 'hidden',
  label: <TutorialStatusTag tag="hidden" />,
}

const options: Array<IOption> = [available, hidden]

const CreateTutorial = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    status: yup.object().required('O status é obrigatório'),
  })

  const formikRef = useRef<FormikProps<TFormValues>>(null)

  const onSubmit = (values: TFormValues) => {
    const payload = {
      noTutorial: values.title,
      dsTutorial: values.description,
      contentTutorial: values.content,
      coStatus: values?.status?.value === 'available' ? true : false,
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
        <Button colorScheme="red" onClick={onOpen}>
          Descartar tutorial
        </Button>
      </HStack>
      <Formik
        innerRef={formikRef}
        initialValues={{
          title: '',
          description: '',
          content: '',
          status: null,
        }}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
      >
        <Stack>
          <HStack>
            <FormControl id="title" flex={3}>
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
            <FormControl id="status" flex={1}>
              <FormLabel color="#444A63">Status</FormLabel>
              <Field name="status">
                {({ field, form }: FieldProps) => (
                  <Select
                    value={field.value}
                    options={options}
                    useBasicStyles
                    variant="filled"
                    selectedOptionStyle="check"
                    onChange={(option) =>
                      form.setFieldValue(field.name, option)
                    }
                  />
                )}
              </Field>
              <ErrorMessage name="status">
                {(message: string) => (
                  <Text color="red.600" fontSize="sm">
                    {message}
                  </Text>
                )}
              </ErrorMessage>
            </FormControl>
          </HStack>
          <FormControl id="description">
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
          <FormControl id="content">
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
        <Button
          bg="#495796"
          colorScheme="blue"
          isLoading={isPostTutorialLoading}
          onClick={handleOnSubmit}
        >
          Criar
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tem certeza que deseja descartar tutorial?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Todas as informações preenchidas serão perdidas.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => navigate('/dashboard/secretaria/tutoriais')}
            >
              Descartar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default CreateTutorial
