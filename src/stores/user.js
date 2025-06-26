import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref([])
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const userCount = computed(() => users.value.length)
  const isLoggedIn = computed(() => !!currentUser.value)

  // Actions
  const addUser = async (userData) => {
    loading.value = true
    error.value = null
    
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar se email já existe
      const emailExists = users.value.some(user => user.email === userData.email)
      if (emailExists) {
        throw new Error('Email já cadastrado')
      }

      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      }
      
      users.value.push(newUser)
      return { success: true, user: newUser }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const loginUser = async (email, password) => {
    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const user = users.value.find(u => u.email === email && u.password === password)
      if (!user) {
        throw new Error('Credenciais inválidas')
      }

      currentUser.value = { ...user }
      delete currentUser.value.password // Não manter senha no estado
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const logoutUser = () => {
    currentUser.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    users,
    currentUser,
    loading,
    error,
    // Getters
    userCount,
    isLoggedIn,
    // Actions
    addUser,
    loginUser,
    logoutUser,
    clearError
  }
})