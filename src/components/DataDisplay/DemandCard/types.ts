export interface IUser {
  name: string
  picture: string
}

export interface IDemandCardProps {
  id: number
  datetime: string
  title: string
  user: IUser
  to?: string
  onClick?: (key: number) => void
}
