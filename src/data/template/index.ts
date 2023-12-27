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
    { name: 'Trending', icon: FiTrendingUp, to: '/' },
    { name: 'Explore', icon: FiCompass, to: '/' },
    { name: 'Favourites', icon: FiStar, to: '/' },
    { name: 'Settings', icon: FiSettings, to: '/' },
  ],
} as TTemplateSidebarProps
