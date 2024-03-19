import http from '../../http'
import {
  TGetUserParams,
  TPutUserParams,
  TPostUserParams,
  TGetUsersParams,
  IPostLoginParams,
} from './types'

export const getUsers = async ({ search }: TGetUsersParams) => {
  const response = await http.get(`/user/?search=${search}`)

  return response.data
}

export const getUser = async ({ id }: TGetUserParams) => {
  const response = await http.get(`/user/${id}`)

  return response.data
}

export const postUser = async (params: TPostUserParams) => {
  const response = await http.post('/user/', params)

  return response.data
}

export const putUser = async (params: TPutUserParams) => {
  const response = await http.put('/user/', params)

  return response.data
}

export const postLogin = async (params: IPostLoginParams) => {
  const response = await http.post('/user/login/', params)

  return response.data
}
