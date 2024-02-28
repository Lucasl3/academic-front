import React, { createContext } from 'react'

import { useDisclosure } from '@chakra-ui/react'

export const AppContext = createContext({
  sidebar: {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    width: 48,
  },
})

function AppContextProvider({ children }: React.PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const sidebarWidth = 48

  const value = {
    sidebar: {
      isOpen,
      onOpen,
      onClose,
      width: sidebarWidth,
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContextProvider
