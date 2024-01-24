import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const http = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  }),
)

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  config.headers.Authorization = token ? `Bearer ${token}` : ''

  return config
})

export default http
