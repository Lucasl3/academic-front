/* eslint-disable prettier/prettier */
import React from 'react'

import { Flex } from '@chakra-ui/react'

const StatusSolicitacao = ({
  statusSolicitacoes,
}: {
  statusSolicitacoes: Array<{ data?: string; mensagem?: string }>
}) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {statusSolicitacoes.map((status, index) => (
        <Flex key={index} sx={{ gap: 10, marginBottom: 5}}>
          <Flex fontSize={'sm'}>{status.data}</Flex>
          <Flex sx={{
            width: '100%',
            wordBreak: 'break-word',
            background: '#E1E6FC',
            borderRadius: '8px',
            padding: '10px'
          }}>{status.mensagem}</Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default StatusSolicitacao
