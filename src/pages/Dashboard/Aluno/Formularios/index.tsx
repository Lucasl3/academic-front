import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  HStack,
  Skeleton,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'

import { useQueryForms } from '@/api/dashboard/forms/queries'
import FormularioCard from '@/components/DataDisplay/FormularioCard'
import { status } from '@/components/Tags/FormularioStatus/types'

const Formularios = () => {
  const toast = useToast()

  const { data: forms, isFetching: isFormsLoading } = useQueryForms({
    onError: () => {
      toast({
        title: 'Houve um erro ao buscar os Formulários.',
        status: 'error',
        duration: 5000,
      })
    },
  })

  const FormsData = useMemo(() => {
    return forms?.map((form: any) => {
      return {
        id: form.coForm,
        title: form.noForm,
        description: form.dsForm,
        status: 'available',
        availableDate: '15/01/2024',
        course: 'ENGENHARIA DE COMPUTAÇÃO',
        isClosed: false,
      }
    })
  }, [forms])

  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Formulários
        </Text>
      </HStack>
      {isFormsLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height="108px" />
        ))}
      <Stack gap={3}>
        {!isFormsLoading && FormsData?.length === 0 && (
          <Text
            fontSize="xl"
            fontWeight="medium"
            color="#444A63"
            textAlign="center"
          >
            Nenhum formulário encontrado
          </Text>
        )}
        {!isFormsLoading &&
          FormsData?.map((form: any) => {
            const isClosed = form.isClosed === 'closed'
            return (
              <FormularioCard
                key={form.id}
                to={
                  isClosed
                    ? undefined
                    : `/dashboard/aluno/formularios/detalhes/${form.id}`
                }
                title={form.title}
                description={form.description}
                tooltipText="Clique para preencher o formulário"
                statusTag={form.status as status}
                date={form.availableDate}
                course={form.course}
                isClosed={form.isClosed}
              />
            )
          })}
      </Stack>
    </Stack>
  )
}

export default Formularios
