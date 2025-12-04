// Configuração da API
export const API_CONFIG = {
  // URL base da API - altere para o endereço do seu backend
  baseURL: 'http://localhost:8080/api',
  
  // Timeout para requisições (em milissegundos)
  timeout: 10000,
  
  // Headers padrão
  headers: {
    'Content-Type': 'application/json',
  },
};

// Endpoints da API
export const API_ENDPOINTS = {
  cadastro: {
    cadastrar: '/cadastro/cadastrar',
  },
  usuario: {
    criar: '/usuario/criar',
    listar: '/usuario/listar',
    buscarPorId: (id: number) => `/usuario/${id}`,
    atualizar: (id: number) => `/usuario/${id}`,
    deletar: (id: number) => `/usuario/${id}`,
  },
};
