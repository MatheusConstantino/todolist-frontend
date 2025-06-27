<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Entrar na sua conta
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Ou
        <router-link to="/register" class="font-medium text-cyan-600 hover:text-cyan-500">
          crie uma nova conta
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
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

          <div v-if="userStore.error" class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ userStore.error }}
          </div>

          <BaseButton
            type="submit"
            text="Entrar"
            loading-text="Entrando..."
            :loading="userStore.loading"
            class="w-full"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const userStore = useUserStore()
const errors = ref({})

const form = reactive({
  email: '',
  password: ''
})

const clearErrors = () => {
  errors.value = {}
}

const validateForm = () => {
  clearErrors()
  let isValid = true
  
  if (!form.email) {
    errors.value.email = 'Email é obrigatório'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.value.email = 'Email deve ter um formato válido'
    isValid = false
  }
  
  if (!form.password) {
    errors.value.password = 'Senha é obrigatória'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = async () => {
  userStore.clearError()

  if (!validateForm()) {
    return
  }

  try {
    const result = await userStore.loginUser(form.email, form.password)
    
    if (result.success) {
      const redirectPath = router.currentRoute.value.query.redirect || '/'
      router.push(redirectPath)
    }
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>