import React from 'react'

import { Box, Flex, HStack, Stack } from '@chakra-ui/react'

const StatusSolicitacao = ({
  statusSolicitacoes,
}: {
  statusSolicitacoes: Array<{ data?: string; mensagem?: string }>
}) => {
  return (
    <Stack gap={5}>
      {statusSolicitacoes.map((status, index) => (
        <HStack key={index}>
          <Flex fontSize="sm" flex={1}>
            {status.data}
          </Flex>
          <Flex
            flex={6}
            w="full"
            wordBreak="break-word"
            bg="#E1E6FC"
            borderRadius="8px"
            padding="10px"
          >
            {status.mensagem}
          </Flex>
        </HStack>
      ))}
    </Stack>
  )
}

export default StatusSolicitacao
