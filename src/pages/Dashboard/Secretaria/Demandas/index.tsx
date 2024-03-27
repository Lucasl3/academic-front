import React, { useEffect } from 'react'

import { Stack, Text, SimpleGrid } from '@chakra-ui/react'

import { getForm } from '@/api/dashboard/forms/services'
import { getSolicitations } from '@/api/dashboard/solicitation/services'
import { getUser } from '@/api/dashboard/user/services'
import DemandCard from '@/components/DataDisplay/DemandCard'
import { status } from '@/components/Tags/RequestStatus/types'
import { formatDateWithDayOfWeek, formatDate } from '@/utils/date'

const Demandas = () => {
  const statusName = ['created', 'received', 'in_progress', 'done']
  const [demandas, setDemandas] = React.useState<any>([])

  useEffect(() => {
    getSolicitations().then((response) => {
      const dataPromises = response.map((item: any) => {
        return getForm({ id: item.coForm }).then((response) => {
          return getUser({ id: item.coUser }).then((user) => {
            return {
              id: item.coSolicitation,
              titulo: response.noForm,
              descricao: response.dsForm,
              usuario: user.noUser,
              data: item.dtCreatedAt,
              status: statusName[item.coStatus],
            }
          })
        })
      })

      Promise.all(dataPromises)
        .then((data) => {
          setDemandas(data)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }, [])

  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Gerenciamento de Demandas
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
        {demandas.map((item: any, index: number) => (
          <DemandCard
            key={index}
            to={`/dashboard/secretaria/demandas/detalhes/${item.id}`}
            id={index}
            datetime={formatDate(item?.data || '', 'DD/MM/YYYY [às] HH:mm')}
            title={item?.titulo}
            status={item?.status as status}
            user={{
              name: item?.usuario,
              picture: '',
            }}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default Demandas
