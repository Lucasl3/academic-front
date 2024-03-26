import { AxiosError } from 'axios'

import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { updateNotificationStatus } from './services'
import {
  TUpdateNotificationStatusParams,
  TUpdateNotificationStatusResponse,
} from './types'

export const useMutationUpdateNotificationStatus = (
  options?: UseMutationOptions<
    TUpdateNotificationStatusResponse,
    AxiosError,
    TUpdateNotificationStatusParams
  >,
) => {
  const mutationFunction = (params: TUpdateNotificationStatusParams) =>
    updateNotificationStatus(params)

  return useMutation<
    TUpdateNotificationStatusResponse,
    AxiosError,
    TUpdateNotificationStatusParams
  >({
    mutationFn: mutationFunction,
    ...options,
  })
}
