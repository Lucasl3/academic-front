import React, { useContext } from 'react'
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import {
  Flex,
  IconButton,
  useColorModeValue,
  Text,
  HStack,
  Avatar,
  VStack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useMediaQuery,
} from '@chakra-ui/react'

import { AppContext } from '@/contexts/AppContext'

import Notifications from './parts/Notifications'
import { IHeaderProps } from './types'

const Header = ({ loggedUser, onOpen, ...rest }: IHeaderProps) => {
  const { user } = useContext(AppContext)
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const navigate = useNavigate()
  const isAdmin = user?.admin

  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  const getUserName = (name: string) => {
    const splitName = name.split(' ')
    return `${splitName[0]} ${splitName[1]}`
  }

  return (
    <Flex
      px={{ base: 4, md: 10 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      justifyContent={loggedUser ? 'flex-end' : 'space-between'}
      {...rest}
    >
      {isMobile && onOpen && (
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
      )}
      {loggedUser ? (
        <HStack spacing={{ base: 2, md: 6 }}>
          {isAdmin && <Notifications />}
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack
                  minW={{ base: 'none', md: '150px' }}
                  justify="space-between"
                >
                  <HStack>
                    <Avatar size="sm" src={loggedUser.picture} />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{getUserName(loggedUser.name)}</Text>
                      <Text fontSize="xs" color="gray.600">
                        {loggedUser.admin ? 'Secretaria' : 'Aluno'}
                      </Text>
                    </VStack>
                  </HStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                {/* 
                  <MenuItem>Perfil</MenuItem>
                  <MenuDivider />
                 */}
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
        <>
          <Text
            as="span"
            fontSize="3xl"
            fontFamily="monospace"
            fontWeight="bold"
            color="#444A63"
          >
            Academ
            <Text as="span" fontSize="4xl" color="blue.500">
              IC
            </Text>
          </Text>
          <Button
            as={ReactRouterLink}
            bg="#495796"
            colorScheme="blue"
            color="#FBFBFB"
            variant="solid"
            to="/login"
          >
            Login
          </Button>
        </>
      )}
    </Flex>
  )
}

export default Header
