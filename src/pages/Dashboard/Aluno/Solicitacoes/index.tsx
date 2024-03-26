import React, { useContext, useEffect, useState } from 'react'

import { Box, Button, Stack, HStack, Text } from '@chakra-ui/react'

import { getForm } from '@/api/dashboard/forms/services'
import {
  getSolicitationByUser,
  getSolicitations,
} from '@/api/dashboard/solicitation/services'
import { getUser } from '@/api/dashboard/user/services'
import RequestCard from '@/components/DataDisplay/RequestCard'
import { status } from '@/components/Tags/RequestStatus/types'
import { AppContext } from '@/contexts/AppContext'
import { formatDateWithDayOfWeek } from '@/utils/date'

type Solicitation = {
  id: number
  title: string
  date: string
  status: status
}

const Solicitacoes = () => {
  const { user: loggedUser } = useContext(AppContext)
  const statusName = ['created', 'received', 'in_progress', 'done']
  const [solicitations, setSolicitations] = useState([] as Solicitation[])

  useEffect(() => {
    getSolicitationByUser({ id: loggedUser.co_user }).then((solicitations) => {
      const solicitaions = solicitations.map((solicitation: any) => {
        return getForm({ id: solicitation.coForm }).then((form) => {
          return {
            id: solicitation.coSolicitation,
            title: form.noForm,
            date: solicitation.dtCreatedAt || '',
            status: statusName[solicitation.coStatus],
          }
        })
      })

      Promise.all(solicitaions)
        .then((data) => {
          setSolicitations(data)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }, [])
  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Solicitações
        </Text>
      </HStack>
      <Stack gap={3}>
        {solicitations.length === 0 && (
          <Box>
            <Text fontSize="md" color="#444A63">
              Nenhuma solicitação encontrada
            </Text>
          </Box>
        )}
        {solicitations.map((data, index) => {
          return (
            <RequestCard
              key={index}
              to={`detalhes/${data.id}`}
              title={data.title}
              date={formatDateWithDayOfWeek(data.date)}
              status={data.status as status}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Solicitacoes
