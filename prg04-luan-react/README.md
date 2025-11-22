# PRG04 - Fisioterapia Dra. Lorena Alves (React + TypeScript)

Aplicação web React moderna para clínica de fisioterapia, construída com Vite, TypeScript, React Router e Bootstrap.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **React Router v6** - Navegação e roteamento
- **Bootstrap 5** - Framework CSS responsivo
- **Bootstrap Icons** - Ícones
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Imagens, CSS e recursos estáticos
│   ├── css/
│   │   └── global/
│   ├── fonts/
│   └── images/
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes comuns (BackButton, ProtectedRoute)
│   └── layout/         # Componentes de layout (Header, Footer)
├── contexts/           # Context API (AuthContext)
├── pages/              # Páginas da aplicação
│   ├── Home.tsx
│   ├── Login.tsx
│   └── AdminPanel.tsx
├── services/           # Serviços e APIs
├── types/              # Definições TypeScript
└── utils/              # Utilitários
```

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

```powershell
# Entre na pasta do projeto
cd prg04-luan-react

# Instale as dependências (se ainda não instalou)
npm install
```

### Executar em modo desenvolvimento

```powershell
npm run dev
```

Acesse: http://localhost:5173

### Build para produção

```powershell
npm run build
```

### Preview do build

```powershell
npm run preview
```

## 📄 Páginas e Funcionalidades

### 🏠 Home (`/`)
- Hero section com apresentação
- Sobre a doutora
- Serviços oferecidos
- Depoimentos de pacientes
- Formulário de contato
- Navegação para login

### 🔐 Login (`/login`)
- Formulário de autenticação
- Validação de campos
- Redirecionamento após login
- Armazenamento em sessionStorage

### 👨‍💼 Painel Administrativo (`/admin`)
- **Protegido por autenticação**
- CRUD completo de usuários
- Listagem em tabela responsiva
- Modais para adicionar/editar
- Confirmação de exclusão
- Persistência em localStorage
- Logout funcional

## 🔐 Autenticação

O projeto utiliza Context API para gerenciar autenticação:

- `AuthContext` - Contexto de autenticação
- `useAuth()` - Hook customizado para acessar autenticação
- `ProtectedRoute` - Componente para proteger rotas

## 💾 Armazenamento de Dados

- **sessionStorage** - Dados de autenticação do usuário
- **localStorage** - Lista de usuários cadastrados no painel admin

## 🎨 Estilização

- Bootstrap 5 para componentes e grid system
- Bootstrap Icons para ícones
- CSS customizado em `assets/css/global/`
- Classes utilitárias do Bootstrap

## 🔄 Migração do Projeto Original

Este projeto é uma refatoração completa do projeto HTML/CSS/JS estático para React:

### Principais melhorias:

✅ **Componentização** - Código organizado em componentes reutilizáveis
✅ **TypeScript** - Tipagem estática para maior segurança
✅ **SPA** - Single Page Application sem recarregamentos
✅ **React Router** - Navegação client-side
✅ **Context API** - Estado global gerenciado
✅ **Hooks modernos** - useState, useEffect, useNavigate, etc.
✅ **Hot Module Replacement** - Desenvolvimento mais rápido

## 📦 Scripts Disponíveis

```json
{
  "dev": "vite",              // Inicia servidor de desenvolvimento
  "build": "tsc && vite build", // Build de produção
  "preview": "vite preview"    // Preview do build
}
```

## 🛠️ Próximas Melhorias

- [ ] Integração com backend/API REST
- [ ] Testes unitários com Vitest
- [ ] Validação de formulários com React Hook Form
- [ ] Toast notifications
- [ ] Paginação na tabela de usuários
- [ ] Filtros e busca
- [ ] Dark mode
- [ ] Internacionalização (i18n)

## 📝 Notas de Desenvolvimento

- **Bootstrap JS** não é necessário - React gerencia interatividade
- **Modais** são controlados por estado React
- **Formulários** usam controlled components
- **Navegação** é feita via React Router (não anchor tags)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é parte do curso PRG04 e é apenas para fins educacionais.

---

**Desenvolvido com ❤️ usando React + TypeScript**
