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

import { useMutationPutTutorial } from '@/api/dashboard/tutorial/mutations'
import { useQueryTutorial } from '@/api/dashboard/tutorial/queries'
import RichTexEditor from '@/components/RichTextEditor'
import TutorialStatusTag from '@/components/Tags/TutorialStatus'

import { TFormValues } from './types'
interface IOption {
  value: string
  label: JSX.Element
}

const EditTutorial = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
    null,
  )

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

  const { mutate: putTutorial, isLoading: isPutTutorialLoading } =
    useMutationPutTutorial({
      onSuccess: () => {
        toast({
          title: 'Tutorial atualizado com sucesso!',
          status: 'success',
          duration: 5000,
        })
        navigate('/dashboard/secretaria/tutoriais')
      },
      onError: () => {
        toast({
          title: 'Houve um erro ao atualizar o tutorial.',
          status: 'error',
          duration: 3000,
        })
      },
    })

  const tutorialData = useMemo(() => {
    return {
      id: tutorial?.coTutorial,
      title: tutorial?.noTutorial,
      description: tutorial?.dsTutorial,
      content: tutorial?.contentTutorial,
      status: 'available',
    }
  }, [tutorial])

  const options: Array<IOption> = [
    {
      value: 'hidden',
      label: <TutorialStatusTag tag="hidden" />,
    },
    {
      value: 'available',
      label: <TutorialStatusTag tag="available" />,
    },
    {
      value: 'incomplete',
      label: <TutorialStatusTag tag="incomplete" />,
    },
  ]

  const validateSchema = yup.object().shape({
    title: yup.string().required('O título é obrigatório'),
    description: yup.string().required('A descrição é obrigatória'),
    content: yup.string().required('O conteúdo é obrigatório'),
  })

  const formikRef = useRef<FormikProps<TFormValues>>(null)

  const onSubmit = (values: TFormValues) => {
    const payload = {
      coTutorial: Number(id),
      noTutorial: values.title,
      dsTutorial: values.description,
      contentTutorial: values.content,
    }

    putTutorial(payload)
  }

  const handleOnSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit()
    }
  }

  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Editar tutorial
      </Text>
      <Skeleton isLoaded={!isTutorialLoading}>
        {tutorial ? (
          <Formik
            innerRef={formikRef}
            initialValues={{
              title: tutorialData?.title || '',
              description: tutorialData?.description || '',
              content: tutorialData?.content || '',
            }}
            validationSchema={validateSchema}
            onSubmit={onSubmit}
          >
            <Stack>
              <HStack>
                <FormControl id="titulo" flex={3}>
                  <FormLabel color="#444A63">Título</FormLabel>
                  <Field
                    as={Input}
                    name="title"
                    placeholder="Escreva o título do tutorial"
                    variant="filled"
                  />
                  <ErrorMessage name="title">
                    {(message: string) => (
                      <Text color="red.600" fontSize="sm">
                        {message}
                      </Text>
                    )}
                  </ErrorMessage>
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel color="#444A63">Status</FormLabel>
                  <Select
                    value={selectedOption}
                    options={options}
                    useBasicStyles
                    variant="filled"
                    selectedOptionStyle="check"
                    onChange={(e) => setSelectedOption(e)}
                  />
                </FormControl>
              </HStack>
              <FormControl id="descrição">
                <FormLabel color="#444A63">Descrição</FormLabel>
                <Field
                  as={Textarea}
                  name="description"
                  placeholder="Escreva a descrição do tutorial"
                  variant="filled"
                  maxH="100px"
                />
                <ErrorMessage name="description">
                  {(message: string) => (
                    <Text color="red.600" fontSize="sm">
                      {message}
                    </Text>
                  )}
                </ErrorMessage>
              </FormControl>
              <FormControl id="conteudo">
                <FormLabel color="#444A63">Conteúdo</FormLabel>
                <Field name="content">
                  {({ field, form }: FieldProps) => (
                    <RichTexEditor
                      content={field.value}
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
        ) : (
          <Box>Tutorial não encontrado</Box>
        )}
      </Skeleton>
      <HStack justify="space-between">
        <Button
          isDisabled={isPutTutorialLoading}
          onClick={() => navigate('/dashboard/secretaria/tutoriais')}
        >
          Voltar
        </Button>
        <Button
          bg="#495796"
          colorScheme="blue"
          isLoading={isPutTutorialLoading}
          onClick={handleOnSubmit}
        >
          Salvar mudanças
        </Button>
      </HStack>
    </Stack>
  )
}

export default EditTutorial
