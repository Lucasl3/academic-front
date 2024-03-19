import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import Tabs from '@/components/Tabs'
import { ITabItem } from '@/components/Tabs/types'
import { AppContext } from '@/contexts/AppContext'
import { findElementAfter } from '@/utils/array'

const Secretaria = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(AppContext)

  const initialPath = findElementAfter(
    location.pathname.split('/'),
    'secretaria',
  )

  const tabs: Array<ITabItem> = [
    {
      id: '',
      label: 'Início',
    },
    {
      id: 'demandas',
      label: 'Demandas',
    },
    {
      id: 'tutoriais',
      label: 'Tutoriais',
    },
    /*{
      id: 'formularios',
      label: 'Formulários',
    },*/
    {
      id: 'usuarios',
      label: 'Gerenciar Usuários',
    },
  ]

  const handleOnTabClick = (id: string) => {
    navigate(`/dashboard/secretaria/${id}`)
  }

  useEffect(() => {
    if (!user.admin) {
      navigate('/dashboard/home')
    }
  }, [])

  return (
    <Box>
      <Tabs
        items={tabs}
        initialTab={initialPath}
        onTabClick={handleOnTabClick}
      />
      <Outlet />
    </Box>
  )
}

export default Secretaria
