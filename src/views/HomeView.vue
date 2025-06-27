<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <h1 class="text-3xl font-bold text-gray-900">
            Todo List
          </h1>
          
          <div v-if="userStore.isAuthenticated && userStore.user" class="flex items-center space-x-4">
            <span class="text-gray-700">
              Olá, <strong>{{ userStore.user.name }}</strong>!
            </span>
            <BaseButton
              variant="secondary"
              text="Sair"
              @click="handleLogout"
            />
          </div>
          
          <div v-else class="space-x-2">
            <router-link 
              to="/login"
              class="text-blue-600 hover:text-blue-500 font-medium"
            >
              Login
            </router-link>
            <router-link 
              to="/register"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Cadastrar
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading state -->
    <div v-if="userStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-2 text-gray-600">Carregando...</span>
    </div>

    <!-- Conteúdo principal -->
    <main v-else class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div v-if="userStore.isAuthenticated && userStore.user" class="px-4 py-6 sm:px-0">
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">
            Bem-vindo ao seu Todo List, {{ userStore.user.name }}!
          </h2>
          
          <!-- Formulário de criação de tarefa -->
          <TodoForm @todo-created="handleTodoCreated" />
          
          <!-- Lista de tarefas -->
          <TodoList :refresh-trigger="refreshTrigger" />
        </div>
      </div>
      
      <div v-else class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              Faça login para acessar suas tarefas
            </h2>
            <div class="space-x-4">
              <router-link 
                to="/register"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-block"
              >
                Criar conta
              </router-link>
              <router-link 
                to="/login"
                class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium inline-block"
              >
                Fazer login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BaseButton from '@/components/BaseButton.vue'
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'

const router = useRouter()
const userStore = useUserStore()

// Controle para atualizar a lista de todos
const refreshTrigger = ref(0)

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

const handleTodoCreated = (newTodo) => {
  // Incrementar o trigger para forçar atualização da lista
  refreshTrigger.value++
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>