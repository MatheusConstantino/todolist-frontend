const API_BASE_URL = 'http://localhost:8000/api'

export const todoService = {
  // Criar um novo todo
  async createTodo(todoData, token) {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(todoData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao criar tarefa')
    }

    return data
  },

  // Listar todos os todos
  async getTodos(token) {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar tarefas')
    }

    return data
  },

  // Atualizar um todo
  async updateTodo(todoId, todoData, token) {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(todoData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao atualizar tarefa')
    }

    return data
  },

  // Deletar um todo
  async deleteTodo(todoId, token) {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Erro ao deletar tarefa')
    }

    return true
  }
}
