import React from 'react'
import { Link } from 'react-router-dom'

import { Button, HStack, Stack, Text } from '@chakra-ui/react'

import TutorialCard from '@/components/DataDisplay/TutorialCard'
import { status } from '@/components/Tags/TutorialStatus/types'

const Tutoriais = () => {
  const loremIpsum =
    'Lorem ipsum dolor sit amet. Nam molestias impedit qui consequuntur distinctio et cumque voluptas qui vero possimus. Ut galisum dolorum aut adipisci consequatur et modi voluptatibus aut nesciunt fugiat non eligendi exercitationem.'

  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Gerenciamento de Tutoriais
        </Text>
        <Button as={Link} bg="#495796" colorScheme="blue" to="criar">
          Criar Tutorial
        </Button>
      </HStack>
      <Stack gap={3}>
        {['hidden', 'available', 'incomplete'].map((data, index) => (
          <TutorialCard
            key={index}
            to={`/dashboard/secretaria/tutoriais/detalhes/${index}`}
            title={`Título do tutorial ${index + 1}`}
            description={loremIpsum}
            tooltipText="Clique para gerenciar"
            statusTag={data as status}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default Tutoriais
