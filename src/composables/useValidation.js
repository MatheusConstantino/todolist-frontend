import { ref, computed } from 'vue'

export function useValidation() {
  const errors = ref({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password && password.length >= 6
  }

  const validateRequired = (value) => {
    return value && value.trim().length > 0
  }

  const validateForm = (formData, rules) => {
    errors.value = {}
    let isValid = true

    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = formData[field]

      for (const rule of fieldRules) {
        if (rule.type === 'required' && !validateRequired(value)) {
          errors.value[field] = rule.message
          isValid = false
          break
        }

        if (rule.type === 'email' && value && !validateEmail(value)) {
          errors.value[field] = rule.message
          isValid = false
          break
        }

        if (rule.type === 'password' && value && !validatePassword(value)) {
          errors.value[field] = rule.message
          isValid = false
          break
        }

        if (rule.type === 'confirm' && value !== formData[rule.field]) {
          errors.value[field] = rule.message
          isValid = false
          break
        }
      }
    }

    return isValid
  }

  const clearErrors = () => {
    errors.value = {}
  }

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  return {
    errors,
    validateForm,
    clearErrors,
    hasErrors
  }
}