import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getForms, getForm } from './services'
// import {
//   TGetTutorialsResponse,
//   TGetTutorialParams,
//   TGetTutorialResponse,
// } from './types'

export const useQueryForms = (options?: UseQueryOptions<any>) => {
  const queryFunction = () => getForms()

  return useQuery<any>({
    queryKey: useQueryForms.queryKey,
    queryFn: queryFunction,
    ...options,
  })
}

useQueryForms.queryKey = ['forms']

export const useQueryForm = (
  input: { id: number },
  options?: UseQueryOptions<any>,
) => {
  const queryFunction = () => getForm(input)

  return useQuery<any>({
    queryKey: useQueryForm.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQueryForm.queryKey = (input: { id: number }): QueryKey => ['form', input]
