import {
  FiHome,
  FiTrello,
  FiMenu,
  FiBook,
  FiBookOpen,
  FiUsers,
} from 'react-icons/fi'

import { TTemplateSidebarProps } from './types'

export const sidebarProps = {
  linkItems: [
    {
      name: 'Início',
      icon: FiHome,
      to: '/dashboard/home',
      users: ['aluno', 'secretaria'],
    },
    {
      name: 'Dashboard',
      icon: FiTrello,
      to: '/dashboard/aluno/inicio',
      users: ['aluno'],
    },
    {
      name: 'Formularios',
      icon: FiMenu,
      to: '/dashboard/aluno/formularios',
      users: ['aluno'],
    },
    {
      name: 'Tutoriais',
      icon: FiBook,
      to: '/dashboard/aluno/tutoriais',
      users: ['aluno'],
    },
    {
      name: 'Solicitações',
      icon: FiBookOpen,
      to: '/dashboard/aluno/solicitacoes',
      users: ['aluno'],
    },
    {
      name: 'Dashboard',
      icon: FiTrello,
      to: '/dashboard/secretaria/inicio',
      users: ['secretaria'],
    },
    {
      name: 'Demandas',
      icon: FiBookOpen,
      to: '/dashboard/secretaria/demandas',
      users: ['secretaria'],
    },
    {
      name: 'Tutoriais',
      icon: FiBook,
      to: '/dashboard/secretaria/tutoriais',
      users: ['secretaria'],
    },
    {
      name: 'Formulários',
      icon: FiMenu,
      to: '/dashboard/secretaria/formularios',
      users: ['secretaria'],
    },
    {
      name: 'Usuários',
      icon: FiUsers,
      to: '/dashboard/secretaria/usuarios',
      users: ['secretaria'],
    },
  ],
} as TTemplateSidebarProps
