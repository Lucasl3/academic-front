export interface IGetGoogleUserInfoDTO {
  email: string
  family_name: string
  given_name: string
  hd: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: boolean
}

export type GetGoogleUserInfoParams = { accessToken: string }
export type GetGoogleUserInfoResponse = IGetGoogleUserInfoDTO
