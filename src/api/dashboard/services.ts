import http from '../http'
import {
  TGetTutorialParams,
  TPostTutorialParams,
  TPutTutorialParams,
} from './types'

export const getTutorials = async () => {
  const response = await http.get('/tutorial')

  return response.data
}

export const getTutorial = async ({ id }: TGetTutorialParams) => {
  const response = await http.get(`/tutorial/${id}`)

  return response.data
}

export const postTutorial = async (params: TPostTutorialParams) => {
  const response = await http.post('/tutorial/', params)

  return response.data
}

export const putTutorial = async (params: TPutTutorialParams) => {
  const response = await http.put('/tutorial/', params)

  return response.data
}
