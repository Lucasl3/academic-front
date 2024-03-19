import { IconType } from 'react-icons'

import { status } from '@/components/Tags/RequestStatus/types'

export interface IRequestCardProps {
  title: string
  date: string
  to?: string
  tooltipText?: string
  status?: status
}
