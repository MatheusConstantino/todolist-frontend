import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const isAuthenticated = ref(false)

  // Verificar se já existe token salvo ao inicializar
  const initializeAuth = async () => {
    const savedToken = localStorage.getItem('auth_token')

    if (savedToken) {
      token.value = savedToken
      // Buscar dados do usuário usando o token
      await fetchUserData()
    }
  }

  const loginUser = async (email, password) => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login')
    }

    // Armazenar token e dados do usuário
    token.value = data.data.token
    localStorage.setItem('auth_token', data.data.token)
    user.value = data.data.user
    isAuthenticated.value = true

    return { success: true, user: data.data.user }

  } catch (err) {
    error.value = err.message
    logout() // Limpa os dados em caso de erro
    return { success: false, error: err.message }
  } finally {
    loading.value = false
  }
}

  // Buscar dados do usuário usando a rota /me
  const fetchUserData = async () => {
    if (!token.value) {
      return { success: false, error: 'Token não encontrado' }
    }

    try {
      const response = await fetch('http://localhost:8000/api/me', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token.value}`
        }
      })

      if (response.ok) {
        const responseData = await response.json()
        // A resposta vem com { data: { id, name, email, ... } }
        user.value = responseData.data
        isAuthenticated.value = true
        return { success: true, user: responseData.data }
      } else {
        // Token inválido, limpar dados
        logout()
        return { success: false, error: 'Token inválido' }
      }
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
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao cadastrar usuário')
      }

      // Salvar apenas o token
      token.value = data.token
      localStorage.setItem('auth_token', data.token)

      // Buscar dados do usuário usando /me
      const userResult = await fetchUserData()

      // Garantir que userResult sempre tenha uma estrutura válida
      if (userResult && userResult.success) {
        return { success: true, data, user: userResult.user }
      } else {
        // Mesmo se falhar ao buscar /me, o registro foi bem-sucedido
        // Vamos usar os dados que vieram do registro
        user.value = data.user
        isAuthenticated.value = true
        return { success: true, data, user: data.user }
      }

    } catch (err) {
      error.value = err.message
      // Limpar token se houver erro
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