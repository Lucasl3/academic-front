import http from '../../http'
import { TUpdateNotificationStatusParams } from './types'

export const getNotifications = async () => {
  const response = await http.get('/notification')

  return response.data
}

export const updateNotificationStatus = async (
  params: TUpdateNotificationStatusParams,
) => {
  const response = await http.patch(
    `/notification/${params.coNotification}/`,
    params,
  )

  return response.data
}
