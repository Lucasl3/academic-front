import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Formik, Field, Form, FieldArray, useFormikContext } from 'formik'

import {
  Card,
  Button,
  FormLabel,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  Tooltip,
  Box,
  Grid,
  GridItem,
  Switch,
  Icon,
} from '@chakra-ui/react'

import SecaoItem from '@/components/SecaoItem'

import { FormValues } from './types'

const initialValues = {
  nome: '',
  descricao: '',
  dataInicio: '',
  dataFim: '',
  bloqueado: false,
  secoes: [
    {
      titulo: '',
      descricao: '',
      questoes: [
        {
          titulo: '',
          descricao: '',
          tipo: '',
          obrigatorio: true,
          itens: [],
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
      titulo: 'Identificação',
      descricao: 'Informações pessoais',
      questoes: [
        {
          titulo: 'Nome',
          descricao: 'Insira seu nome completo',
          obrigatorio: true,
          tipo: 'text',
        },
        {
          titulo: 'Email institucional',
          descricao: 'Insira seu email institucional',
          obrigatorio: true,
          tipo: 'email',
        },
        {
          titulo: 'Número de matrícula',
          descricao: 'Insira seu número de matrícula',
          obrigatorio: true,
          tipo: 'number',
        },
        {
          titulo: 'Curso',
          descricao: 'Selecione o seu curso',
          obrigatorio: true,
          tipo: 'radio',
          itens: [
            {
              label: 'Ciência da computação',
              value: 'ciencia-da-computacao',
            },
            {
              label: 'Engenharia de computação',
              value: 'engenharia-de-computacao',
            },
          ],
        },
      ],
    }
    formik.setFieldValue('secoes', [novaSecao, ...formik.values.secoes])
    formik.setFieldTouched('secoes', true, false)
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
  return (
    <Stack gap={5}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values): Promise<void> => {
          console.log(values)
        }}
      >
        {({ values }) => (
          <>
            <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
              Criar novo formulário
            </Text>

            <Form>
              <Card p="4">
                <Grid templateColumns="repeat(10, 1fr)" gap={4} mt="4">
                  <GridItem colSpan={9}>
                    <FormLabel htmlFor={'nome'}>Nome do Formulário</FormLabel>
                    <Field
                      as={Input}
                      variant="filled"
                      id="nome"
                      name="nome"
                      placeholder="Nome do formulário"
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel htmlFor={'bloqueado'}>Bloqueado</FormLabel>
                      <Field
                        as={Switch}
                        id="bloqueado"
                        name="bloqueado"
                        size="lg"
                        isChecked={values.bloqueado}
                      ></Field>
                    </FormControl>
                  </GridItem>
                </Grid>

                <FormLabel htmlFor={'descricao'} mt="4">
                  Descrição do Formulário
                </FormLabel>
                <Field
                  as={Input}
                  variant="filled"
                  id="descricao"
                  name="descricao"
                  placeholder="Descrição"
                />

                <Grid templateColumns="repeat(13, 1fr)" gap={4} mt="4">
                  <GridItem colSpan={5}>
                    <FormLabel htmlFor={'dataInicio'}>
                      Data de abertura do Formulário
                    </FormLabel>
                    <Field
                      as={Input}
                      variant="filled"
                      id="dataInicio"
                      name="dataInicio"
                      type="date"
                    />
                  </GridItem>
                  <GridItem colSpan={5}>
                    <FormLabel htmlFor={'dataFim'}>
                      Data de fechamento do Formulário
                    </FormLabel>
                    <Field
                      as={Input}
                      variant="filled"
                      id="dataFim"
                      name="dataFim"
                      type="date"
                    />
                  </GridItem>
                  <GridItem colSpan={3} mt="5">
                    <AdicionarIdentificacaoPadraoButton />
                  </GridItem>
                </Grid>
              </Card>

              <FieldArray name="secoes">
                {({ remove, push }) => (
                  <Box>
                    {values.secoes.length > 0 &&
                      values.secoes.map((secao, indexSecao) => (
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
                            titulo: '',
                            descricao: '',
                            questoes: [],
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
                  <Button colorScheme="red">Descartar</Button>
                  <Button colorScheme="blue">Salvar rascunho</Button>
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
