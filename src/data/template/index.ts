import React, { useContext } from 'react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi'

import { TTemplateSidebarProps } from './types'

export const sidebarProps = {
  linkItems: [
    { name: 'Home', icon: FiHome, to: '/' },
    { name: 'Trending', icon: FiTrendingUp, to: '/teste1' },
    { name: 'Explore', icon: FiCompass, to: '/teste2' },
    { name: 'Favourites', icon: FiStar, to: '/teste3' },
    { name: 'Settings', icon: FiSettings, to: '/teste4' },
  ],
} as TTemplateSidebarProps
