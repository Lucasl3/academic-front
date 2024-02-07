import React, { useState } from 'react'

import { Field, Form, Formik } from 'formik'

import { InfoIcon, WarningTwoIcon } from '@chakra-ui/icons'
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'

const CalculadoraNotas = () => {
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
    if (media < 5) {
      setNaoPodeFazerFinal(true)
      setPrecisaFinal(false)
    } else if (media >= 7) {
      setPrecisaFinal(false)
      setNaoPodeFazerFinal(false)
    } else if (media >= 5 && media < 7) {
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
    <Flex
      gap={3}
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
      }}
    >
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
                maxWidth: '440px',
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
              <Text
                sx={{
                  fontSize: '0.7rem',
                  backgroundColor: 'gray.100',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0.5rem',
                }}
              >
                Média abaixo de 5,0 não pode fazer prova final.
              </Text>
              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Calcular
              </Button>
              {media.status && <Text mt={4}>Sua média é: {media.valor}</Text>}
              {media.valor >= 7 && (
                <Text mt={4} fontWeight="bold" color="green">
                  Parabéns, você foi aprovado!
                </Text>
              )}
              {precisaFinal && (
                <Text
                  mt={2}
                  fontWeight="bold"
                  color="blue"
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <InfoIcon fontSize={20} />
                  Precisa fazer prova final, com a nota minima de{' '}
                  {notaFinal.valor}.
                </Text>
              )}
              {naoPodeFazerFinal && (
                <Text
                  color="red"
                  mt={2}
                  display="flex"
                  alignItems="center"
                  gap={3}
                  fontWeight="bold"
                >
                  <WarningTwoIcon fontSize={20} /> A sua média é inferior ao
                  limite que permite a realização da prova final.
                </Text>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}

export default CalculadoraNotas
