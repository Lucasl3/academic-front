import { IconType } from 'react-icons'

export type status = 'done' | 'in_progress' | 'received' | 'viewed'

export interface IRequestTag {
  name: string
  icon: IconType
  colorScheme?: string
}

export interface IRequestTagStyles {
  done: IRequestTag
  in_progress: IRequestTag
  received: IRequestTag
  viewed: IRequestTag
  default: IRequestTag
}

export interface IRequestStatusTagProps {
  tag: status
  openUntil?: string
}
