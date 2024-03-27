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

export const getFormulario = async ({ id }: TGetFormularioParams) => {
  const response = await http.get(`/form/${id}`)

  return response.data
}

export const postFormulario = async (params: TPostFormularioParams) => {
  const response = await http.post('/form/', params)

  return response.data
}

export const putFormulario = async (params: TPutFormularioParams) => {
  const response = await http.put('/form/', params)

  return response.data
}
