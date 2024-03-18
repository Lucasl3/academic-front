import { FlexProps } from '@chakra-ui/react'

import { IUserProps } from '@/contexts/types'
export interface IHeaderProps extends FlexProps {
  loggedUser?: IUserProps
  onOpen?: () => void
}
