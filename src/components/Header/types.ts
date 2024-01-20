import { FlexProps } from '@chakra-ui/react'

export interface IHeaderProps extends FlexProps {
  loggedUser?: Record<string, string>
  onOpen?: () => void
}
