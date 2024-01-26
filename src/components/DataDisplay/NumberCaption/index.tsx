import React from 'react'

import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react'

import { INumberCaptionProps } from './types'

const NumberCaption = ({ number, caption, ...rest }: INumberCaptionProps) => {
  return (
    <Stack justify="center" gap={4} {...rest}>
      <Flex justify="center" rounded="lg">
        <Center bg="gray.300" w="75px" h="75px" rounded="50%">
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
