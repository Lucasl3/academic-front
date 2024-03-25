import React, { createContext } from 'react'

import { useDisclosure } from '@chakra-ui/react'

import { IContextProps } from './types'

export const AppContext = createContext<IContextProps>({
  sidebar: {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    width: 48,
  },
  user: {
    co_user: 0,
    email: '',
    name: '',
    picture: '',
    admin: false,
  },
  setUser: () => {},
})

function AppContextProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState<IContextProps['user']>({
    co_user: 0,
    email: '',
    name: '',
    picture: '',
    admin: false,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const sidebarWidth = 48

  const value = {
    sidebar: {
      isOpen,
      onOpen,
      onClose,
      width: sidebarWidth,
    },
    user,
    setUser,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider
