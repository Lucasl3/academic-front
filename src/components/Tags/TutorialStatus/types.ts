import { IconType } from 'react-icons'

export type status = 'hidden' | 'available' | 'incomplete'

export interface IStatusTag {
  name: string
  icon: IconType
  colorScheme?: string
}

export interface IStatusTagStyles {
  hidden: IStatusTag
  available: IStatusTag
  incomplete: IStatusTag
  default: IStatusTag
}

export interface ITutorialStatusTagProps {
  tag: status
}
