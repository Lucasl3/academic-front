import axios from 'axios'

import {
  TGetTutorialParams,
  TPostTutorialParams,
  TPutTutorialParams,
} from './types'

export const getTutorials = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/tutorial`)

  return response.data
}

export const getTutorial = async ({ id }: TGetTutorialParams) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/tutorial/${id}`,
  )

  return response.data
}

export const postTutorial = async (params: TPostTutorialParams) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/tutorial/`,
    params,
  )

  return response.data
}

export const putTutorial = async (params: TPutTutorialParams) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_URL}/tutorial/`,
    params,
  )

  return response.data
}
