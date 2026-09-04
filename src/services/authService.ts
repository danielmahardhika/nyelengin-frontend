import apiClient from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  message?: string
}

export const authService = {
  login(data: LoginRequest) {
    return apiClient.post<AuthResponse>('/api/auth/login', data)
  },
}

export default authService

