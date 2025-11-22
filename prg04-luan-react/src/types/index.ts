export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
}

export interface AuthUser {
  nome: string;
  email: string;
}

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
