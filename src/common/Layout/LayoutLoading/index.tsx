import React from 'react'

import { Box, Center, CircularProgress } from '@chakra-ui/react'

const LoadingPage = () => {
  return (
    <Center minH="100vh">
      <CircularProgress
        size={140}
        thickness={4}
        color="#495796"
        isIndeterminate
      />
    </Center>
  )
}

export default LoadingPage
