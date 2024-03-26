import { IconType } from 'react-icons'

import { status } from '@/components/Tags/FormularioStatus/types'

export interface IFormularioCardProps {
  title: string
  description: string
  date: string
  to: string
  statusTag?: status
  tooltipText?: string
  isClosed?: boolean
}
