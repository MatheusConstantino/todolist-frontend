<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Todo Frontend</h1>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="userStore.isLoggedIn">
              <span class="text-gray-700">Olá, {{ userStore.currentUser.name }}</span>
              <router-link
                to="/dashboard"
                class="text-cyan-600 hover:text-cyan-500 font-medium"
              >
                Dashboard
              </router-link>
              <BaseButton
                text="Sair"
                variant="secondary"
                size="sm"
                @click="handleLogout"
              />
            </template>
            <template v-else>
              <router-link
                to="/login"
                class="text-cyan-600 hover:text-cyan-500 font-medium"
              >
                Entrar
              </router-link>
              <router-link
                to="/register"
                class="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cadastrar
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <img src="/vite.svg" class="h-7 sm:h-8" alt="Vite logo" />
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h1 class="text-2xl font-bold text-gray-900">Sistema de Cadastro</h1>
                  <p>Sistema completo com Vue 3, Pinia e Vue Router!</p>
                  <ul class="list-disc space-y-2">
                    <li class="flex items-start">
                      <span class="h-6 flex items-center sm:h-7">
                        <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      <p class="ml-2">Cadastro e login de usuários</p>
                    </li>
                    <li class="flex items-start">
                      <span class="h-6 flex items-center sm:h-7">
                        <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      <p class="ml-2">Gerenciamento de estado com Pinia</p>
                    </li>
                    <li class="flex items-start">
                      <span class="h-6 flex items-center sm:h-7">
                        <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      <p class="ml-2">Roteamento protegido</p>
                    </li>
                  </ul>
                </div>
                <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p>{{ userStore.userCount }} usuários cadastrados</p>
                  <div class="mt-4 space-x-4">
                    <router-link
                      v-if="!userStore.isLoggedIn"
                      to="/register"
                      class="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Começar agora!
                    </router-link>
                    <router-link
                      v-else
                      to="/dashboard"
                      class="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Ir para Dashboard
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.logoutUser()
  router.push('/')
}
</script>