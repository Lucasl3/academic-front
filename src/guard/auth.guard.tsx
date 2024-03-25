import React, { useEffect, useContext, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { useToast } from '@chakra-ui/react'

import { getGoogleUserInfo } from '@/api/auth/google/services'
import { IGetGoogleUserInfoDTO } from '@/api/auth/google/types'
import { useMutationLogin } from '@/api/dashboard/user/mutations'
import LayoutLoading from '@/common/Layout/LayoutLoading'
import { AppContext } from '@/contexts/AppContext'

const PrivateRoutes = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState<IGetGoogleUserInfoDTO | null>(null)
  const { setUser } = useContext(AppContext)
  const toast = useToast()
  const accessToken = localStorage.getItem('accessToken')
  const { mutate: postLogin, isLoading: isLoginLoading } = useMutationLogin({
    onSuccess: (data) => {
      const admin = data.coProfile === 1
      setUser({
        co_user: data.coUser,
        email: data.dsEmail,
        name: data.noUser,
        admin: admin,
        picture: userInfo?.picture || '',
      })
    },
    onError: () => {
      localStorage.removeItem('accessToken')
      toast({
        title: 'Erro ao validar conta',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setIsAuthenticated(false)
    },
  })

  useEffect(() => {
    async function checkAuthentication() {
      await getGoogleUserInfo({ accessToken: accessToken || '' })
        .then((userInfo) => {
          setUserInfo(userInfo)
          postLogin({
            noUser: userInfo.name,
            dsEmail: userInfo.email,
          })
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

  if (isAuthenticating || isLoginLoading) {
    return <LayoutLoading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  } else {
    return <Outlet />
  }
}

export default PrivateRoutes
