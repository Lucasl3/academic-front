import { IGetUserDTO } from '@/api/dashboard/user/types'

export interface IAdminSwitchProps {
  user: IGetUserDTO
  isAdmin: boolean
  onSuccess?: () => void
}
