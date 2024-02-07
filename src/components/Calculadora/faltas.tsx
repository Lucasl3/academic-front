import React, { useState } from 'react'

import { Field, Form, Formik } from 'formik'

import { TimeIcon } from '@chakra-ui/icons'
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useMediaQuery,
} from '@chakra-ui/react'

const CalculadoraFaltas = () => {
  const [resposta, setResposta] = useState<string>()
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const calcularFaltas = (
    disciplina: string,
    cargaHorariaTotal: number,
    cargaHorariaDiaria: number,
  ) => {
    if (
      disciplina.trim() === '' ||
      disciplina === null ||
      disciplina === '' ||
      disciplina === 'undefined' ||
      !disciplina ||
      isNaN(cargaHorariaTotal) ||
      isNaN(cargaHorariaDiaria) ||
      cargaHorariaDiaria === 0 ||
      cargaHorariaTotal === 0
    ) {
      alert('Preencha os campos corretamente')
      return
    } else {
      const faltasTotais = cargaHorariaTotal * 0.25
      const diasFaltados = Math.floor(faltasTotais / cargaHorariaDiaria)
      setResposta(
        `Na matéria ${disciplina} você poderá faltar até ${faltasTotais} vezes, ou seja, ${diasFaltados} dias letivos.`,
      )
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
          disciplina: undefined,
          cargaHorariaTotal: undefined,
          cargaHorariaDiaria: undefined,
        }}
        onSubmit={(values, actions) => {
          calcularFaltas(
            String(values.disciplina),
            Number(values.cargaHorariaTotal),
            Number(values.cargaHorariaDiaria),
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
              <Field name="disciplina" type="text">
                {({ field }: any) => (
                  <FormControl variant="floating">
                    <Input
                      borderColor="gray.400"
                      type="text"
                      placeholder=" "
                      {...field}
                    />
                    <FormLabel>Disciplina</FormLabel>
                  </FormControl>
                )}
              </Field>
              <Field name="cargaHorariaTotal" type="number">
                {({ field }: any) => (
                  <FormControl variant="floating">
                    <Input
                      borderColor="gray.400"
                      placeholder=" "
                      type="number"
                      {...field}
                    />
                    <FormLabel>C.H.T.</FormLabel>
                  </FormControl>
                )}
              </Field>
              <Field name="cargaHorariaDiaria" type="number">
                {({ field }: any) => (
                  <FormControl variant="floating">
                    <Input
                      borderColor="gray.400"
                      type="number"
                      placeholder=" "
                      {...field}
                    />
                    <FormLabel>C.H.D.</FormLabel>
                  </FormControl>
                )}
              </Field>
              <Text
                sx={{
                  fontSize: '0.7rem',
                  backgroundColor: 'gray.100',
                  padding: '0.5rem',
                }}
              >
                C.H.T.: Carga Horária Total da disciplina | C.H.D.: Carga
                Horária Diária da disciplina
              </Text>
              <Button
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Calcular
              </Button>
              {resposta && (
                <Text
                  color="green"
                  mt={2}
                  display="flex"
                  alignItems="center"
                  gap={3}
                  fontWeight="bold"
                  fontSize={{ base: '0.8rem', md: '1rem' }}
                >
                  <TimeIcon fontSize={20} />
                  {resposta}
                </Text>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}

export default CalculadoraFaltas
