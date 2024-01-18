import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  // TODO: Implementar lógica de autenticação
  const auth = { token: true }
  return auth.token ? <Outlet /> : <Navigate to="/auth/login" />
}

export default PrivateRoutes
