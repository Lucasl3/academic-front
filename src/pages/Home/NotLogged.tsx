import React from 'react'

import { Stack, Box } from '@chakra-ui/react'

import Header from '@/components/Header'

import Home from './index'

const HomeNotLogged = () => {
  return (
    <Stack>
      <Header />
      <Box px={{ base: 6, md: 12 }} py={6} bg="#E1E6FC">
        <Home />
      </Box>
    </Stack>
  )
}

export default HomeNotLogged
