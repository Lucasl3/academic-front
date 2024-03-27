import { IconType } from 'react-icons'

import { BoxProps, FlexProps } from '@chakra-ui/react'

export interface ISidebarProps extends React.PropsWithChildren {
  linkItems: Array<ILinkItem>
  includeMobileHeader?: boolean
}

export interface ILinkItem {
  name: string
  icon: IconType
  to: string
  users: string[]
}

export interface INavItemProps extends FlexProps {
  name: string
  to: string
  icon: IconType
}

export interface IMobileProps extends FlexProps {}

export interface ISidebarContentProps extends BoxProps {
  linkItems: Array<ILinkItem>
}
