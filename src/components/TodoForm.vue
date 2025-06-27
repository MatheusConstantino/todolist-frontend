<template>
  <div class="bg-white rounded-lg shadow-md mb-6">
    <!-- Header do Accordion -->
    <div 
      @click="toggleForm"
      class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <h3 class="text-lg font-semibold text-gray-900">
        Criar Nova Tarefa
      </h3>
      <svg 
        :class="['w-5 h-5 text-gray-500 transition-transform duration-200', { 'rotate-180': isExpanded }]"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Conteúdo do Accordion -->
    <div 
      v-show="isExpanded"
      class="border-t border-gray-200 p-6"
    >
    
    <form @submit.prevent="submitTodo" class="space-y-4">
      <!-- Título -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Digite o título da tarefa"
        />
      </div>

      <!-- Descrição -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Descreva a tarefa (opcional)"
        ></textarea>
      </div>

      <!-- Prioridade -->
      <div>
        <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">
          Prioridade *
        </label>
        <select
          id="priority"
          v-model="form.priority"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecione a prioridade</option>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <!-- Data de vencimento -->
      <div>
        <label for="due_date" class="block text-sm font-medium text-gray-700 mb-1">
          Data de Vencimento
        </label>
        <input
          id="due_date"
          v-model="form.due_date"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Botões -->
      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="resetForm"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Limpar
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Criando...' : 'Criar Tarefa' }}
        </button>
      </div>
    </form>

    <!-- Mensagem de erro -->
    <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <!-- Mensagem de sucesso -->
    <div v-if="success" class="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
      {{ success }}
    </div>
    
    </div> <!-- Fim do conteúdo do accordion -->
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { todoService } from '@/services/todoService'
import { useUserStore } from '@/stores/user'

const emit = defineEmits(['todo-created'])

const userStore = useUserStore()
const loading = ref(false)
const error = ref('')
const success = ref('')
const isExpanded = ref(false) 

const form = reactive({
  title: '',
  description: '',
  priority: '',
  due_date: ''
})

const toggleForm = () => {
  isExpanded.value = !isExpanded.value
}

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.priority = ''
  form.due_date = ''
  error.value = ''
  success.value = ''
}

const submitTodo = async () => {
  if (!userStore.token) {
    error.value = 'Você precisa estar logado para criar tarefas'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const todoData = {
      title: form.title,
      description: form.description || null,
      priority: form.priority,
      due_date: form.due_date || null
    }

    const response = await todoService.createTodo(todoData, userStore.token)
    
    success.value = 'Tarefa criada com sucesso!'
    emit('todo-created', response.data)
    
    setTimeout(() => {
      resetForm()
      isExpanded.value = false
    }, 1500)

  } catch (err) {
    error.value = err.message || 'Erro ao criar tarefa'
  } finally {
    loading.value = false
  }
}
</script>
