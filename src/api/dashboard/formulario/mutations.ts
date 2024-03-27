import { AxiosError } from 'axios'

import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { postTutorial, putTutorial } from './services'
import {
  TPostFormularioParams,
  TPostFormularioResponse,
  TPutFormularioParams,
  TPutFormularioResponse,
} from './types'

export const useMutationPostTutorial = (
  options?: UseMutationOptions<
    TPostFormularioResponse,
    AxiosError,
    TPostFormularioParams
  >,
) => {
  const mutationFunction = (params: TPostFormularioParams) =>
    postTutorial(params)

  return useMutation<
    TPostFormularioResponse,
    AxiosError,
    TPostFormularioParams
  >({
    mutationFn: mutationFunction,
    ...options,
  })
}

export const useMutationPutTutorial = (
  options?: UseMutationOptions<
    TPutFormularioResponse,
    AxiosError,
    TPutFormularioParams
  >,
) => {
  const mutationFunction = (params: TPutFormularioParams) => putTutorial(params)

  return useMutation<TPutFormularioResponse, AxiosError, TPutFormularioParams>({
    mutationFn: mutationFunction,
    ...options,
  })
}
