import React, { useMemo } from 'react'

import { Box, Flex, Stack, useMediaQuery, useToast } from '@chakra-ui/react'

import { useQueryTutorials } from '@/api/dashboard/tutorial/queries'
import Calculadora from '@/components/Calculadora'
import Carousel from '@/components/Carousel'
import TutoriaisHome from '@/components/Tutoriais'

const Home = () => {
  const toast = useToast()
  const { data: tutorials = [] } = useQueryTutorials({
    onError: () => {
      toast({
        title: 'Houve um erro ao buscar os tutoriais.',
        status: 'error',
        duration: 5000,
      })
    },
  })

  const tutorialsData = useMemo(() => {
    console.log(tutorials)
    return tutorials?.map((tutorial) => {
      return {
        id: tutorial.coTutorial,
        title: tutorial.noTutorial,
        description: tutorial.dsTutorial,
        image: 'https://via.placeholder.com/150/',
        url: '',
      }
    })
  }, [tutorials])

  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <Stack minH="100vh" gap={8}>
      <Flex p={8} rounded="lg" bg="#FBFBFB" boxShadow="lg">
        <Carousel
          dots
          arrows={!isMobile}
          fade
          infinite
          autoplay
          speed={500}
          autoplaySpeed={5000}
        >
          {[0, 1, 2, 3].map((index) => (
            <Flex
              key={index}
              display="flex !important"
              align="center"
              justify="center"
              height={['300px', '400px']}
              bg="gray.400"
            >
              <Box>{index}</Box>
            </Flex>
          ))}
        </Carousel>
      </Flex>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={8}>
        <Calculadora />
        <TutoriaisHome tutorials={tutorialsData} />
      </Flex>
    </Stack>
  )
}

export default Home
