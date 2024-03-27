import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

import { Formik, Field, Form, FieldArray, useFormikContext } from 'formik'

import {
  Card,
  Button,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Tooltip,
  Box,
  Grid,
  GridItem,
  Icon,
  useToast,
} from '@chakra-ui/react'

import { useMutationPostFormulario } from '@/api/dashboard/formulario/mutations'
import SecaoItem from '@/components/SecaoItem'

import { FormValues } from './types'

const initialValues = {
  noForm: '',
  dsForm: '',
  dtLimit: '',
  ncoStep: [
    {
      noFormStep: '',
      dsFormStep: '',
      ncoFormQuestion: [
        {
          noQuestion: '',
          dsQuestion: '',
          coTypeQuestion: '',
          isRequired: true,
          ncoFormItem: [],
        },
      ],
    },
  ],
}

const AdicionarIdentificacaoPadraoButton = () => {
  const formik = useFormikContext<FormValues>()
  const [temIdentificacaoPadrao, setTemIdentificacaoPadrao] = useState(false)

  const adicionarIdentificacaoPadrao = () => {
    if (temIdentificacaoPadrao) return
    const novaSecao = {
      noFormStep: 'Identificação',
      dsFormStep: 'Informações pencoFormQuestionssoais',
      ncoFormQuestion: [
        {
          noQuestion: 'Nome',
          dsQuestion: 'Insira seu nome completo',
          isRequired: true,
          coTypeQuestion: 'text',
        },
        {
          noQuestion: 'Email institucional',
          dsQuestion: 'Insira seu email institucional',
          isRequired: true,
          coTypeQuestion: 'email',
        },
        {
          noQuestion: 'Número de matrícula',
          dsQuestion: 'Insira seu número de matrícula',
          isRequired: true,
          coTypeQuestion: 'number',
        },
        {
          noQuestion: 'Curso',
          dsQuestion: 'Selecione o seu curso',
          isRequired: true,
          coTypeQuestion: 'radio',
          ncoFormItem: [
            { dsItem: 'Ciência da computação' },
            { dsItem: 'Engenharia de computação' },
          ],
        },
      ],
    }
    formik.setFieldValue('ncoStep', [novaSecao, ...formik.values.ncoStep])
    formik.setFieldTouched('ncoStep', true, false)
    setTemIdentificacaoPadrao(true)
  }

  return (
    <HStack>
      <Tooltip label="Adiciona ao formulário os campos: nome, email institucional, número de matrícula e curso">
        <Button
          variant={temIdentificacaoPadrao ? 'disabled' : 'solid'}
          cursor={temIdentificacaoPadrao ? 'not-allowed' : 'pointer'}
          colorScheme="blue"
          size={'lg'}
          onClick={adicionarIdentificacaoPadrao}
        >
          + Identificação padrão
        </Button>
      </Tooltip>
    </HStack>
  )
}

const CreateFormulario = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const { mutate: postFormulario, isLoading: isPostFormularioLoading } =
    useMutationPostFormulario({
      onSuccess: () => {
        toast({
          title: 'Formulário criado com sucesso!',
          status: 'success',
          duration: 5000,
        })
        navigate('/dashboard/secretaria/formularios')
      },
      onError: () => {
        toast({
          title: 'Houve um erro ao criar o formulário.',
          status: 'error',
          duration: 3000,
        })
      },
    })

  const onSubmit = (values: FormValues) => {
    const payload = {
      noForm: values.noForm,
      dsForm: values.dsForm,
      dtLimit: values.dtLimit,
      ncoStep: values.ncoStep,
    }

    postFormulario(payload)
  }

  return (
    <Stack gap={5}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <>
            <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
              Criar novo formulário
            </Text>

            <Form>
              <Card p="4">
                <Grid templateColumns="repeat(2, 1fr)" gap={4} mt="4">
                  <GridItem colSpan={1}>
                    <FormLabel htmlFor={'nome'}>Nome do Formulário</FormLabel>
                    <Field
                      as={Input}
                      variant="filled"
                      id="noForm"
                      name="noForm"
                      placeholder="Nome do formulário"
                    />
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormLabel htmlFor={'dtLimit'}>
                      Data de fechamento do Formulário
                    </FormLabel>
                    <Field
                      as={Input}
                      variant="filled"
                      id="dtLimit"
                      name="dtLimit"
                      type="date"
                    />
                  </GridItem>
                </Grid>

                <Grid templateColumns="repeat(13, 1fr)" gap={4} mt="4">
                  <GridItem colSpan={10}>
                    <FormLabel htmlFor={'dsForm'}>
                      Descrição do Formulário
                    </FormLabel>
                    <Field
                      as={Input}
                      variant="filled"
                      id="dsForm"
                      name="dsForm"
                      placeholder="Descrição"
                    />
                  </GridItem>
                  <GridItem colSpan={3} mt="5">
                    <AdicionarIdentificacaoPadraoButton />
                  </GridItem>
                </Grid>
              </Card>

              <FieldArray name="ncoStep">
                {({ remove, push }) => (
                  <Box>
                    {values.ncoStep.length > 0 &&
                      values.ncoStep.map((secao, indexSecao) => (
                        <SecaoItem
                          key={`secao-${indexSecao}`}
                          secao={secao}
                          indexSecao={indexSecao}
                          remove={remove}
                        />
                      ))}
                    <Box
                      background={'#FFFFFF'}
                      p={4}
                      pt={0}
                      mt={4}
                      borderRadius="md"
                    >
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        size="lg"
                        width="full"
                        mt={4}
                        onClick={() =>
                          push({
                            noFormStep: '',
                            dsFormStep: '',
                            ncoFormQuestion: [],
                          })
                        }
                      >
                        <Icon mr="2" as={FiPlusCircle} />
                        Adicionar Seção
                      </Button>
                    </Box>
                  </Box>
                )}
              </FieldArray>

              <HStack justify="space-between" mt="4">
                <Button
                  as={Link}
                  to="/dashboard/secretaria/formularios"
                  variant="outline"
                  colorScheme="blue"
                >
                  Voltar
                </Button>
                <HStack>
                  <Button colorScheme="green" type="submit">
                    Disponibilizar
                  </Button>
                </HStack>
              </HStack>
            </Form>
          </>
        )}
      </Formik>
    </Stack>
  )
}

export default CreateFormulario
