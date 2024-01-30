import { IconType } from 'react-icons'

export type status = 'closed' | 'available'

export interface IFormularioTag {
  name: string
  icon: IconType
  colorScheme?: string
}

export interface IFormularioTagStyles {
  closed: IFormularioTag
  available: IFormularioTag
  default: IFormularioTag
}

export interface IFormularioStatusTagProps {
  tag: status
  openUntil?: string
}
