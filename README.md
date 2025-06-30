# 📝 Todo List Frontend - Vue 3 + Pinia

Um sistema completo de gerenciamento de tarefas (Todo List) desenvolvido com Vue 3, Composition API e Pinia, integrado com uma API Laravel para persistência de dados.

## 🚀 Tecnologias Utilizadas

- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progressivo
- **[Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)** - API moderna do Vue 3
- **[Pinia](https://pinia.vuejs.org/)** - Gerenciamento de estado oficial do Vue
- **[Vue Router 4](https://router.vuejs.org/)** - Roteamento oficial do Vue
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- [x] Cadastro de usuários com validação
- [x] Login/Logout de usuários
- [x] Proteção de rotas privadas
- [x] Gerenciamento de sessão

### 📋 Gerenciamento de Tarefas 
- [x] Criar novas tarefas com título, descrição, prioridade e data de vencimento
- [x] Listar todas as tarefas do usuário
- [x] Marcar tarefas como concluídas
- [x] Excluir tarefas
- [x] Filtrar tarefas por status (pendentes/concluídas)
- [x] Filtrar tarefas por prioridade (baixa/média/alta)
- [x] Filtrar tarefas por prazo (atrasadas/no prazo)
- [x] Formulário expansível (accordion) para criação
- [x] Persistência no banco de dados via API

### 🎨 Interface e UX
- [x] Design responsivo e moderno
- [x] Componentes reutilizáveis
- [x] Validação de formulários em tempo real
- [x] Estados de loading e feedback visual
- [x] Tratamento de erros

## 🏗️ Arquitetura do Projeto

A aplicação segue uma arquitetura bem estruturada baseada em camadas:

```
src/
├── components/          # Componentes reutilizáveis
│   ├── BaseInput.vue   # Input customizado com validação
│   ├── BaseButton.vue  # Botão customizado com estados
│   ├── TodoForm.vue    # Formulário de criação de tarefas
│   └── TodoList.vue    # Lista e filtros de tarefas
├── services/           # Camada de comunicação com API
│   ├── authService.js  # Serviços de autenticação
│   └── todoService.js  # Serviços de gerenciamento de tarefas
├── stores/             # Gerenciamento de estado (Pinia)
│   └── user.js        # Store de usuários e autenticação
├── views/              # Páginas da aplicação
│   ├── HomeView.vue   # Dashboard principal com tarefas
│   ├── RegisterView.vue # Cadastro de usuários
│   └── LoginView.vue  # Login de usuários
├── router/             # Configuração de rotas
│   └── index.js       # Definição das rotas e guards
├── App.vue            # Componente raiz
└── main.js            # Ponto de entrada da aplicação
```

### 🔄 Fluxo de Dados

**View → Store → Service → API**

1. **Views**: Páginas que renderizam componentes
2. **Components**: Componentes reutilizáveis que emitem eventos
3. **Stores**: Gerenciam estado global e chamam services
4. **Services**: Fazem requisições HTTP para a API
5. **API**: Backend Laravel que processa e persiste dados

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

### 📋 Pré-requisitos
- Node.js >= 16.0.0
- npm, yarn ou pnpm
- Backend Laravel rodando (veja instruções abaixo)

### 🔧 Configuração do Backend

**IMPORTANTE**: Esta aplicação frontend precisa do backend Laravel para funcionar corretamente.

1. **Clone e configure o backend Laravel**
```bash
# Clone o repositório do backend
git clone https://github.com/MatheusConstantino/todolist-backend.git
cd todolist-backend

# Siga as instruções do README do backend para configurar:
# - Banco de dados
# - Variáveis de ambiente
# - Dependências PHP/Composer
# - Executar migrações

# Execute o backend (normalmente na porta 8000)
php artisan serve
```

### ⚙️ Configuração do Frontend

1. **Clone este repositório**
```bash
git clone https://github.com/MatheusConstantino/todolist-frontend.git
cd todolist-frontend
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou  
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env se necessário
# Por padrão está configurado para:
# VITE_API_BASE_URL=http://localhost:8000/api
```

4. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

### 🔗 URLs importantes
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Documentação da API**: Disponível no repositório do backend

### Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção
```

## 🎯 Funcionalidades Principais

### 🔐 Sistema de Autenticação Completo
- **Registro**: Cadastro de novos usuários com validação
- **Login**: Autenticação com email e senha
- **Sessão**: Manutenção automática da sessão do usuário
- **Proteção**: Rotas protegidas que exigem autenticação
- **Logout**: Encerramento seguro da sessão

### 📝 Gerenciamento Avançado de Tarefas
- **Criação**: Formulário expansível com campos completos (título, descrição, prioridade, data)
- **Listagem**: Visualização organizada de todas as tarefas
- **Status**: Marcar como concluída/pendente
- **Filtros**: Por status, prioridade e prazo de vencimento
- **Exclusão**: Remoção de tarefas com confirmação
- **Indicadores visuais**: Badges de status, prioridade e prazo

### 🎨 Interface e Experiência do Usuário
- **Design responsivo**: Funciona em desktop, tablet e mobile
- **Loading states**: Indicadores visuais durante operações
- **Feedback**: Mensagens de sucesso e erro
- **Validação**: Formulários com validação em tempo real
- **Accordion**: Formulário de criação expansível para economia de espaço


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Matheus Constantino**
- GitHub: [@MatheusConstantino](https://github.com/MatheusConstantino)
- LinkedIn: [Matheus Constantino](https://linkedin.com/in/matheus-constantino-gomes)
- Email: matheusconstantino57@gmail.com

## 🔗 Repositórios Relacionados

- **Backend Laravel**: [todolist-backend](https://github.com/MatheusConstantino/todolist-backend)
- **Frontend Vue**: [todolist-frontend](https://github.com/MatheusConstantino/todolist-frontend) (este repositório)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
