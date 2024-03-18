import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Header from '@/components/Header'
import { AppContext } from '@/contexts/AppContext'
import { sidebarProps } from '@/data/template'

import Sidebar from './parts/Sidebar'

function TemplatePage() {
  const { sidebar, user: loggedUser } = useContext(AppContext)
  const { onOpen } = sidebar

  return (
    <Sidebar {...sidebarProps}>
      <Header loggedUser={loggedUser} onOpen={onOpen} />
      <Box minH="calc(100vh - 80px)" p="5" bg="#E1E6FC">
        <Outlet />
      </Box>
    </Sidebar>
  )
}
export default TemplatePage
