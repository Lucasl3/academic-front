import React, { useEffect, useMemo } from 'react'

import {
  Avatar,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react'

import { useQueryNews } from '@/api/dashboard/news/queries'
import { useQueryTutorials } from '@/api/dashboard/tutorial/queries'
import Calculadora from '@/components/Calculadora'
import Carousel from '@/components/Carousel'
import TutoriaisHome from '@/components/Tutoriais'

const Home = () => {
  const toast = useToast()

  const { data: news = [], isFetching: isNewsLoading } = useQueryNews({
    onError: () => {
      toast({
        title: 'Houve um erro ao buscar as notícias.',
        status: 'error',
        duration: 5000,
      })
    },
  })

  const newsData = useMemo(() => {
    return news?.map((item) => {
      return {
        id: item.coNews,
        title: item.noNews,
        description: item.dsNews,
        date: item.dtNews,
        image:
          'https://t3.ftcdn.net/jpg/05/35/35/38/360_F_535353834_fAKyu7nTpbpNux5XdR5T63OUJ6gDOHlD.jpg',
      }
    })
  }, [news])

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
        image: 'https://via.placeholder.com/150/',
        url: '',
      }
    })

    return tutorialsMapped.filter((tutorial) => tutorial.available)
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
          {newsData.map((item, index) => (
            <Flex
              key={index}
              align="center"
              height={{ base: '200px', lg: '400px' }}
              position="relative"
            >
              <Image src={item.image} fit="cover" width="100%" />
              <Box
                bottom="0"
                position="absolute"
                backgroundColor="blue.500"
                borderRadius="0.3rem"
                p="2"
                margin={4}
              >
                <Text
                  sx={{
                    fontSize: { base: 'sm', lg: 'lg' },
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}
                </Text>
              </Box>
            </Flex>
          ))}
        </Carousel>
      </Flex>
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={8}>
        <Calculadora />
        <TutoriaisHome
          tutorials={tutorialsData}
          isLoading={isTutorialsLoading}
        />
      </Flex>
    </Stack>
  )
}

export default Home
