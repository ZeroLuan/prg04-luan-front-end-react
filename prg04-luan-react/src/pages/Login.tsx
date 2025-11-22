import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import BackButton from '../components/common/BackButton';

const Login: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (login(nome, email, senha)) {
      navigate('/admin');
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  const handleReset = () => {
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <main className="main-login min-vh-100 d-flex align-items-center py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="mb-3">
              <BackButton to="/" />
            </div>
            
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-person-circle fs-1 text-primary"></i>
                  </div>
                  <h2 className="fw-bold">Bem-vindo</h2>
                  <p className="text-muted">Acesse o painel de administração</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      <i className="bi bi-person"></i> Nome
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      id="nome" 
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite seu nome" 
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope"></i> Email
                    </label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Digite seu email" 
                      required 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="senha" className="form-label">
                      <i className="bi bi-lock"></i> Senha
                    </label>
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      id="senha" 
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Digite sua senha" 
                      required 
                    />
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <i className="bi bi-box-arrow-in-right"></i> Entrar
                    </button>
                    <button type="button" onClick={handleReset} className="btn btn-outline-secondary">
                      <i className="bi bi-x-circle"></i> Limpar
                    </button>
                  </div>
                </form>
                
                <hr className="my-4" />
                
                <div className="text-center">
                  <small className="text-muted">
                    <i className="bi bi-shield-check"></i> Seus dados estão protegidos
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
