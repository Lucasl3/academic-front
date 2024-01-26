import { IconType } from 'react-icons'

import { status } from '@/components/Tags/TutorialStatus/types'

export interface ITutorialCardProps {
  title: string
  description: string
  to?: string
  statusTag?: status
  tooltipText?: string
}
