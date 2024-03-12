import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  HStack,
  Stack,
  Text,
  useToast,
  Skeleton,
} from '@chakra-ui/react'

import { useQueryTutorials } from '@/api/dashboard/queries'
import TutorialCard from '@/components/DataDisplay/TutorialCard'
import { status } from '@/components/Tags/TutorialStatus/types'

const Tutoriais = () => {
  const toast = useToast()

  const { data: tutorials = [], isFetching: isTutorialsLoading } =
    useQueryTutorials({
      onError: () => {
        toast({
          title: 'Houve um erro ao buscar os tutoriais.',
          status: 'error',
          duration: 5000,
        })
      },
    })

  const tutorialsData = useMemo(() => {
    return tutorials?.map((tutorial) => {
      return {
        id: tutorial.coTutorial,
        title: tutorial.noTutorial,
        description: tutorial.dsTutorial,
        status: 'available',
      }
    })
  }, [tutorials])

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
      {isTutorialsLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height="108px" />
        ))}
      <Stack gap={3}>
        {!isTutorialsLoading && tutorialsData?.length === 0 && (
          <Text
            fontSize="xl"
            fontWeight="medium"
            color="#444A63"
            textAlign="center"
          >
            Nenhum tutorial encontrado
          </Text>
        )}
        {tutorialsData?.map((tutorial, index) => (
          <TutorialCard
            key={index}
            to={`/dashboard/secretaria/tutoriais/detalhes/${tutorial.id}`}
            title={tutorial.title}
            description={tutorial.description}
            tooltipText="Clique para editar"
            statusTag={tutorial.status as status}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default Tutoriais
