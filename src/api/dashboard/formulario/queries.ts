import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getForms, getTutorial } from './services'
import {
  TGetFormsResponse,
  TGetFormularioParams,
  TGetFormularioResponse,
} from './types'

export const useQueryForms = (options?: UseQueryOptions<TGetFormsResponse>) => {
  const queryFunction = () => getForms()

  return useQuery<TGetFormsResponse>({
    queryKey: useQueryForms.queryKey,
    queryFn: queryFunction,
    ...options,
  })
}

useQueryForms.queryKey = ['forms']

export const useQueryTutorial = (
  input: TGetFormularioParams,
  options?: UseQueryOptions<TGetFormularioResponse>,
) => {
  const queryFunction = () => getTutorial(input)

  return useQuery<TGetFormularioResponse>({
    queryKey: useQueryTutorial.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQueryTutorial.queryKey = (input: TGetFormularioParams): QueryKey => [
  'formulario',
  input,
]
