import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { usuarioService } from '../services/usuarioService';
import type { UsuarioResponse, UsuarioRequest } from '../types';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState<UsuarioRequest & { id?: number }>({
    nomeCompleto: '',
    email: '',
    telefone: ''
  });
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'error', texto: string } | null>(null);
  
  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalElementos, setTotalElementos] = useState(0);
  const tamanhoPagina = 10;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      carregarUsuarios();
    }
  }, [user, navigate, paginaAtual]);

  const carregarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await usuarioService.listarTodos(paginaAtual, tamanhoPagina);
      setUsuarios(response.content);
      setTotalPaginas(response.totalPages);
      setTotalElementos(response.totalElements);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setMensagem({
        tipo: 'error',
        texto: 'Erro ao carregar usuários. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };


  const abrirModalAdicionar = () => {
    setModoEdicao(false);
    setUsuarioAtual({
      nomeCompleto: '',
      email: '',
      telefone: ''
    });
    setMensagem(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (usuario: UsuarioResponse) => {
    setModoEdicao(true);
    setUsuarioAtual({
      id: usuario.id,
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      telefone: usuario.telefone
    });
    setMensagem(null);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setUsuarioAtual({
      nomeCompleto: '',
      email: '',
      telefone: ''
    });
    setMensagem(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);
    
    try {
      if (modoEdicao && usuarioAtual.id) {
        // Atualizar usuário existente
        await usuarioService.atualizar(usuarioAtual.id, {
          nomeCompleto: usuarioAtual.nomeCompleto,
          email: usuarioAtual.email,
          telefone: usuarioAtual.telefone
        });
        setMensagem({
          tipo: 'success',
          texto: 'Usuário atualizado com sucesso!'
        });
      } else {
        // Criar novo usuário
        await usuarioService.criar({
          nomeCompleto: usuarioAtual.nomeCompleto,
          email: usuarioAtual.email,
          telefone: usuarioAtual.telefone
        });
        setMensagem({
          tipo: 'success',
          texto: 'Usuário criado com sucesso!'
        });
      }
      
      fecharModal();
      carregarUsuarios(); // Recarrega a lista
    } catch (error: any) {
      console.error('Erro ao salvar usuário:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao salvar usuário. Tente novamente.';
      setMensagem({
        tipo: 'error',
        texto: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmarExclusao = (id: number) => {
    setIdParaExcluir(id);
    setModalConfirmacao(true);
  };

  const excluirUsuario = async () => {
    if (idParaExcluir === null) return;
    
    setLoading(true);
    try {
      await usuarioService.deletar(idParaExcluir);
      setMensagem({
        tipo: 'success',
        texto: 'Usuário excluído com sucesso!'
      });
      setModalConfirmacao(false);
      setIdParaExcluir(null);
      carregarUsuarios(); // Recarrega a lista
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      setMensagem({
        tipo: 'error',
        texto: 'Erro ao excluir usuário. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-speedometer2"></i> Painel de Administração
          </span>
          <div className="d-flex align-items-center">
            <span className="text-white me-3">
              <i className="bi bi-person-circle"></i> {user?.nome || 'Admin'}
            </span>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
              <i className="bi bi-box-arrow-right"></i> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">
                <i className="bi bi-people"></i> Gerenciamento de Usuários
              </h2>
              <button onClick={abrirModalAdicionar} className="btn btn-success" disabled={loading}>
                <i className="bi bi-plus-circle"></i> Adicionar Usuário
              </button>
            </div>

            {mensagem && (
              <div className={`alert alert-${mensagem.tipo === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                <i className={`bi bi-${mensagem.tipo === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
                {mensagem.texto}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMensagem(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}

            {loading && !modalAberto ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-3">Carregando usuários...</p>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="alert alert-info text-center" role="alert">
                <i className="bi bi-info-circle fs-3"></i>
                <p className="mb-0 mt-2">
                  Nenhum usuário cadastrado. Clique em "Adicionar Usuário" para começar.
                </p>
              </div>
            ) : (
              <>
                <div className="card shadow-sm">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover table-striped mb-0">
                        <thead className="table-primary">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th scope="col" className="text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios.map((usuario) => (
                          <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nomeCompleto}</td>
                            <td>{usuario.email}</td>
                              <td>{usuario.telefone || '-'}</td>
                              <td className="text-center">
                                <button 
                                  onClick={() => abrirModalEditar(usuario)}
                                  className="btn btn-sm btn-warning me-2"
                                  disabled={loading}
                                >
                                  <i className="bi bi-pencil"></i> Editar
                                </button>
                                <button 
                                  onClick={() => confirmarExclusao(usuario.id)}
                                  className="btn btn-sm btn-danger"
                                  disabled={loading}
                                >
                                  <i className="bi bi-trash"></i> Excluir
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Paginação */}
                {totalPaginas > 1 && (
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <small className="text-muted">
                        Mostrando {usuarios.length} de {totalElementos} usuário(s)
                      </small>
                    </div>
                    <nav aria-label="Navegação de página">
                      <ul className="pagination mb-0">
                        <li className={`page-item ${paginaAtual === 0 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => setPaginaAtual(paginaAtual - 1)}
                            disabled={paginaAtual === 0 || loading}
                          >
                            <i className="bi bi-chevron-left"></i>
                          </button>
                        </li>
                        
                        {[...Array(totalPaginas)].map((_, index) => (
                          <li 
                            key={index} 
                            className={`page-item ${paginaAtual === index ? 'active' : ''}`}
                          >
                            <button 
                              className="page-link" 
                              onClick={() => setPaginaAtual(index)}
                              disabled={loading}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        
                        <li className={`page-item ${paginaAtual === totalPaginas - 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => setPaginaAtual(paginaAtual + 1)}
                            disabled={paginaAtual === totalPaginas - 1 || loading}
                          >
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modal Adicionar/Editar */}
      {modalAberto && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-person-plus"></i> {modoEdicao ? 'Editar' : 'Adicionar'} Usuário
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={fecharModal}
                  disabled={loading}
                ></button>
              </div>
              <div className="modal-body">
                {mensagem && (
                  <div className={`alert alert-${mensagem.tipo === 'success' ? 'success' : 'danger'}`} role="alert">
                    <i className={`bi bi-${mensagem.tipo === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
                    {mensagem.texto}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} id="formUsuario">
                  <div className="mb-3">
                    <label htmlFor="usuarioNome" className="form-label">
                      <i className="bi bi-person"></i> Nome Completo *
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="usuarioNome"
                      value={usuarioAtual.nomeCompleto}
                      onChange={(e) => setUsuarioAtual({...usuarioAtual, nomeCompleto: e.target.value})}
                      placeholder="Digite o nome completo" 
                      required 
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="usuarioEmail" className="form-label">
                      <i className="bi bi-envelope"></i> Email *
                    </label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="usuarioEmail"
                      value={usuarioAtual.email}
                      onChange={(e) => setUsuarioAtual({...usuarioAtual, email: e.target.value})}
                      placeholder="Digite o email" 
                      required 
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="usuarioTelefone" className="form-label">
                      <i className="bi bi-telephone"></i> Telefone
                    </label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="usuarioTelefone"
                      value={usuarioAtual.telefone || ''}
                      onChange={(e) => setUsuarioAtual({...usuarioAtual, telefone: e.target.value})}
                      placeholder="(00) 00000-0000" 
                      disabled={loading}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={fecharModal}
                  disabled={loading}
                >
                  <i className="bi bi-x-circle"></i> Cancelar
                </button>
                <button 
                  type="submit" 
                  form="formUsuario" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle"></i> Salvar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmação Exclusão */}
      {modalConfirmacao && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle"></i> Confirmar Exclusão
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setModalConfirmacao(false)}
                  disabled={loading}
                ></button>
              </div>
              <div className="modal-body text-center">
                <i className="bi bi-trash fs-1 text-danger mb-3"></i>
                <p className="fw-bold">Tem certeza que deseja excluir este usuário?</p>
                <div className="alert alert-warning" role="alert">
                  <small><i className="bi bi-info-circle"></i> Esta ação não pode ser desfeita!</small>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setModalConfirmacao(false)}
                  disabled={loading}
                >
                  <i className="bi bi-x-circle"></i> Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={excluirUsuario}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash"></i> Sim, Excluir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
