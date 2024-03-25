import http from '../../http'
// import {
//   TGetTutorialParams,
//   TPostTutorialParams,
//   TPutTutorialParams,
// } from './types'

export const getForms = async () => {
  const response = await http.get('/form')

  return response.data
}

export const getForm = async ({ id }: { id: number }) => {
  const response = await http.get(`/form/${id}`)

  return response.data
}

// export const postSolicitation = async (params: any) => {
//   const response = await http.post('/solicitation/', params)

//   return response.data
// }

// export const putTutorial = async (params: TPutTutorialParams) => {
//   const response = await http.put('/tutorial/', params)

//   return response.data
// }
