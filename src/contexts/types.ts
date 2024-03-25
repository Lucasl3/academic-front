export interface IUserProps {
  co_user: number
  email: string
  name: string
  picture: string
  admin: boolean
  family_name?: string
  given_name?: string
  hd?: string
  id?: string
  locale?: string
  verified_email?: boolean
}

export interface ISidebarProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  width: number
}

export interface IContextProps {
  sidebar: ISidebarProps
  user: IUserProps
  setUser: (user: IUserProps) => void
}
