import React from 'react'

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

import NumberCaption from '@/components/DataDisplay/NumberCaption'

const SecretariaHome = () => {
  return (
    <Stack gap={5}>
      <Stack>
        <Stack boxShadow="lg" rounded="lg" p="6" bg="#FBFBFB" gap={5}>
          <Text fontSize="xl" fontWeight="semibold">
            Status das solicitações
          </Text>
          <HStack flexWrap="wrap" align="flex-start">
            <NumberCaption number={7} caption="Não atendidas" flex={1} />
            <NumberCaption number={15} caption="Em andamento" flex={1} />
            <NumberCaption number={37} caption="Resolvidas" flex={1} />
            <NumberCaption number={59} caption="Total" flex={1} />
          </HStack>
        </Stack>
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} gap={5}>
        <Stack boxShadow="lg" rounded="lg" p="6" bg="#FBFBFB" gap={5} flex={1}>
          <Text fontSize="xl" fontWeight="semibold">
            Novas demandas
            <Badge fontSize="md" ml="2" colorScheme="green">
              +4
            </Badge>
          </Text>
          <Stack>
            <Button>Demanda 1</Button>
            <Button>Demanda 2</Button>
            <Button>Demanda 3</Button>
          </Stack>
        </Stack>
        <Stack boxShadow="lg" rounded="lg" p="6" bg="#FBFBFB" gap={5} flex={1}>
          <Text fontSize="xl" fontWeight="semibold">
            Demandas vistas recentemente
          </Text>
          <Stack>
            <Button>Demanda 1</Button>
            <Button>Demanda 2</Button>
            <Button>Demanda 3</Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SecretariaHome
