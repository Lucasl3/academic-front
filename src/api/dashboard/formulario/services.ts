import http from '../../http'
import {
  TGetFormularioParams,
  TPostFormularioParams,
  TPutFormularioParams,
} from './types'

export const getForms = async () => {
  const response = await http.get('/form')

  return response.data
}

export const getTutorial = async ({ id }: TGetFormularioParams) => {
  const response = await http.get(`/tutorial/${id}`)

  return response.data
}

export const postTutorial = async (params: TPostFormularioParams) => {
  const response = await http.post('/tutorial/', params)

  return response.data
}

export const putTutorial = async (params: TPutFormularioParams) => {
  const response = await http.put('/tutorial/', params)

  return response.data
}
