import http from '../../http'
import { TGetNewParams, TPostNewParams, TPutNewParams } from './types'

export const getNews = async () => {
  const response = await http.get('/news')

  return response.data
}

export const getNew = async ({ id }: TGetNewParams) => {
  const response = await http.get(`/news/${id}`)

  return response.data
}

export const postTutorial = async (params: TPostNewParams) => {
  const response = await http.post('/news/', params)

  return response.data
}

export const putTutorial = async (params: TPutNewParams) => {
  const response = await http.put('/news/', params)

  return response.data
}
