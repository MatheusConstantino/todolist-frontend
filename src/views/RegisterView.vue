<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Criar nova conta
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Ou
        <router-link to="/login" class="font-medium text-cyan-600 hover:text-cyan-500">
          faça login na sua conta existente
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <BaseInput
            id="name"
            label="Nome completo"
            v-model="form.name"
            placeholder="Digite seu nome completo"
            required
            :error="errors.name"
          />

          <BaseInput
            id="email"
            label="Email"
            type="email"
            v-model="form.email"
            placeholder="Digite seu email"
            required
            :error="errors.email"
          />

          <BaseInput
            id="password"
            label="Senha"
            type="password"
            v-model="form.password"
            placeholder="Digite sua senha"
            required
            :error="errors.password"
          />

          <BaseInput
            id="confirmPassword"
            label="Confirmar senha"
            type="password"
            v-model="form.confirmPassword"
            placeholder="Confirme sua senha"
            required
            :error="errors.confirmPassword"
          />

          <div v-if="userStore.error" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ userStore.error }}
          </div>

          <BaseButton
            type="submit"
            text="Criar conta"
            loading-text="Criando conta..."
            :loading="userStore.loading"
            class="w-full"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useValidation } from '@/composables/useValidation'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const userStore = useUserStore()
const { errors, validateForm, clearErrors } = useValidation()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validationRules = {
  name: [
    { type: 'required', message: 'Nome é obrigatório' }
  ],
  email: [
    { type: 'required', message: 'Email é obrigatório' },
    { type: 'email', message: 'Email deve ter um formato válido' }
  ],
  password: [
    { type: 'required', message: 'Senha é obrigatória' },
    { type: 'password', message: 'Senha deve ter pelo menos 6 caracteres' }
  ],
  confirmPassword: [
    { type: 'required', message: 'Confirmação de senha é obrigatória' },
    { type: 'confirm', field: 'password', message: 'Senhas não coincidem' }
  ]
}

const handleSubmit = async () => {
  clearErrors()
  userStore.clearError()

  if (!validateForm(form, validationRules)) {
    return
  }

  const result = await userStore.addUser({
    name: form.name,
    email: form.email,
    password: form.password
  })

  if (result.success) {
    router.push('/login')
  }
}
</script>