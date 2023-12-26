import React, { createContext } from 'react'

import { useDisclosure } from '@chakra-ui/react'

export const SidebarContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
})

function SidebarContextProvider({ children }: React.PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <SidebarContext.Provider
      value={{ isOpen: isOpen, onOpen: onOpen, onClose: onClose }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider
