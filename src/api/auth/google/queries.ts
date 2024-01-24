import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { getGoogleUserInfo } from './services'
import { GetGoogleUserInfoParams, GetGoogleUserInfoResponse } from './types'

export const useQueryGoogleUserInfo = (
  input: GetGoogleUserInfoParams,
  options?: UseQueryOptions<GetGoogleUserInfoResponse>,
) => {
  const queryFunction = () => getGoogleUserInfo(input)

  return useQuery<GetGoogleUserInfoResponse>({
    queryKey: useQueryGoogleUserInfo.queryKey(input),
    queryFn: queryFunction,
    ...options,
  })
}

useQueryGoogleUserInfo.queryKey = (
  input: GetGoogleUserInfoParams,
): QueryKey => ['googleUserInfo', input]
