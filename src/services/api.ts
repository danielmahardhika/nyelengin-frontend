import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5219',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — sisipkan Bearer token jika ada di localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default apiClient

