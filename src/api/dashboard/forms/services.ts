import http from '../../http'
import {
  TGetTutorialParams,
  TPostTutorialParams,
  TPutTutorialParams,
} from './types'

export const getForms = async () => {
  const response = await http.get('/form')

  return response.data
}

export const getForm = async ({ id }: { id: number }) => {
  const response = await http.get(`/form/${id}`)

  return response.data
}

// export const getTutorial = async ({ id }: TGetTutorialParams) => {
//   const response = await http.get(`/tutorial/${id}`)

//   return response.data
// }

// export const postTutorial = async (params: TPostTutorialParams) => {
//   const response = await http.post('/tutorial/', params)

//   return response.data
// }

// export const putTutorial = async (params: TPutTutorialParams) => {
//   const response = await http.put('/tutorial/', params)

//   return response.data
// }
