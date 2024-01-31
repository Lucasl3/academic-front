import React from 'react'
import { Link } from 'react-router-dom'

import { Button, HStack, Stack, Text } from '@chakra-ui/react'

import FormularioCard from '@/components/DataDisplay/FormularioCard'
import { status } from '@/components/Tags/FormularioStatus/types'

const Formularios = () => {
  const loremIpsum =
    'Lorem ipsum dolor sit amet. Nam molestias impedit qui consequuntur distinctio et cumque voluptas qui vero possimus. Ut galisum dolorum aut adipisci consequatur et modi voluptatibus aut nesciunt fugiat non eligendi exercitationem.'

  const cursos = [
    'ENGENHARIA DE COMPUTAÇÃO',
    'CIÊNCIA DA COMPUTAÇÃO',
    'ENGENHARIA DE COMPUTAÇÃO',
  ]

  const availableDate = ['15/01/2024', '31/01/2024']

  return (
    <Stack gap={5}>
      <HStack justify="space-between">
        <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
          Formulários
        </Text>
      </HStack>
      <Stack gap={3}>
        {['available', 'available', 'closed'].map((data, index) => {
          const isClosed = data === 'closed'

          return (
            <FormularioCard
              key={index}
              to={
                isClosed
                  ? undefined
                  : `/dashboard/aluno/formularios/detalhes/${index}`
              }
              title={`Título do Formulário ${index + 1}`}
              date={availableDate[index]}
              description={loremIpsum}
              tooltipText={
                isClosed
                  ? 'Este formulário está encerrado'
                  : 'Clique para preencher'
              }
              course={cursos[index]}
              statusTag={data as status}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Formularios
