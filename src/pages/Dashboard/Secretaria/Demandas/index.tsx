import React, { useEffect } from 'react'

import { Stack, Text, SimpleGrid } from '@chakra-ui/react'

import { getForm } from '@/api/dashboard/forms/services'
import { getSolicitations } from '@/api/dashboard/solicitation/services'
import { getUser } from '@/api/dashboard/user/services'
import DemandCard from '@/components/DataDisplay/DemandCard'
import { formatDateWithDayOfWeek } from '@/utils/date'

const Demandas = () => {
  const [demandas, setDemandas] = React.useState([
    {
      titulo: '',
      descricao: '',
      usuario: '',
      data: null,
    },
  ])

  useEffect(() => {
    getSolicitations().then((response) => {
      const dataPromises = response.map((item: any) => {
        return getForm({ id: item.coForm }).then((response) => {
          return getUser({ id: item.coUser }).then((user) => {
            return {
              titulo: response.noForm,
              descricao: response.dsForm,
              usuario: user.noUser,
              data: item.dtCreatedAt,
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

    getUser({ id: 3 }).then((response) => {
      console.log(response)
    })
  }, [])
  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Gerenciamento de Demandas
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {demandas.map((item, index) => (
          <DemandCard
            key={index}
            to={`/dashboard/secretaria/demandas/detalhes/${index}`}
            id={index}
            datetime={formatDateWithDayOfWeek(item.data || '')}
            title={item.titulo}
            user={{
              name: item.usuario,
              picture:
                'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
            }}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default Demandas
