import React, { useContext, useEffect } from 'react'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useMediaQuery,
} from '@chakra-ui/react'

import { SidebarContext } from '@/contexts/SidebarContext'

import MobileNav from './parts/MobileNav'
import SidebarContent from './parts/SidebarContent'
import { ISidebarProps } from './types'

const Sidebar = ({
  linkItems,
  includeMobileHeader,
  children,
}: ISidebarProps) => {
  const { isOpen, onClose } = useContext(SidebarContext)
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const sidebarWidth = 48

  useEffect(() => {
    if (!isMobile) {
      onClose()
    }
  }, [isMobile])

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {!isMobile && <SidebarContent linkItems={linkItems} />}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent linkItems={linkItems} />
        </DrawerContent>
      </Drawer>
      {includeMobileHeader && isMobile && <MobileNav />}
      <Box ml={{ base: 0, md: sidebarWidth }}>{children}</Box>
    </Box>
  )
}

export default Sidebar
