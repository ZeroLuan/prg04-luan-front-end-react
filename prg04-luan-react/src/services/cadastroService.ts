import api from './api';
import type { CadastroRequest, CadastroResponse } from '../types';

export const cadastroService = {
  /**
   * Cadastra um novo usuário no sistema
   * @param data - Dados do cadastro (nome, email, senha)
   * @returns Promise com a resposta do cadastro
   */
  cadastrar: async (data: CadastroRequest): Promise<CadastroResponse> => {
    const response = await api.post<CadastroResponse>('/cadastro/cadastrar', data);
    return response.data;
  },
};
