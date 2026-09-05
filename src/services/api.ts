import axios, { type InternalAxiosRequestConfig } from 'axios'

// Instance Axios untuk backend C# (UserService - port 5219)
const apiClient = axios.create({
  baseURL: 'http://localhost:5219',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Instance Axios untuk backend Java Spring Boot (LedgerService - port 8080)
export const ledgerApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — otomatis menyisipkan header Authorization jika token ada di localStorage
const attachAuthToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

apiClient.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error))
ledgerApi.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error))

export default apiClient
