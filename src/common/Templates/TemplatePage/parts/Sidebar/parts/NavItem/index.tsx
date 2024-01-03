import React from 'react'
import { NavLink } from 'react-router-dom'

import { Icon, Flex, Link, Box } from '@chakra-ui/react'

import { INavItemProps } from '../../types'
const NavItem = ({ name, to, icon, ...rest }: INavItemProps) => {
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
