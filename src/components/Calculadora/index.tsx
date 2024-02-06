import React, { useState } from 'react'

import { Field, Form, Formik } from 'formik'

import {
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'

const Calculadora = () => {
  const [media, setMedia] = useState({
    valor: 0,
    status: false,
  })
  const [notaFinal, setNotaFinal] = useState({
    valor: 0,
    status: false,
  })
  const [precisaFinal, setPrecisaFinal] = useState<boolean>()
  const [naoPodeFazerFinal, setNaoPodeFazerFinal] = useState<boolean>()

  const calculaNotaFinal = (nota1: number, nota2: number, notaR: number) => {
    let media = 0
    if (nota1 > 10 || nota2 > 10 || notaR > 10) {
      alert('As notas não podem ser maiores que 10')
      return
    }
    if (Number.isNaN(notaR)) notaR = 0
    if (Number.isNaN(nota1)) nota1 = 0
    if (Number.isNaN(nota2)) nota2 = 0
    if (notaR >= nota1) {
      media = (notaR + nota2) / 2
    } else if (notaR >= nota2) {
      media = (notaR + nota1) / 2
    } else if ((notaR < nota1 && notaR < nota2) || Number.isNaN(notaR)) {
      media = (nota1 + nota2) / 2
    }
    setMedia({
      valor: parseFloat(media.toFixed(2)),
      status: true,
    })
    if (media < 4) {
      setNaoPodeFazerFinal(true)
      setPrecisaFinal(false)
    } else if (media >= 7) {
      setPrecisaFinal(false)
      setNaoPodeFazerFinal(false)
    } else if (media >= 4 && media < 7) {
      setPrecisaFinal(true)
      setNaoPodeFazerFinal(false)
      const final = (10 * 5.5 - 4 * media) / 6
      setNotaFinal({
        valor: parseFloat(final.toFixed(2)),
        status: true,
      })
    }
  }

  return (
    <Stack w="80%" boxShadow="lg" rounded="lg" p={4} bg="#FBFBFB">
      <Text fontSize="lg" fontWeight="semibold" color="#444A63">
        Calculadora IC
      </Text>
      <Tabs isFitted>
        <TabList>
          <Tab
            _selected={{
              color: '#495796',
              borderBottomColor: '#495796',
            }}
          >
            Nota Final
          </Tab>
          <Tab
            _selected={{
              color: '#495796',
              borderBottomColor: '#495796',
            }}
          >
            Faltas
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex justify="center" gap={3}>
              <Flex direction="column" w={{ base: '100%', md: '50%' }}>
                <>
                  <Formik
                    initialValues={{
                      notaAB1: undefined,
                      notaAB2: undefined,
                      notaREAV: undefined,
                    }}
                    onSubmit={(values, actions) => {
                      calculaNotaFinal(
                        Number(values.notaAB1),
                        Number(values.notaAB2),
                        Number(values.notaREAV),
                      )
                      setTimeout(() => {
                        actions.setSubmitting(false)
                      }, 300)
                    }}
                  >
                    {(props) => (
                      <Form>
                        <Flex
                          sx={{
                            flexDirection: 'column',
                            gap: '1rem',
                          }}
                        >
                          <Field name="notaAB1" type="number">
                            {({ field }: any) => (
                              <FormControl variant="floating">
                                <Input
                                  borderColor="gray.400"
                                  type="number"
                                  placeholder=" "
                                  {...field}
                                />
                                <FormLabel>Nota AB1</FormLabel>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="notaAB2" type="number">
                            {({ field }: any) => (
                              <FormControl variant="floating">
                                <Input
                                  borderColor="gray.400"
                                  placeholder=" "
                                  type="number"
                                  {...field}
                                />
                                <FormLabel>Nota AB2</FormLabel>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="notaREAV" type="number">
                            {({ field }: any) => (
                              <FormControl variant="floating">
                                <Input
                                  borderColor="gray.400"
                                  type="number"
                                  placeholder=" "
                                  {...field}
                                />
                                <FormLabel>Nota REAV</FormLabel>
                              </FormControl>
                            )}
                          </Field>
                          <Button
                            colorScheme="blue"
                            isLoading={props.isSubmitting}
                            type="submit"
                          >
                            Calcular
                          </Button>
                        </Flex>
                      </Form>
                    )}
                  </Formik>
                  {media.status && (
                    <Text mt={4}>Sua média é: {media.valor}</Text>
                  )}
                  {precisaFinal && (
                    <Text mt={2}>
                      Precisa fazer prova final, com a nota minima de{' '}
                      {notaFinal.valor}
                    </Text>
                  )}
                  {naoPodeFazerFinal && (
                    <Text color="red" mt={2}>
                      A sua média é inferior ao limite que permite a realização
                      da prova final.
                    </Text>
                  )}
                </>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex justify="center" gap={3}>
              <Flex direction="column" w={{ base: '100%', md: '50%' }}>
                <FormControl id="ab1">
                  <FormLabel color="#444A63">Disciplina</FormLabel>
                  <Input
                    type="number"
                    borderColor="gray.400"
                    placeholder="Insira aqui a Disciplina"
                    min={0}
                    max={10}
                  />
                </FormControl>
                <FormControl id="ab2">
                  <FormLabel color="#444A63">C.H.T</FormLabel>
                  <Input
                    type="number"
                    borderColor="gray.400"
                    placeholder="Insira aqui a C.H.T"
                    min={0}
                    max={10}
                  />
                </FormControl>
                <FormControl id="ab1">
                  <FormLabel color="#444A63">C.H.D</FormLabel>
                  <Input
                    type="number"
                    borderColor="gray.400"
                    placeholder="Insira aqui a C.H.D"
                    min={0}
                    max={10}
                  />
                </FormControl>
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}

export default Calculadora
