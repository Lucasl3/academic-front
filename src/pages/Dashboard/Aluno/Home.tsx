import React, { useContext, useEffect, useState } from 'react'

import {
  Stack,
  Box,
  Flex,
  Button,
  HStack,
  Text,
  Center,
  Badge,
} from '@chakra-ui/react'

import { getSolicitationByUser } from '@/api/dashboard/solicitation/services'
import NumberCaption from '@/components/DataDisplay/NumberCaption'
import { AppContext } from '@/contexts/AppContext'

const AlunoHome = () => {
  const { user: loggedUser } = useContext(AppContext)
  const [naoAtendidas, setNaoAtendidas] = useState(0)
  const [emAndamento, setEmAndamento] = useState(0)
  const [resolvidas, setResolvidas] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getSolicitationByUser({ id: loggedUser.co_user }).then((res) => {
      setTotal(res.length)
      setNaoAtendidas(
        res.filter((s: any) => s.coStatus === 0 || s.coStatus === 1).length,
      )
      setEmAndamento(res.filter((s: any) => s.coStatus === 2).length)
      setResolvidas(res.filter((s: any) => s.coStatus === 3).length)
    })
  }, [])

  return (
    <Stack gap={5}>
      <Stack>
        <Stack boxShadow="lg" rounded="lg" p="6" bg="#FBFBFB" gap={5}>
          <Text fontSize="xl" fontWeight="semibold">
            Status das solicitações
          </Text>
          <HStack flexWrap="wrap" align="flex-start">
            <NumberCaption
              number={naoAtendidas}
              caption="Não atendidas"
              flex={1}
            />
            <NumberCaption
              number={emAndamento}
              caption="Em andamento"
              flex={1}
            />
            <NumberCaption number={resolvidas} caption="Resolvidas" flex={1} />
            <NumberCaption number={total} caption="Total" flex={1} />
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AlunoHome
