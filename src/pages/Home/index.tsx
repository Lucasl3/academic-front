import React from 'react'

import { Box, Flex, Stack, useMediaQuery } from '@chakra-ui/react'

import Calculadora from '@/components/Calculadora'
import Carousel from '@/components/Carousel'
import TutoriaisHome from '@/components/Tutoriais'
import { TutoriaisHomeProps } from '@/components/Tutoriais/types'

const tutoriais: TutoriaisHomeProps[] = [
  {
    title: 'Tutorial 1',
    description:
      'Descrição do tutorial 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia, augue in commodo tincidunt, elit erat varius ex, vel scelerisque velit dolor non enim. Aenean vel lectus porta, interdum eros ac, volutpat sem. Nunc et nunc tempus, euismod eros non, ullamcorper tellus. Pellentesque maximus dui vel ullamcorper ullamcorper. Curabitur consectetur tortor vel luctus finibus. Duis mi urna, lobortis eget velit a, pharetra scelerisque lorem.',
    image: 'https://via.placeholder.com/150/',
    url: 'https://www.example.com/tutorial1',
  },
  {
    title: 'Tutorial 2',
    description:
      'Descrição do tutorial 2. Sed lacinia suscipit felis, nec tempor mauris faucibus at. Integer semper pharetra justo, vel interdum odio varius vitae. Nullam fringilla congue sapien vitae molestie. Vestibulum nec leo vitae nulla convallis suscipit. Nullam eget aliquam ipsum. Nulla convallis congue leo, at rutrum magna hendrerit ac. Nulla facilisi. Maecenas nec purus non augue sagittis rhoncus. Donec fringilla eget nisi et laoreet.',
    image: 'https://via.placeholder.com/150/',
    url: 'https://www.example.com/tutorial2',
  },
  {
    title: 'Tutorial 3',
    description:
      'Descrição do tutorial 3. Fusce vel tellus nec libero laoreet rhoncus sed sit amet tortor. In hac habitasse platea dictumst. Nam lobortis lobortis enim, nec scelerisque turpis tempor non. Donec malesuada tortor et nisl commodo consequat. Ut in lectus at libero tristique tristique. Etiam nec nulla arcu. Integer eget lectus nec justo tincidunt tempor.',
    image: 'https://via.placeholder.com/150/',
    url: 'https://www.example.com/tutorial3',
  },
  {
    title: 'Tutorial 4',
    description:
      'Descrição do tutorial 4. Phasellus sodales nisi eget ligula commodo, ut vehicula leo vestibulum. Mauris a turpis nec lectus interdum vestibulum. Integer ultricies urna vel ultrices consectetur. Proin rhoncus diam eget est consequat, quis scelerisque turpis vestibulum. Proin ultricies lectus sed velit condimentum, in posuere metus dapibus. Morbi laoreet fringilla ante, nec tincidunt felis condimentum nec. Duis vel neque eu ex aliquam fermentum.',
    image: 'https://via.placeholder.com/150/',
    url: 'https://www.example.com/tutorial4',
  },
  {
    title: 'Tutorial 5',
    description:
      'Descrição do tutorial 5. Integer eleifend sem ut arcu commodo feugiat. Nulla ac congue justo. Phasellus auctor lectus vitae diam placerat, ut consectetur sapien bibendum. Nullam vitae ligula velit. Integer sed enim ac mauris auctor venenatis id ut nunc. Vivamus convallis lacus eget libero egestas pharetra. Morbi fermentum lorem id ipsum tempor lacinia. Cras at justo at justo fermentum scelerisque.',
    url: 'https://www.example.com/tutorial5',
  },
]

const Home = () => {
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
      <Flex
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
          gap: 8,
        }}
      >
        <Calculadora />
        <TutoriaisHome tutoriais={tutoriais} />
      </Flex>
    </Stack>
  )
}

export default Home
