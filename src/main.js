import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Inicializar autenticação após montar a app
app.mount('#app')

// Inicializar dados do usuário se houver token salvo
const userStore = useUserStore()
userStore.initializeAuth()
