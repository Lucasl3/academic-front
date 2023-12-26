import React from 'react'

import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
} from '@chakra-ui/react'

import { ISidebarContentProps } from '../../types'
import NavItem from '../NavItem'

const SidebarContent = ({
  linkItems,
  sidebarWidth,
  onClose,
  ...rest
}: ISidebarContentProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: sidebarWidth }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default SidebarContent
