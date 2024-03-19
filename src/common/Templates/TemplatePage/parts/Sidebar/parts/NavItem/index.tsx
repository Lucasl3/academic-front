import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { Icon, Flex, Link } from '@chakra-ui/react'

import { AppContext } from '@/contexts/AppContext'

import { INavItemProps } from '../../types'
const NavItem = ({ name, to, icon }: INavItemProps) => {
  const { sidebar } = useContext(AppContext)
  const { onClose } = sidebar

  return (
    <Link
      role="group"
      as={NavLink}
      to={to}
      display="flex"
      p="3"
      textDecoration="none"
      _activeLink={{
        bg: 'blue.500',
        color: 'white',
      }}
      _hover={{
        bg: 'blue.400',
        color: 'white',
      }}
      onClick={onClose}
    >
      <Flex align="center">
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
    </Link>
  )
}

export default NavItem
