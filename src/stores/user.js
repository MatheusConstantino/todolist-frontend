import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/authService'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(true) 
  const error = ref(null)
  const isAuthenticated = ref(false)

  // Verificar se já existe token salvo ao inicializar
const initializeAuth = async () => {
  const savedToken = localStorage.getItem('auth_token')
  
  if (savedToken) {
    token.value = savedToken
    try {
      await fetchUserData()
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      logout()
    }
  }
  
  loading.value = false
}

const loginUser = async (email, password) => {
  loading.value = true
  error.value = null

  try {
    const data = await authService.login(email, password)

    token.value = data.data.token
    localStorage.setItem('auth_token', data.data.token)
    user.value = data.data.user
    isAuthenticated.value = true

    return { success: true, user: data.data.user }

  } catch (err) {
    error.value = err.message
    logout()
    return { success: false, error: err.message }
  } finally {
    loading.value = false
  }
}

  // Buscar dados do usuário 
  const fetchUserData = async () => {
    if (!token.value) {
      return { success: false, error: 'Token não encontrado' }
    }

    try {
      const responseData = await authService.getCurrentUser(token.value)
      
      user.value = responseData.data
      isAuthenticated.value = true
      return { success: true, user: responseData.data }
      
    } catch (err) {
      console.error('Erro ao buscar dados do usuário:', err)
      logout()
      return { success: false, error: err.message }
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const data = await authService.register(userData)

      // Salvar o token
      token.value = data.token
      localStorage.setItem('auth_token', data.token)

      // Buscar dados do usuário 
      const userResult = await fetchUserData()

      if (userResult && userResult.success) {
        return { success: true, data, user: userResult.user }
      } else {
        user.value = data.user
        isAuthenticated.value = true
        return { success: true, data, user: data.user }
      }

    } catch (err) {
      error.value = err.message
      token.value = null
      localStorage.removeItem('auth_token')
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('auth_token')
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    loginUser,
    register,
    logout,
    clearError,
    initializeAuth,
    fetchUserData
  }
})