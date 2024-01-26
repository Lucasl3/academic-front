import React from 'react'

import { Stack, Text, SimpleGrid } from '@chakra-ui/react'

import DemandCard from '@/components/DataDisplay/DemandCard'

const Demandas = () => {
  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Gerenciamento de Demandas
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {[0, 1, 2, 3].map((index) => (
          <DemandCard
            key={index}
            to={`/dashboard/secretaria/demandas/detalhes/${index}`}
            id={index}
            datetime="SEGUNDA, 15/01/2024 ÀS 11:06"
            title="Título da demanda"
            user={{
              name: 'João da Silva',
              picture: 'https://bit.ly/ryan-florence',
            }}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default Demandas
