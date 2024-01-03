import React from 'react'
import { BsGear, BsList, BsPower } from 'react-icons/bs'

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
        <Text as="span" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Academ
          <Text as="span" fontSize="3xl" color="blue.500">
            IC
          </Text>
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem
          key={link.name}
          name={link.name}
          to={link.to}
          icon={link.icon}
        />
      ))}
    </Box>
  )
}

export default SidebarContent
