import React from 'react'
import { FiMenu } from 'react-icons/fi'

import { Flex, IconButton, useColorModeValue, Text } from '@chakra-ui/react'

import { IMobileProps } from '../../types'

const MobileNav = ({ sidebarWidth, onOpen, ...rest }: IMobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: sidebarWidth }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      gap={4}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>
    </Flex>
  )
}

export default MobileNav
