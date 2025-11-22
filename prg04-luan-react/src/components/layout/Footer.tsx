import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="fw-bold text-primary mb-3">Clínica de Fisioterapia</h5>
            <p className="text-muted">
              Cuidado especializado para sua recuperação e bem-estar.
              Agende sua consulta hoje mesmo!
            </p>
          </div>

          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Nossos Serviços</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Fisioterapia Ortopédica</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Fisioterapia Neurológica</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Fisioterapia Respiratória</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Fisioterapia Esportiva</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Reabilitação Pós-Cirúrgica</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Contato</h5>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-telephone text-primary me-2"></i>
              <span className="text-muted">(00) 1234-5678</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-envelope text-primary me-2"></i>
              <span className="text-muted">contato@clinicaexemplo.com</span>
            </div>
            <div className="d-flex align-items-start mb-2">
              <i className="bi bi-geo-alt text-primary me-2 mt-1"></i>
              <span className="text-muted">Rua Exemplo, 123 - Centro, Cidade - UF</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-clock text-primary me-2"></i>
              <span className="text-muted">Segunda a Sexta, 8h às 18h</span>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center">
          <p className="text-muted mb-0">© 2026 Dra. Lorena Alves ❤️ para cuidar da sua saúde.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
