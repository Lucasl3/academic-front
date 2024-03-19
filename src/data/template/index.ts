import { FiHome, FiTrendingUp, FiCompass } from 'react-icons/fi'

import { TTemplateSidebarProps } from './types'

export const sidebarProps = {
  linkItems: [
    {
      name: 'Home',
      icon: FiHome,
      to: '/dashboard/home',
      protected: false,
    },
    {
      name: 'Secretaria',
      icon: FiTrendingUp,
      to: '/dashboard/secretaria',
      protected: true,
    },
    {
      name: 'Alunos',
      icon: FiCompass,
      to: '/dashboard/aluno',
      protected: false,
    },
  ],
} as TTemplateSidebarProps
