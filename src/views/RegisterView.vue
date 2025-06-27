<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Criar nova conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <router-link 
            to="/login" 
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            faça login se já tem uma conta
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="userStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ userStore.error }}
        </div>

        <BaseInput
          id="name"
          v-model="form.name"
          label="Nome completo"
          type="text"
          placeholder="Digite seu nome completo"
          required
          :error="errors.name"
          @blur="validateName"
        />

        <BaseInput
          id="email"
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="Digite seu email"
          required
          :error="errors.email"
          @blur="validateEmailField"
        />

        <BaseInput
          id="password"
          v-model="form.password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          required
          :error="errors.password"
          @blur="validatePasswordField"
        />

        <BaseInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          label="Confirmar senha"
          type="password"
          placeholder="Confirme sua senha"
          required
          :error="errors.password_confirmation"
          @blur="validatePasswordConfirmationField"
        />

        <BaseButton
          type="submit"
          variant="primary"
          :loading="userStore.loading"
          :disabled="hasErrors || !isFormValid"
          text="Criar conta"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useValidation } from '@/composables/useValidation'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const userStore = useUserStore()
const { 
  errors, 
  hasErrors, 
  validateRequired, 
  validateEmail, 
  validatePassword, 
  validatePasswordConfirmation,
  setError,
  clearError,
  clearAllErrors
} = useValidation()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const isFormValid = computed(() => {
  return form.name && 
         form.email && 
         form.password && 
         form.password_confirmation &&
         !hasErrors.value
})

const validateName = () => {
  const error = validateRequired(form.name, 'Nome')
  if (error) {
    setError('name', error)
  } else {
    clearError('name')
  }
}

const validateEmailField = () => {
  const requiredError = validateRequired(form.email, 'Email')
  if (requiredError) {
    setError('email', requiredError)
    return
  }
  
  const emailError = validateEmail(form.email)
  if (emailError) {
    setError('email', emailError)
  } else {
    clearError('email')
  }
}

const validatePasswordField = () => {
  const error = validateRequired(form.password, 'Senha')
  if (error) {
    setError('password', error)
    return
  }
  
  const passwordError = validatePassword(form.password)
  if (passwordError) {
    setError('password', passwordError)
  } else {
    clearError('password')
  }
}

const validatePasswordConfirmationField = () => {
  const error = validateRequired(form.password_confirmation, 'Confirmação de senha')
  if (error) {
    setError('password_confirmation', error)
    return
  }
  
  const confirmationError = validatePasswordConfirmation(form.password, form.password_confirmation)
  if (confirmationError) {
    setError('password_confirmation', confirmationError)
  } else {
    clearError('password_confirmation')
  }
}

const handleSubmit = async () => {
  // Limpar erros anteriores
  userStore.clearError()
  clearAllErrors()
  
  // Validar todos os campos
  validateName()
  validateEmailField()
  validatePasswordField()
  validatePasswordConfirmationField()
  
  if (hasErrors.value) {
    return
  }

  const result = await userStore.register(form)
  
  if (result.success) {
    // Redirecionar para dashboard ou página inicial
    router.push('/')
  }
}
</script>