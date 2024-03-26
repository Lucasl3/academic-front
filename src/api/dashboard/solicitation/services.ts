import http from '../../http'
import {
  TGetSolicitationParams,
  TPostSolicitationParams,
  TPutSolicitationParams,
} from './types'

export const getSolicitations = async () => {
  const response = await http.get('/solicitation')

  return response.data
}

export const getSolicitation = async ({ id }: { id: number }) => {
  const response = await http.get(`/solicitation/${id}`)

  return response.data
}

export const getSolicitationByUser = async ({ id }: { id: number }) => {
  const response = await http.get(`/solicitation/list_by_user/?co_user=${id}`)

  return response.data
}

export const postSolicitation = async (params: TPostSolicitationParams) => {
  const response = await http.post('/solicitation/', params)

  return response.data
}

// export const putTutorial = async (params: TPutTutorialParams) => {
//   const response = await http.put('/tutorial/', params)

//   return response.data
// }
