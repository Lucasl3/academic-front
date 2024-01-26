import { ReactNode } from 'react'

import { TabsProps } from '@chakra-ui/react'

export interface ITabItem {
  id: string
  label: string
  render?: () => ReactNode
}

export interface ITabsProps extends Omit<TabsProps, 'children'> {
  items: Array<ITabItem>
  initialTab?: string
  onTabClick?: (id: string) => void
}
