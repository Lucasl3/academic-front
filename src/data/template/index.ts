import { FiHome, FiTrendingUp, FiCompass } from 'react-icons/fi'

import { TTemplateSidebarProps } from './types'

export const sidebarProps = {
  linkItems: [
    { name: 'Home', icon: FiHome, to: '/dashboard/home' },
    { name: 'Secretaria', icon: FiTrendingUp, to: '/dashboard/secretaria' },
    { name: 'Alunos', icon: FiCompass, to: '/dashboard/aluno' },
  ],
} as TTemplateSidebarProps
