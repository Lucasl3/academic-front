import axios from 'axios'

import { GetGoogleUserInfoParams } from './types'

export const getGoogleUserInfo = async ({
  accessToken,
}: GetGoogleUserInfoParams) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
  )

  return response.data
}
