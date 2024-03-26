import React from 'react'

import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react'

import { INumberCaptionProps } from './types'

const NumberCaption = ({ number, caption, ...rest }: INumberCaptionProps) => {
  const captionsToColor = {
    'Não atendidas': 'red.100',
    'Em andamento': 'orange.100',
    Resolvidas: 'green.100',
    Total: 'blue.100',
  }
  const bgColor = captionsToColor[caption] || 'gray.500'

  return (
    <Stack justify="center" gap={4} {...rest}>
      <Flex justify="center" rounded="lg">
        <Center bg={bgColor} w="75px" h="75px" rounded="50%">
          <Text fontSize="xl" fontWeight="semibold">
            {number}
          </Text>
        </Center>
      </Flex>
      <Text textAlign="center" textTransform="uppercase" fontWeight="semibold">
        {caption}
      </Text>
    </Stack>
  )
}

export default NumberCaption
