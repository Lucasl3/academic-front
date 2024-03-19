export interface IGetUserDTO {
  coUser: number
  noUser: string
  dsEmail: string
  coProfile: 1 | 2
  coRegistration: string
  dsPassword: string
  dsPhone: string
  dtCreate_at: string
  dtUpdate_at: string
  dtDelete_at: string
  isDeleted: boolean
}

export interface IUserDTOBase {
  noUser: string
  coProfile: number
  dsEmail: string
  coRegistration?: string
  dsPassword?: string
  dsPhone?: string
}

export interface IPostUserDTO extends IUserDTOBase {}

export interface IPutUserDTO extends IUserDTOBase {
  coUser: number
}

export type TGetUserParams = { id: number }
export type TGetUsersParams = { search: string }
export type TGetUsersResponse = Array<IGetUserDTO>
export type TGetUserResponse = IGetUserDTO
export type TPostUserParams = IPostUserDTO
export type TPostUserResponse = IGetUserDTO
export type TPutUserParams = IPutUserDTO
export type TPutUserResponse = IGetUserDTO
