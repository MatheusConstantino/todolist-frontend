<template>
  <div class="bg-white rounded-lg shadow-md">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">
        Suas Tarefas
      </h3>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="p-6 text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <span class="mt-2 text-gray-600">Carregando tarefas...</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="p-6">
      <div class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ error }}
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!todos.length" class="p-6 text-center">
      <div class="text-gray-500">
        <p class="text-lg font-medium mb-2">Nenhuma tarefa encontrada</p>
        <p class="text-sm">Crie sua primeira tarefa usando o formulário acima!</p>
      </div>
    </div>

    <!-- Todo list -->
    <div v-else class="divide-y divide-gray-200">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="p-6 hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center mb-2">
              <h4 class="text-lg font-medium text-gray-900 mr-3">
                {{ todo.title }}
              </h4>
              
              <!-- Priority badge -->
              <span 
                :class="getPriorityClass(todo.priority)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ getPriorityLabel(todo.priority) }}
              </span>

              <!-- Status badge -->
              <span 
                :class="getStatusClass(todo)"
                class="px-2 py-1 text-xs font-medium rounded-full ml-2"
              >
                {{ getStatusLabel(todo) }}
              </span>
            </div>

            <p v-if="todo.description" class="text-gray-600 mb-3">
              {{ todo.description }}
            </p>

            <div class="flex items-center text-sm text-gray-500 space-x-4">
              <span v-if="todo.due_date">
                Vencimento: {{ formatDate(todo.due_date) }}
              </span>
              <span>
                Criado em: {{ formatDate(todo.created_at) }}
              </span>
            </div>
          </div>

          <div class="ml-4 flex space-x-2">
            <button
              v-if="!todo.is_completed"
              @click="markAsCompleted(todo.id)"
              class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Concluir
            </button>
            <button
              @click="deleteTodo(todo.id)"
              class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { todoService } from '@/services/todoService'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  refreshTrigger: {
    type: Number,
    default: 0
  }
})

const userStore = useUserStore()
const todos = ref([])
const loading = ref(false)
const error = ref('')

const loadTodos = async () => {
  if (!userStore.token) {
    error.value = 'Você precisa estar logado para ver suas tarefas'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await todoService.getTodos(userStore.token)
    todos.value = response.data || []
  } catch (err) {
    error.value = err.message || 'Erro ao carregar tarefas'
    todos.value = []
  } finally {
    loading.value = false
  }
}

const markAsCompleted = async (todoId) => {
  try {
    await todoService.updateTodo(todoId, { status: 'completed' }, userStore.token)
    await loadTodos() // Recarregar a lista
  } catch (err) {
    error.value = err.message || 'Erro ao marcar tarefa como concluída'
  }
}

const deleteTodo = async (todoId) => {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
    return
  }

  try {
    await todoService.deleteTodo(todoId, userStore.token)
    await loadTodos() // Recarregar a lista
  } catch (err) {
    error.value = err.message || 'Erro ao excluir tarefa'
  }
}

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return 'Alta'
    case 'medium':
      return 'Média'
    case 'low':
      return 'Baixa'
    default:
      return 'Indefinida'
  }
}

const getStatusClass = (todo) => {
  if (todo.is_completed) {
    return 'bg-green-100 text-green-800'
  }
  if (todo.is_overdue) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-blue-100 text-blue-800'
}

const getStatusLabel = (todo) => {
  if (todo.is_completed) {
    return 'Concluída'
  }
  if (todo.is_overdue) {
    return 'Atrasada'
  }
  return 'Pendente'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Carregar todos na montagem do componente
onMounted(() => {
  loadTodos()
})

// Recarregar quando refreshTrigger mudar
import { watch } from 'vue'
watch(() => props.refreshTrigger, () => {
  loadTodos()
})

// Expor função para recarregar externamente
defineExpose({
  loadTodos
})
</script>
