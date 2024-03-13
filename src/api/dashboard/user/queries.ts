import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query'

import { getUsers } from './services'
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
