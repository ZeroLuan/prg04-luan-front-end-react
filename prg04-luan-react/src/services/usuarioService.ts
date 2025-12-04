import api from './api';
import type { UsuarioRequest, UsuarioResponse, PageResponse } from '../types';

export const usuarioService = {
  /**
   * Cria um novo usuário
   * @param data - Dados do usuário (nome, email, telefone)
   * @returns Promise com a resposta do usuário criado
   */
  criar: async (data: UsuarioRequest): Promise<UsuarioResponse> => {
    const response = await api.post<UsuarioResponse>('/usuario/criar', data);
    return response.data;
  },

  /**
   * Lista todos os usuários com paginação
   * @param page - Número da página (padrão: 0)
   * @param size - Tamanho da página (padrão: 10)
   * @returns Promise com a página de usuários
   */
  listarTodos: async (page: number = 0, size: number = 10): Promise<PageResponse<UsuarioResponse>> => {
    const response = await api.get<PageResponse<UsuarioResponse>>('/usuario/listar', {
      params: { page, size },
    });
    return response.data;
  },

  /**
   * Busca um usuário por ID
   * @param id - ID do usuário
   * @returns Promise com os dados do usuário
   */
  buscarPorId: async (id: number): Promise<UsuarioResponse> => {
    const response = await api.get<UsuarioResponse>(`/usuario/${id}`);
    return response.data;
  },

  /**
   * Atualiza um usuário existente
   * @param id - ID do usuário
   * @param data - Dados atualizados do usuário
   * @returns Promise com a resposta do usuário atualizado
   */
  atualizar: async (id: number, data: UsuarioRequest): Promise<UsuarioResponse> => {
    const response = await api.put<UsuarioResponse>(`/usuario/${id}`, data);
    return response.data;
  },

  /**
   * Deleta um usuário
   * @param id - ID do usuário
   * @returns Promise vazia
   */
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/usuario/${id}`);
  },
};
