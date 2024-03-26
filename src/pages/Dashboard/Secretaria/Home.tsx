import React, { useEffect, useState } from 'react'

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

import { getForm } from '@/api/dashboard/forms/services'
import { getSolicitations } from '@/api/dashboard/solicitation/services'
import NumberCaption from '@/components/DataDisplay/NumberCaption'

const SecretariaHome = () => {
  const [naoAtendidas, setNaoAtendidas] = useState(0)
  const [demandasRecentes, setDemandasRecentes] = useState([
    {
      id: 0,
      title: '',
      data: '',
    },
  ])

  const [demandasNovas, setDemandasNovas] = useState([
    {
      id: 0,
      title: '',
    },
  ])
  const [emAndamento, setEmAndamento] = useState(0)
  const [resolvidas, setResolvidas] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getSolicitations().then((res) => {
      const novasDemandas = res
        .filter((s: any) => s.coStatus === 0 || s.coStatus === 1)
        .map((demanda: any) => {
          return getForm({ id: demanda.coForm }).then((form) => {
            return {
              id: demanda.coSolicitation,
              title: form.noForm,
            }
          })
        })

      Promise.all(novasDemandas)
        .then((data) => {
          setDemandasNovas(data)
          // // Definir as demandas recentes com base nas datas mais recentes
          // const demandasOrdenadasPorData = data.sort(
          //   (a, b) => b.data.getTime() - a.data.getTime(),
          // )
          // const demandasRecentesAtualizadas = demandasOrdenadasPorData.slice(
          //   0,
          //   5,
          // ) // Pegar as 5 demandas mais recentes
          // console.log(demandasRecentesAtualizadas)
          // setDemandasRecentes(demandasRecentesAtualizadas)
        })
        .catch((error) => {
          console.error(error)
        })
      const recentes = res.map((demanda: any) => {
        console.log(demanda)
        return getForm({ id: demanda.coForm }).then((form) => {
          return {
            id: demanda.coSolicitation,
            title: form.noForm,
            data: demanda.dtUpdatedAt,
          }
        })
      })
      Promise.all(recentes)
        .then((dadosRecentes) => {
          // Definir as demandas recentes com base nas datas mais recentes
          const demandasComData = dadosRecentes.filter(
            (item) => item.data !== null,
          )
          console.log(demandasComData)

          // Verificar se há demandas com data para evitar erro de ordenação
          if (demandasComData.length > 0) {
            // Ordenar as demandas com base nas datas mais recentes
            const demandasOrdenadasPorData = demandasComData.sort((a, b) => {
              const dateA =
                a.data instanceof Date
                  ? a.data.getTime()
                  : Number.MIN_SAFE_INTEGER
              const dateB =
                b.data instanceof Date
                  ? b.data.getTime()
                  : Number.MIN_SAFE_INTEGER
              return dateB - dateA
            })

            // Selecionar as 5 demandas mais recentes
            const demandasRecentesAtualizadas = demandasOrdenadasPorData.slice(
              0,
              5,
            )
            setDemandasRecentes(demandasRecentesAtualizadas)
          } else {
            setDemandasRecentes([])
          }
        })
        .catch((error) => {
          console.error(error)
        })
      console.log(recentes)
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
            Status das demandas
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
      <Stack direction={{ base: 'column', md: 'row' }} gap={5}>
        <Stack boxShadow="lg" rounded="lg" p="6" bg="#FBFBFB" gap={5} flex={1}>
          <Text fontSize="xl" fontWeight="semibold">
            Novas demandas
            <Badge fontSize="md" ml="2" colorScheme="green">
              +{naoAtendidas}
            </Badge>
          </Text>
          <Stack>
            {demandasNovas.map((demanda, index) => (
              <Button key={index}>{demanda.title}</Button>
            ))}
          </Stack>
        </Stack>
        <Stack boxShadow="lg" rounded="lg" p="6" bg="#FBFBFB" gap={5} flex={1}>
          <Text fontSize="xl" fontWeight="semibold">
            Demandas vistas recentemente
          </Text>
          <Stack>
            {demandasRecentes.map((demanda, index) => (
              <Button key={index}>{demanda.title}</Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SecretariaHome
