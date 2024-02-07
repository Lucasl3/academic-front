import React from 'react'

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  OrderedList,
  ListItem,
  Link,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  useMediaQuery,
} from '@chakra-ui/react'

import Calculadora from '@/components/Calculadora'
import Carousel from '@/components/Carousel'

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
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Calculadora />
        <Stack boxShadow="lg" rounded="lg" p={4} bg="#FBFBFB" flex={3}>
          <Text fontSize="lg" fontWeight="semibold" color="#444A63">
            Tutoriais
          </Text>
          <OrderedList>
            {[0, 1, 2, 3, 4].map((index) => (
              <ListItem fontSize="lg" key={index}>
                <Link color="teal.500" href="https://chakra-ui.com" isExternal>
                  Tutorial {index + 1}
                </Link>
              </ListItem>
            ))}
          </OrderedList>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Home
