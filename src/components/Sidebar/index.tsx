import React from 'react'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'

import MobileNav from './parts/MobileNav'
import SidebarContent from './parts/SidebarContent'
import { ISidebarProps } from './types'

const Sidebar = ({
  linkItems,
  includeMobileHeader,
  children,
}: ISidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const sidebarWidth = 48

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {!isMobile && (
        <SidebarContent
          linkItems={linkItems}
          sidebarWidth={sidebarWidth}
          onClose={() => onClose}
        />
      )}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            linkItems={linkItems}
            sidebarWidth={sidebarWidth}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
      {includeMobileHeader && isMobile && (
        <MobileNav sidebarWidth={sidebarWidth} onOpen={onOpen} />
      )}
      <Box ml={{ base: 0, md: sidebarWidth }}>{children}</Box>
    </Box>
  )
}

export default Sidebar
