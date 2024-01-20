import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Header from '@/components/Header'
import { SidebarContext } from '@/contexts/SidebarContext'
import { sidebarProps } from '@/data/template'

import Sidebar from './parts/Sidebar'

function TemplatePage() {
  const { onOpen } = useContext(SidebarContext)
  const loggedUser = {
    name: 'User',
    type: 'Admin',
  }

  return (
    <Sidebar {...sidebarProps}>
      <Header loggedUser={loggedUser} onOpen={onOpen} />
      <Box p="4">
        <Outlet />
      </Box>
    </Sidebar>
  )
}
export default TemplatePage
