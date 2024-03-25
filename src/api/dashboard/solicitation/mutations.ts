import { AxiosError } from 'axios'

import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { postSolicitation } from './services'
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

// // export const useMutationPutTutorial = (
// //   options?: UseMutationOptions<
// //     TPutTutorialResponse,
// //     AxiosError,
// //     TPutTutorialParams
// //   >,
// // ) => {
// //   const mutationFunction = (params: TPutTutorialParams) => putTutorial(params)

// //   return useMutation<TPutTutorialResponse, AxiosError, TPutTutorialParams>({
// //     mutationFn: mutationFunction,
// //     ...options,
// //   })
// // }
