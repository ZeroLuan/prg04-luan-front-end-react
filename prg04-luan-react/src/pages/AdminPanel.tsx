import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import type { User } from '../types';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Carrega usuários do localStorage na inicialização
  const carregarUsuarios = (): User[] => {
    const usuariosStorage = localStorage.getItem('usuarios');
    return usuariosStorage ? JSON.parse(usuariosStorage) : [];
  };

  const [usuarios, setUsuarios] = useState<User[]>(carregarUsuarios);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState<User>({
    id: '',
    nome: '',
    email: '',
    telefone: ''
  });
  const [idParaExcluir, setIdParaExcluir] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const salvarUsuarios = (novosUsuarios: User[]) => {
    localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
    setUsuarios(novosUsuarios);
  };

  const abrirModalAdicionar = () => {
    setModoEdicao(false);
    setUsuarioAtual({
      id: '',
      nome: '',
      email: '',
      telefone: ''
    });
    setModalAberto(true);
  };

  const abrirModalEditar = (usuario: User) => {
    setModoEdicao(true);
    setUsuarioAtual(usuario);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setUsuarioAtual({
      id: '',
      nome: '',
      email: '',
      telefone: ''
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (modoEdicao) {
      const novosUsuarios = usuarios.map(u => 
        u.id === usuarioAtual.id ? usuarioAtual : u
      );
      salvarUsuarios(novosUsuarios);
    } else {
      const novoUsuario: User = {
        ...usuarioAtual,
        id: Date.now().toString()
      };
      salvarUsuarios([...usuarios, novoUsuario]);
    }
    
    fecharModal();
  };

  const confirmarExclusao = (id: string) => {
    setIdParaExcluir(id);
    setModalConfirmacao(true);
  };

  const excluirUsuario = () => {
    const novosUsuarios = usuarios.filter(u => u.id !== idParaExcluir);
    salvarUsuarios(novosUsuarios);
    setModalConfirmacao(false);
    setIdParaExcluir('');
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
              <button onClick={abrirModalAdicionar} className="btn btn-success">
                <i className="bi bi-plus-circle"></i> Adicionar Usuário
              </button>
            </div>

            {usuarios.length === 0 ? (
              <div className="alert alert-info text-center" role="alert">
                <i className="bi bi-info-circle fs-3"></i>
                <p className="mb-0 mt-2">
                  Nenhum usuário cadastrado. Clique em "Adicionar Usuário" para começar.
                </p>
              </div>
            ) : (
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
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefone || '-'}</td>
                            <td className="text-center">
                              <button 
                                onClick={() => abrirModalEditar(usuario)}
                                className="btn btn-sm btn-warning me-2"
                              >
                                <i className="bi bi-pencil"></i> Editar
                              </button>
                              <button 
                                onClick={() => confirmarExclusao(usuario.id)}
                                className="btn btn-sm btn-danger"
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
                <button type="button" className="btn-close btn-close-white" onClick={fecharModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} id="formUsuario">
                  <div className="mb-3">
                    <label htmlFor="usuarioNome" className="form-label">
                      <i className="bi bi-person"></i> Nome Completo
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="usuarioNome"
                      value={usuarioAtual.nome}
                      onChange={(e) => setUsuarioAtual({...usuarioAtual, nome: e.target.value})}
                      placeholder="Digite o nome completo" 
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="usuarioEmail" className="form-label">
                      <i className="bi bi-envelope"></i> Email
                    </label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="usuarioEmail"
                      value={usuarioAtual.email}
                      onChange={(e) => setUsuarioAtual({...usuarioAtual, email: e.target.value})}
                      placeholder="Digite o email" 
                      required 
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
                      required 
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={fecharModal}>
                  <i className="bi bi-x-circle"></i> Cancelar
                </button>
                <button type="submit" form="formUsuario" className="btn btn-primary">
                  <i className="bi bi-check-circle"></i> Salvar
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
                >
                  <i className="bi bi-x-circle"></i> Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={excluirUsuario}>
                  <i className="bi bi-trash"></i> Sim, Excluir
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
