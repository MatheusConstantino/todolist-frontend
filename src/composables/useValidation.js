import { ref, computed } from 'vue'

export function useValidation() {
  const errors = ref({})

  const validateRequired = (value, fieldName) => {
    if (!value || value.trim() === '') {
      return `${fieldName} é obrigatório`
    }
    return null
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Email deve ter um formato válido'
    }
    return null
  }

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Senha deve ter pelo menos 8 caracteres'
    }
    return null
  }

  const validatePasswordConfirmation = (password, confirmation) => {
    if (password !== confirmation) {
      return 'Confirmação de senha não confere'
    }
    return null
  }

  const setError = (field, message) => {
    errors.value[field] = message
  }

  const clearError = (field) => {
    delete errors.value[field]
  }

  const clearAllErrors = () => {
    errors.value = {}
  }

  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0
  })

  return {
    errors,
    hasErrors,
    validateRequired,
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    setError,
    clearError,
    clearAllErrors
  }
}