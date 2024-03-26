import { AxiosError } from 'axios'

import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import {
  deleteSolicitation,
  postFormMessage,
  postSolicitation,
  updateStatusSolicitation,
} from './services'
import {
  TPostSolicitationParams,
  TPostSolicitationResponse,
  TPutSolicitationParams,
  TPutSolicitationResponse,
} from './types'

export const useMutationPostSolicitation = (
  options?: UseMutationOptions<
    TPostSolicitationResponse,
    AxiosError,
    TPostSolicitationParams
  >,
) => {
  const mutationFunction = (params: TPostSolicitationParams) =>
    postSolicitation(params)

  return useMutation<
    TPostSolicitationResponse,
    AxiosError,
    TPostSolicitationParams
  >({
    mutationFn: mutationFunction,
    ...options,
  })
}

export const useMutationUpdateStatusSolicitation = (
  options?: UseMutationOptions<
    TPutSolicitationResponse,
    AxiosError,
    TPutSolicitationParams
  >,
) => {
  const mutationFunction = (params: any) => updateStatusSolicitation(params)

  return useMutation<any, AxiosError, any>({
    mutationFn: mutationFunction,
    ...options,
  })
}

export const useMutationDeleteSolicitation = (
  options?: UseMutationOptions<any, AxiosError, any>,
) => {
  const mutationFunction = ({ id }: { id: number }) =>
    deleteSolicitation({ id })

  return useMutation<any, AxiosError, any>({
    mutationFn: mutationFunction,
    ...options,
  })
}

export const useMutationPostFormMessage = (
  options?: UseMutationOptions<any, AxiosError, any>,
) => {
  const mutationFunction = (params: any) => postFormMessage(params)

  return useMutation<any, AxiosError, any>({
    mutationFn: mutationFunction,
    ...options,
  })
}
