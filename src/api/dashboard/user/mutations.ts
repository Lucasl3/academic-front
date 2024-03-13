import { AxiosError } from 'axios'

import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { postUser, putUser } from './services'
import {
  TPostUserParams,
  TPostUserResponse,
  TPutUserParams,
  TPutUserResponse,
} from './types'

export const useMutationPostUser = (
  options?: UseMutationOptions<TPostUserResponse, AxiosError, TPostUserParams>,
) => {
  const mutationFunction = (params: TPostUserParams) => postUser(params)

  return useMutation<TPostUserResponse, AxiosError, TPostUserParams>({
    mutationFn: mutationFunction,
    ...options,
  })
}

export const useMutationPutUser = (
  options?: UseMutationOptions<TPutUserResponse, AxiosError, TPutUserParams>,
) => {
  const mutationFunction = (params: TPutUserParams) => putUser(params)

  return useMutation<TPutUserResponse, AxiosError, TPutUserParams>({
    mutationFn: mutationFunction,
    ...options,
  })
}
