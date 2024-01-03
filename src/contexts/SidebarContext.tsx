import React, { createContext } from 'react'

import { useDisclosure } from '@chakra-ui/react'

export const SidebarContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  sidebarWidth: 48,
})

function SidebarContextProvider({ children }: React.PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const sidebarWidth = 48

  return (
    <SidebarContext.Provider
      value={{
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
        sidebarWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider
