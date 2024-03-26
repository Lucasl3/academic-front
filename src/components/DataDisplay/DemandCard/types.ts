import { status } from '@/components/Tags/RequestStatus/types'
export interface IUser {
  name: string
  picture: string
}

export interface IDemandCardProps {
  id: number
  datetime: string
  title: string
  status: status
  user: IUser
  to?: string
  onClick?: (key: number) => void
}
