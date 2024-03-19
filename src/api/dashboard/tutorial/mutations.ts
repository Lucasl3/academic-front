import { AxiosError } from 'axios'

import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { postTutorial, putTutorial } from './services'
import {
  TPostTutorialParams,
  TPostTutorialResponse,
  TPutTutorialParams,
  TPutTutorialResponse,
} from './types'

export const useMutationPostTutorial = (
  options?: UseMutationOptions<
    TPostTutorialResponse,
    AxiosError,
    TPostTutorialParams
  >,
) => {
  const mutationFunction = (params: TPostTutorialParams) => postTutorial(params)

  return useMutation<TPostTutorialResponse, AxiosError, TPostTutorialParams>({
    mutationFn: mutationFunction,
    ...options,
  })
}

export const useMutationPutTutorial = (
  options?: UseMutationOptions<
    TPutTutorialResponse,
    AxiosError,
    TPutTutorialParams
  >,
) => {
  const mutationFunction = (params: TPutTutorialParams) => putTutorial(params)

  return useMutation<TPutTutorialResponse, AxiosError, TPutTutorialParams>({
    mutationFn: mutationFunction,
    ...options,
  })
}
