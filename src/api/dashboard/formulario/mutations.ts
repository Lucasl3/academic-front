import { AxiosError } from 'axios'

import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { postFormulario, putFormulario } from './services'
import {
  TPostFormularioParams,
  TPostFormularioResponse,
  TPutFormularioParams,
  TPutFormularioResponse,
} from './types'

export const useMutationPostFormulario = (
  options?: UseMutationOptions<
    TPostFormularioResponse,
    AxiosError,
    TPostFormularioParams
  >,
) => {
  const mutationFunction = (params: TPostFormularioParams) =>
    postFormulario(params)

  return useMutation<
    TPostFormularioResponse,
    AxiosError,
    TPostFormularioParams
  >({
    mutationFn: mutationFunction,
    ...options,
  })
}

export const useMutationPutFormulario = (
  options?: UseMutationOptions<
    TPutFormularioResponse,
    AxiosError,
    TPutFormularioParams
  >,
) => {
  const mutationFunction = (params: TPutFormularioParams) =>
    putFormulario(params)

  return useMutation<TPutFormularioResponse, AxiosError, TPutFormularioParams>({
    mutationFn: mutationFunction,
    ...options,
  })
}
