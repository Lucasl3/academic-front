import React, { useEffect, useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { getGoogleUserInfo } from '@/api/auth/google/services'
import LayoutLoading from '@/common/Layout/LayoutLoading'
import { AppContext } from '@/contexts/AppContext'

const PrivateRoutes = () => {
  const [isAuthenticating, setIsAuthenticating] = React.useState(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const { setUser } = useContext(AppContext)
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    async function checkAuthentication() {
      await getGoogleUserInfo({ accessToken: accessToken || '' })
        .then((userInfo) => {
          setUser({ ...userInfo, admin: true })
          setIsAuthenticated(true)
        })
        .catch(() => {
          setIsAuthenticated(false)
        })
        .finally(() => {
          setIsAuthenticating(false)
        })
    }

    checkAuthentication()
  }, [])

  if (isAuthenticating) {
    return <LayoutLoading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  } else {
    return <Outlet />
  }
}

export default PrivateRoutes
