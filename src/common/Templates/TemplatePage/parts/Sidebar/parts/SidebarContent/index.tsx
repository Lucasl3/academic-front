import React, { useContext } from 'react'

import {
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'

import { AppContext } from '@/contexts/AppContext'

import { ISidebarContentProps } from '../../types'
import NavItem from '../NavItem'

const SidebarContent = ({ linkItems, ...rest }: ISidebarContentProps) => {
  const { sidebar, user } = useContext(AppContext)
  const { onClose, width } = sidebar
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const checkPermission = (isAdmin: boolean, users: string[]) => {
    if (isAdmin && users.includes('secretaria')) {
      return true
    }

    if (!isAdmin && users.includes('aluno')) {
      return true
    }

    return false
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight={isMobile ? 'none' : '1px'}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: width }}
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
      {linkItems.map(
        (link) =>
          checkPermission(user?.admin, link.users) && (
            <NavItem
              key={link.name}
              name={link.name}
              to={link.to}
              icon={link.icon}
            />
          ),
      )}
    </Box>
  )
}

export default SidebarContent
