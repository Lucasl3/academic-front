import React, { useContext } from 'react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi'
import { Outlet } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import { SidebarContext } from '@/contexts/SidebarContext'
import { sidebarProps } from '@/data/template'

import Header from './parts/Header'
import Sidebar from './parts/Sidebar'

function TemplatePage() {
  const { onOpen } = useContext(SidebarContext)

  return (
    <Sidebar {...sidebarProps}>
      <Header onOpen={onOpen} />
      <Box p="4">
        <Outlet />
      </Box>
    </Sidebar>
  )
}
export default TemplatePage
