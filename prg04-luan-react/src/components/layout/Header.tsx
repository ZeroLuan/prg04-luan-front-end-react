import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src="/favicon.ico" 
              alt="Logo da Clínica" 
              className="me-2" 
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
            <div>
              <h5 className="mb-0 fw-bold text-primary">Dra. Lorena Alves</h5>
              <small className="text-muted">Fisioterapeuta</small>
            </div>
          </Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="#sobre">Sobre</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#servicos">Serviços</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#depoimentos">Depoimentos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contatos">Contatos</a>
              </li>
            </ul>

            <div className="d-flex">
              <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
