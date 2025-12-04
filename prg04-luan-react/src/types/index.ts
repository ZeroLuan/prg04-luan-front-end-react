// ============= TIPOS DE AUTENTICAÇÃO =============
export interface AuthUser {
  nome: string;
  email: string;
}

// ============= TIPOS DE CADASTRO (API) =============
export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface CadastroResponse {
  id: number;
  nome: string;
  email: string;
  mensagem?: string;
}

// ============= TIPOS DE USUÁRIO (CRUD API) =============
export interface UsuarioRequest {
  nomeCompleto: string;
  email: string;
  telefone?: string;
}

export interface UsuarioResponse {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone?: string;
}

// ============= TIPOS DE PAGINAÇÃO =============
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// ============= TIPOS LEGADOS (compatibilidade) =============
export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
}

// ============= TIPOS DA APLICAÇÃO =============
export interface Depoimento {
  id: number;
  nome: string;
  cargo: string;
  texto: string;
  estrelas: number;
}

export interface Servico {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
}
