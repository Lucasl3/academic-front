import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import TemplatePage from '@/common/Templates/TemplatePage'
import SidebarContextProvider from '@/contexts/SidebarContext'
import PrivateRoutes from '@/guard/auth.guard'
import Login from '@/pages/Auth/Login'
import Secretaria from '@/pages/Dashboard/Secretaria'
import Demandas from '@/pages/Dashboard/Secretaria/Demandas'
import DemandaView from '@/pages/Dashboard/Secretaria/Demandas/View'
import SecretariaHome from '@/pages/Dashboard/Secretaria/Home'
import Solicitacoes from '@/pages/Dashboard/Secretaria/Solicitacoes'
import Tutoriais from '@/pages/Dashboard/Secretaria/Tutoriais'
import CreateTutorial from '@/pages/Dashboard/Secretaria/Tutoriais/Create'
import EditTutorial from '@/pages/Dashboard/Secretaria/Tutoriais/Edit'
import Users from '@/pages/Dashboard/Secretaria/Users'
import Home from '@/pages/Home'
import HomeNotLogged from '@/pages/Home/NotLogged'
class App extends React.Component {
  render() {
    return (
      <SidebarContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeNotLogged />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<TemplatePage />}>
                <Route index element={<Navigate to="/dashboard/home" />} />
                <Route path="home" element={<Home />} />
                <Route path="secretaria" element={<Secretaria />}>
                  <Route index element={<SecretariaHome />} />
                  <Route path="demandas">
                    <Route index element={<Demandas />} />
                    <Route path="detalhes/:id" element={<DemandaView />} />
                  </Route>
                  <Route path="solicitacoes">
                    <Route index element={<Solicitacoes />} />
                    <Route path="criar" element={<CreateTutorial />} />
                    <Route path="detalhes/:id" element={<EditTutorial />} />
                  </Route>
                  <Route path="tutoriais">
                    <Route index element={<Tutoriais />} />
                    <Route path="criar" element={<CreateTutorial />} />
                    <Route path="detalhes/:id" element={<EditTutorial />} />
                  </Route>
                  <Route path="usuarios">
                    <Route index element={<Users />} />
                  </Route>
                  <Route
                    path="formularios"
                    element={<h1>Secretaria Formularios</h1>}
                  />
                  <Route
                    path="usuarios"
                    element={<h1>Secretaria Usuários</h1>}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SidebarContextProvider>
    )
  }
}

export default App
