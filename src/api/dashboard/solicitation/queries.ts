import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getSolicitations, getSolicitation } from './services'
// import {
//   TGetTutorialsResponse,
//   TGetTutorialParams,
//   TGetTutorialResponse,
// } from './types'

export const useQuerySolicitations = (options?: UseQueryOptions<any>) => {
  const queryFunction = () => getSolicitations()

  return useQuery<any>({
    queryKey: useQuerySolicitations.queryKey,
    queryFn: queryFunction,
    ...options,
  })
}

useQuerySolicitations.queryKey = ['solicitations']

export const useQuerySolicitation = (
  input: { id: number },
  options?: UseQueryOptions<any>,
) => {
  const queryFunction = () => getSolicitation(input)

  return useQuery<any>({
    queryKey: useQuerySolicitation.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQuerySolicitation.queryKey = (input: { id: number }): QueryKey => [
  'solicitation',
  input,
]
