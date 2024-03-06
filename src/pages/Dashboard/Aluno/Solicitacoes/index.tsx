import React from 'react'

import { Box, Button, Stack, HStack, Text } from '@chakra-ui/react'

import RequestCard from '@/components/DataDisplay/RequestCard'
import { status } from '@/components/Tags/RequestStatus/types'

const Solicitacoes = () => {
  const loremIpsum =
    'Lorem ipsum dolor sit amet. Nam molestias impedit qui consequuntur distinctio et cumque voluptas qui vero possimus. Ut galisum dolorum aut adipisci consequatur et modi voluptatibus aut nesciunt fugiat non eligendi exercitationem.'

  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Solicitações
        </Text>
      </HStack>
      <Stack gap={3}>
        {['done', 'in_progress', 'received', 'viewed'].map((data, index) => {
          return (
            <RequestCard
              key={index}
              to={`detalhes/${index}`}
              title={`Título da Solicitação ${index + 1}`}
              date="SEGUNDA, 15/01/2024 ÀS 11:06"
              status={data as status}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Solicitacoes
