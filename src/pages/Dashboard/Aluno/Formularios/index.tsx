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
import { formatDate, isPastDate } from '@/utils/date'

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
      const isClosed = isPastDate(form.dtLimit)
      return {
        id: form.coForm,
        title: form.noForm,
        description: form.dsForm,
        status: isClosed ? 'closed' : 'available',
        availableDate: formatDate(form.dtLimit),
        isClosed: isClosed,
        tooltipText: isClosed
          ? 'Este formulário está encerrado'
          : 'Clique para preencher o formulário',
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
            return (
              <FormularioCard
                key={form.id}
                to={`/dashboard/aluno/formularios/detalhes/${form.id}`}
                title={form.title}
                description={form.description}
                tooltipText={form.tooltipText}
                statusTag={form.status as status}
                date={form.availableDate}
                isClosed={form.isClosed}
              />
            )
          })}
      </Stack>
    </Stack>
  )
}

export default Formularios
