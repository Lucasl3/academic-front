import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getNews, getNew } from './services'
import { TGetNewsResponse, TGetNewParams, TGetNewResponse } from './types'

export const useQueryNews = (options?: UseQueryOptions<TGetNewsResponse>) => {
  const queryFunction = () => getNews()

  return useQuery<TGetNewsResponse>({
    queryKey: useQueryNews.queryKey,
    queryFn: queryFunction,
    ...options,
  })
}

useQueryNews.queryKey = ['news']

export const useQueryNew = (
  input: TGetNewParams,
  options?: UseQueryOptions<TGetNewResponse>,
) => {
  const queryFunction = () => getNew(input)

  return useQuery<TGetNewResponse>({
    queryKey: useQueryNew.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQueryNew.queryKey = (input: TGetNewParams): QueryKey => ['news', input]
