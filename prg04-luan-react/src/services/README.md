# Services - Integração com API

Este diretório contém os serviços para integração com o backend da aplicação.

## Estrutura

- **`api.ts`**: Configuração do Axios com interceptors
- **`config.ts`**: Configurações e endpoints da API
- **`cadastroService.ts`**: Serviço para cadastro inicial de usuários
- **`usuarioService.ts`**: Serviço CRUD completo de usuários

## Configuração

### Alterar URL da API

Edite o arquivo `config.ts` e modifique a propriedade `baseURL`:

```typescript
export const API_CONFIG = {
  baseURL: "http://SEU_SERVIDOR:PORTA/api",
  // ...
};
```

### Exemplo de uso

#### Cadastro de usuário (Home)

```typescript
import { cadastroService } from "../services/cadastroService";

const response = await cadastroService.cadastrar({
  nome: "João Silva",
  email: "joao@email.com",
  senha: "senha123",
});
```

#### CRUD de usuários (AdminPanel)

```typescript
import { usuarioService } from "../services/usuarioService";

// Criar
await usuarioService.criar({
  nome: "Maria Santos",
  email: "maria@email.com",
  telefone: "(11) 98765-4321",
});

// Listar com paginação
const page = await usuarioService.listarTodos(0, 10); // página 0, 10 itens

// Buscar por ID
const usuario = await usuarioService.buscarPorId(1);

// Atualizar
await usuarioService.atualizar(1, {
  nome: "Maria Santos Silva",
  email: "maria.silva@email.com",
  telefone: "(11) 98765-4321",
});

// Deletar
await usuarioService.deletar(1);
```

## Endpoints do Backend

### Cadastro

- **POST** `/api/cadastro/cadastrar` - Cadastra um novo usuário no sistema

### Usuário (CRUD)

- **POST** `/api/usuario/criar` - Cria um novo usuário
- **GET** `/api/usuario/listar?page=0&size=10` - Lista usuários com paginação
- **GET** `/api/usuario/{id}` - Busca usuário por ID
- **PUT** `/api/usuario/{id}` - Atualiza usuário
- **DELETE** `/api/usuario/{id}` - Deleta usuário

## Tratamento de Erros

Todos os serviços utilizam try/catch e retornam mensagens de erro apropriadas. Os erros são interceptados e logados no console pelo interceptor do Axios.

## Tipos TypeScript

Todos os tipos estão definidos em `src/types/index.ts`:

- `CadastroRequest` / `CadastroResponse`
- `UsuarioRequest` / `UsuarioResponse`
- `PageResponse<T>` - Para paginação
