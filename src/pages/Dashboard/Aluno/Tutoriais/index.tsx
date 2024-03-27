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

import { useQueryTutorials } from '@/api/dashboard/tutorial/queries'
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
    const tutorialsMapped = tutorials?.map((tutorial) => {
      return {
        id: tutorial.coTutorial,
        title: tutorial.noTutorial,
        description: tutorial.dsTutorial,
        available: tutorial.coStatus,
        status: tutorial.coStatus ? 'available' : 'hidden',
      }
    })

    return tutorialsMapped.filter((tutorial) => tutorial.available)
  }, [tutorials])

  return (
    <Stack gap={5}>
      <Text fontSize="2xl" fontWeight="semibold" color="#444A63">
        Tutoriais
      </Text>
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
            Sem tutoriais disponíveis
          </Text>
        )}
        {!isTutorialsLoading &&
          tutorialsData?.map((tutorial, index) => (
            <TutorialCard
              key={index}
              to={`/dashboard/aluno/tutoriais/${tutorial.id}`}
              title={tutorial.title}
              description={tutorial.description}
              tooltipText="Clique para visualizar"
            />
          ))}
      </Stack>
    </Stack>
  )
}

export default Tutoriais
