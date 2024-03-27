import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  HStack,
  Stack,
  Text,
  useToast,
  Skeleton,
} from '@chakra-ui/react'

import { useQueryForms } from '@/api/dashboard/formulario/queries'
import FormularioCard from '@/components/DataDisplay/FormularioCard'

const Formularios = () => {
  const toast = useToast()

  const { data: forms = [], isFetching: isLoadingForms } = useQueryForms({
    onError: () => {
      toast({
        title: 'Houve um erro ao buscar os formulários.',
        status: 'error',
        duration: 5000,
      })
    },
  })

  const formsData = useMemo(() => {
    return forms?.map((form) => {
      return {
        id: form.coFormulario,
        title: form.noFormulario,
        description: form.dsFormulario,
        dueDate: form.dtLimiteFormulario,
        status: 'available',
      }
    })
  }, [forms])

  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Gerenciamento de Formulários
        </Text>
        <Button as={Link} bg="#495796" colorScheme="blue" to="criar">
          Criar Formulário
        </Button>
      </HStack>
      {isLoadingForms &&
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height="108px" />
        ))}
      <Stack gap={3}>
        {!isLoadingForms && formsData?.length === 0 && (
          <Text
            fontSize="xl"
            fontWeight="medium"
            color="#444A63"
            textAlign="center"
          >
            Nenhum formulário encontrado
          </Text>
        )}
        {!isLoadingForms &&
          formsData?.map((formulario, index) => (
            <FormularioCard
              key={index}
              to={`/dashboard/secretaria/formularios/detalhes/${formulario.id}`}
              title={formulario.title}
              description={formulario.description}
              tooltipText="Clique para editar"
              date={formulario.dueDate}
            />
          ))}
      </Stack>
    </Stack>
  )
}

export default Formularios
