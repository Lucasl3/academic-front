export interface INotificationDTO {
  coNotification: number
  dtCreatedAt: string
  dtUpdatedAt: string
  dtDeletedAt: string
  isDeleted: boolean
  dsNotification: string
  coStatus: number
  dsLink: string
  ncoUser: Array<number>
}

export type TGetNotificationsResponse = Array<INotificationDTO>
export type TUpdateNotificationStatusParams = {
  coNotification: number
  coStatus: number
}
export type TUpdateNotificationStatusResponse = INotificationDTO
