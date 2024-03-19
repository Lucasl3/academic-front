import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import TemplatePage from '@/common/Templates/TemplatePage'
import AppContextProvider from '@/contexts/AppContext'
import PrivateRoutes from '@/guard/auth.guard'
import Login from '@/pages/Auth/Login'
import Aluno from '@/pages/Dashboard/Aluno'
import Formularios from '@/pages/Dashboard/Aluno/Formularios'
import StudentForm from '@/pages/Dashboard/Aluno/Formularios/StudentForm'
import AlunoHome from '@/pages/Dashboard/Aluno/Home'
import AlunoSolicitacoes from '@/pages/Dashboard/Aluno/Solicitacoes'
import AlunoSolicitacoesDetalhes from '@/pages/Dashboard/Aluno/Solicitacoes/View'
import AlunoTutorial from '@/pages/Dashboard/Aluno/Tutorial'
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

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
})
class App extends React.Component {
  render() {
    return (
      <ChakraProvider theme={theme}>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeNotLogged />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<TemplatePage />}>
                  <Route index element={<Navigate to="/dashboard/home" />} />
                  <Route path="home" element={<Home />} />
                  <Route path="aluno" element={<Aluno />}>
                    <Route index element={<AlunoHome />} />
                    <Route path="formularios">
                      <Route index element={<Formularios />} />
                      <Route path="detalhes/:id" element={<StudentForm />} />
                    </Route>
                    <Route path="solicitacoes">
                      <Route index element={<AlunoSolicitacoes />} />
                      <Route
                        path="detalhes/:id"
                        element={<AlunoSolicitacoesDetalhes />}
                      />
                    </Route>
                  </Route>
                  <Route
                    path="aluno/tutorial/:id"
                    element={<AlunoTutorial />}
                  />
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
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </ChakraProvider>
    )
  }
}

export default App
