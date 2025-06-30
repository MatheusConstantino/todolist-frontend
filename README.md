# 📝 Todo List - Vue 3 + Pinia + TypeScript

Um sistema completo de gerenciamento de tarefas (Todo List) desenvolvido com as mais modernas tecnologias do ecossistema Vue.js, seguindo as melhores práticas de desenvolvimento frontend.

## 🚀 Tecnologias Utilizadas

- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progressivo
- **[Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)** - API moderna do Vue 3
- **[Pinia](https://pinia.vuejs.org/)** - Gerenciamento de estado oficial do Vue
- **[Vue Router 4](https://router.vuejs.org/)** - Roteamento oficial do Vue
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- [x] Cadastro de usuários com validação
- [x] Login/Logout de usuários
- [x] Proteção de rotas privadas
- [x] Gerenciamento de sessão

### 📋 Gerenciamento de Tarefas 
- [x] Criar, editar e excluir tarefas
- [x] Marcar tarefas como concluídas
- [x] Filtrar tarefas (todas, pendentes, concluídas)
- [x] Categorização de tarefas
- [x] Busca de tarefas
- [x] Persistência local dos dados

### 🎨 Interface e UX
- [x] Design responsivo e moderno
- [x] Componentes reutilizáveis
- [x] Validação de formulários em tempo real
- [x] Estados de loading e feedback visual
- [x] Tratamento de erros

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── BaseInput.vue   # Input customizado com validação
│   └── BaseButton.vue  # Botão customizado com estados
├── composables/        # Lógica reutilizável
│   └── useValidation.js # Hook para validação de formulários
├── stores/             # Gerenciamento de estado (Pinia)
│   ├── index.js       # Configuração do Pinia
│   └── user.js        # Store de usuários
├── views/              # Páginas da aplicação
│   ├── HomeView.vue   # Página inicial
│   ├── RegisterView.vue # Cadastro de usuários
│   └── LoginView.vue  # Login de usuários
├── router/             # Configuração de rotas
│   └── index.js       # Definição das rotas
├── App.vue            # Componente raiz
└── main.js            # Ponto de entrada da aplicação
```

## 🛠️ Padrões e Boas Práticas Implementadas

### 📦 Composables
- **Reutilização de lógica**: Hooks customizados para validação e outras funcionalidades
- **Separação de responsabilidades**: Lógica separada da apresentação

### 🏪 Gerenciamento de Estado (Pinia)
- **Stores modulares**: Cada funcionalidade tem sua própria store
- **Composition API**: Stores escritas com a sintaxe moderna do Vue 3
- **TypeScript**: Tipagem completa para melhor DX

### 🧩 Componentes
- **Componentes base reutilizáveis**: Input, Button, etc.
- **Props tipadas**: Validação de propriedades
- **Emits definidos**: Eventos bem documentados
- **Slots quando necessário**: Flexibilidade na composição

### 🛡️ Validação
- **Validação client-side**: Feedback imediato ao usuário
- **Regras reutilizáveis**: Sistema de validação flexível
- **Mensagens personalizadas**: UX melhorada

### 🎨 Estilização
- **Tailwind CSS**: Classes utilitárias para desenvolvimento rápido
- **Design System**: Cores e espaçamentos consistentes
- **Responsividade**: Mobile-first approach

## 🚀 Como Executar

### Pré-requisitos
- Node.js >= 16.0.0
- npm ou yarn ou pnpm

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/MatheusConstantino/todolist-frontend.git
cd todo-list-vue3
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run lint         # Executa o linter
npm run type-check   # Verificação de tipos TypeScript
```

## 📱 Funcionalidades Demonstradas

### 🔐 Autenticação
- Formulários de cadastro e login com validação completa
- Gerenciamento de estado do usuário logado
- Proteção de rotas baseada em autenticação

### 🎯 Validação de Formulários
- Validação em tempo real
- Mensagens de erro personalizadas
- Validação de email, senha e confirmação

### 🔄 Estados da Aplicação
- Loading states durante requisições
- Tratamento de erros com feedback visual
- Estados de sucesso e confirmação


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Seu Nome**
- GitHub: [@MateusConstantino](https://github.com/MatheusConstantino)
- LinkedIn: [Matheus Constantino Gomes](https://linkedin.com/in/matheus-constantino-gomes)
- Email: matheusconstantino57@gmail.com

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
