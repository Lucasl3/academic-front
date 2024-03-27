import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getForms, getFormulario } from './services'
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

export const useQueryFormulario = (
  input: TGetFormularioParams,
  options?: UseQueryOptions<TGetFormularioResponse>,
) => {
  const queryFunction = () => getFormulario(input)

  return useQuery<TGetFormularioResponse>({
    queryKey: useQueryFormulario.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQueryFormulario.queryKey = (input: TGetFormularioParams): QueryKey => [
  'formulario',
  input,
]
