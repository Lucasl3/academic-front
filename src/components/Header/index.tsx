import React from 'react'
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi'
import { Link as ReactRouterLink } from 'react-router-dom'

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
  MenuDivider,
  MenuGroup,
  Button,
  Circle,
  useMediaQuery,
} from '@chakra-ui/react'

import { IHeaderProps } from './types'

const Header = ({ loggedUser, onOpen, ...rest }: IHeaderProps) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <Flex
      px={{ base: 4, md: 10 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      justifyContent="space-between"
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
      <Text
        as="span"
        fontSize="3xl"
        fontFamily="monospace"
        fontWeight="bold"
        color="#444A63"
      >
        Academ
        <Text as="span" fontSize="4xl" color="#495796">
          IC
        </Text>
      </Text>
      {loggedUser ? (
        <HStack spacing={{ base: 2, md: 6 }}>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={
                <>
                  <FiBell />
                  {false && (
                    <Circle
                      size="16px"
                      color="white"
                      position="absolute"
                      top="6px"
                      right="3px"
                      fontSize="xs"
                      bgColor="red.500"
                    >
                      4
                    </Circle>
                  )}
                </>
              }
            />
            <MenuList>
              <MenuGroup title="Notificações">
                <Box p="3">Teste</Box>
              </MenuGroup>
            </MenuList>
          </Menu>
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
                    <Avatar
                      size={'sm'}
                      src={
                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{loggedUser.name}</Text>
                      <Text fontSize="xs" color="gray.600">
                        {loggedUser.type}
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
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
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
      )}
    </Flex>
  )
}

export default Header
