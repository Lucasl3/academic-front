import React, { useContext, ReactNode } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import TemplatePage from '@/common/Templates/TemplatePage'
import AppContextProvider from '@/contexts/AppContext'
import { AppContext } from '@/contexts/AppContext'
import PrivateRoutes from '@/guard/auth.guard'
import Login from '@/pages/Auth/Login'
import Formularios from '@/pages/Dashboard/Aluno/Formularios'
import StudentForm from '@/pages/Dashboard/Aluno/Formularios/StudentForm'
import AlunoHome from '@/pages/Dashboard/Aluno/Home'
import AlunoSolicitacoes from '@/pages/Dashboard/Aluno/Solicitacoes'
import AlunoSolicitacao from '@/pages/Dashboard/Aluno/Solicitacoes/View'
import AlunoTutoriais from '@/pages/Dashboard/Aluno/Tutoriais'
import AlunoTutorial from '@/pages/Dashboard/Aluno/Tutoriais/View'
import NewsPage from '@/pages/Dashboard/News'
import Demandas from '@/pages/Dashboard/Secretaria/Demandas'
import DemandaView from '@/pages/Dashboard/Secretaria/Demandas/View'
import SecretariaFormularios from '@/pages/Dashboard/Secretaria/Formularios'
import CreateFormulario from '@/pages/Dashboard/Secretaria/Formularios/Create'
import SecretariaHome from '@/pages/Dashboard/Secretaria/Home'
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

const CheckSecretaria: React.FC = () => {
  const { user } = useContext(AppContext)
  return user.admin ? <Outlet /> : <Navigate to="/login" />
}

const CheckAluno: React.FC = () => {
  const { user } = useContext(AppContext)
  return !user.admin ? <Outlet /> : <Navigate to="/login" />
}

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
                  <Route path="news/:id" element={<NewsPage />} />
                  <Route element={<CheckAluno />}>
                    <Route path="aluno">
                      <Route path="inicio" element={<AlunoHome />} />
                      <Route path="tutoriais">
                        <Route index element={<AlunoTutoriais />} />
                        <Route path=":id" element={<AlunoTutorial />} />
                      </Route>
                      <Route path="formularios">
                        <Route index element={<Formularios />} />
                        <Route path="detalhes/:id" element={<StudentForm />} />
                      </Route>
                      <Route path="solicitacoes">
                        <Route index element={<AlunoSolicitacoes />} />
                        <Route
                          path="detalhes/:id"
                          element={<AlunoSolicitacao />}
                        />
                        <Route
                          path="tutorial/:id"
                          element={<AlunoTutorial />}
                        />
                      </Route>
                    </Route>
                  </Route>

                  <Route element={<CheckSecretaria />}>
                    <Route path="secretaria">
                      <Route path="inicio" element={<SecretariaHome />} />
                      <Route path="demandas">
                        <Route index element={<Demandas />} />
                        <Route path="detalhes/:id" element={<DemandaView />} />
                      </Route>
                      <Route path="tutoriais">
                        <Route index element={<Tutoriais />} />
                        <Route path="criar" element={<CreateTutorial />} />
                        <Route path="detalhes/:id" element={<EditTutorial />} />
                      </Route>
                      <Route path="usuarios">
                        <Route index element={<Users />} />
                      </Route>
                      <Route path="formularios">
                        <Route index element={<SecretariaFormularios />} />
                        <Route path="criar" element={<CreateFormulario />} />
                      </Route>
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
