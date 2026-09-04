import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/services/api'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref<boolean>(!!localStorage.getItem('token'))
  const errorMessage = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true
    errorMessage.value = null

    try {
      const response = await apiClient.post('/api/auth/login', { email, password })

      if (response.status === 200) {
        // Mendukung berbagai format response token (token, Token, data.token, atau raw string)
        const token: string | undefined =
          typeof response.data === 'string'
            ? response.data
            : response.data?.token || response.data?.Token || response.data?.data?.token

        if (token) {
          localStorage.setItem('token', token)
          isAuthenticated.value = true
          return true
        }

        errorMessage.value = 'Format respons token tidak valid.'
        return false
      }

      return false
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data
        if (typeof data === 'string') {
          errorMessage.value = data
        } else if (data && typeof data === 'object') {
          errorMessage.value =
            data.message || data.detail || data.title || data.error || 'Login gagal. Periksa kredensial Anda.'
        } else {
          errorMessage.value = 'Login gagal. Periksa kredensial Anda.'
        }
      } else {
        errorMessage.value = 'Tidak dapat terhubung ke server backend (port 5219).'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    localStorage.removeItem('token')
    isAuthenticated.value = false
  }

  return { isAuthenticated, errorMessage, isLoading, login, logout }
})
