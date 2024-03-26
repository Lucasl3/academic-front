import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getNotifications } from './services'
import { TGetNotificationsResponse } from './types'

export const useQueryNotifications = (
  options?: UseQueryOptions<TGetNotificationsResponse>,
) => {
  const queryFunction = () => getNotifications()

  return useQuery<TGetNotificationsResponse>({
    queryKey: useQueryNotifications.queryKey,
    queryFn: queryFunction,
    ...options,
  })
}

useQueryNotifications.queryKey = ['notifications']
