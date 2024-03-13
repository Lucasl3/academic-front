import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getTutorials, getTutorial } from './services'
import {
  TGetTutorialsResponse,
  TGetTutorialParams,
  TGetTutorialResponse,
} from './types'

export const useQueryTutorials = (
  options?: UseQueryOptions<TGetTutorialsResponse>,
) => {
  const queryFunction = () => getTutorials()

  return useQuery<TGetTutorialsResponse>({
    queryKey: useQueryTutorials.queryKey,
    queryFn: queryFunction,
    ...options,
  })
}

useQueryTutorials.queryKey = ['tutorials']

export const useQueryTutorial = (
  input: TGetTutorialParams,
  options?: UseQueryOptions<TGetTutorialResponse>,
) => {
  const queryFunction = () => getTutorial(input)

  return useQuery<TGetTutorialResponse>({
    queryKey: useQueryTutorial.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQueryTutorial.queryKey = (input: TGetTutorialParams): QueryKey => [
  'tutorial',
  input,
]
