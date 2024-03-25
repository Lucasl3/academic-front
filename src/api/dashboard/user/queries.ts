import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getUsers, getUser } from './services'
import { TGetUsersParams, TGetUsersResponse } from './types'

export const useQueryUsers = (
  input: TGetUsersParams,
  options?: UseQueryOptions<TGetUsersResponse>,
) => {
  const queryFunction = () => getUsers(input ?? { search: '' })

  return useQuery<TGetUsersResponse>({
    queryKey: useQueryUsers.queryKey,
    queryFn: queryFunction,
    ...options,
  })
}

useQueryUsers.queryKey = ['users']

export const useQueryUser = (
  input: { id: number },
  options?: UseQueryOptions<any>,
) => {
  const queryFunction = () => getUser(input)

  return useQuery<any>({
    queryKey: useQueryUser.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQueryUser.queryKey = (input: { id: number }): QueryKey => ['user', input]
