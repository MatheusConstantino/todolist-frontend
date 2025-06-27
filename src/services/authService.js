const API_BASE_URL = 'http://localhost:8000/api'

export const authService = {
  // Login do usuário
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

    return data
  },

  // Registro de novo usuário
  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
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

    return data
  },

  // Buscar dados do usuário atual
  async getCurrentUser(token) {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Token inválido')
    }

    return data
  },

  // Logout (se houver endpoint específico)
  async logout(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      // Mesmo se falhar, consideramos logout bem-sucedido localmente
      return true
    } catch (error) {
      // Se não houver endpoint de logout ou falhar, ainda fazemos logout local
      return true
    }
  }
}
