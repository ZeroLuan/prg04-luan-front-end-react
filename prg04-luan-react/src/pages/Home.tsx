import React, { useState } from 'react';
import type { FormEvent } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import imagemDoutora from '../assets/img/imagem-doutora.jpg';
import { cadastroService } from '../services/cadastroService';
import type { CadastroRequest } from '../types';

const Home: React.FC = () => {
  const [formData, setFormData] = useState<CadastroRequest>({
    nome: '',
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'error', texto: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem(null);

    try {
      const response = await cadastroService.cadastrar(formData);
      setMensagem({
        tipo: 'success',
        texto: `Cadastro realizado com sucesso! Bem-vindo(a), ${response.nome}!`
      });
      // Limpar formulário após sucesso
      setFormData({
        nome: '',
        email: '',
        senha: ''
      });
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.';
      setMensagem({
        tipo: 'error',
        texto: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const servicos = [
    {
      id: 1,
      titulo: 'Fisioterapia Ortopédica',
      descricao: 'Tratamento especializado para lesões musculoesqueléticas, fraturas e pós-operatório ortopédico.',
      icone: 'bi-activity'
    },
    {
      id: 2,
      titulo: 'Fisioterapia Neurológica',
      descricao: 'Reabilitação neurológica para AVC, Parkinson, lesões medulares e outras condições neurológicas.',
      icone: 'bi-brain'
    },
    {
      id: 3,
      titulo: 'Fisioterapia Cardiorrespiratória',
      descricao: 'Tratamento para condições cardíacas e respiratórias, melhorando capacidade pulmonar e cardíaca.',
      icone: 'bi-heart-pulse'
    },
    {
      id: 4,
      titulo: 'Fisioterapia Esportiva',
      descricao: 'Prevenção e tratamento de lesões esportivas, otimização de performance atlética.',
      icone: 'bi-trophy'
    },
    {
      id: 5,
      titulo: 'Eletroterapia',
      descricao: 'Uso de recursos eletroterapêuticos para alívio da dor e aceleração da recuperação.',
      icone: 'bi-lightning'
    },
    {
      id: 6,
      titulo: 'Fisioterapia Preventiva',
      descricao: 'Programas de prevenção e orientações para manutenção da saúde e qualidade de vida.',
      icone: 'bi-shield-check'
    }
  ];

  const depoimentos = [
    {
      id: 1,
      nome: 'Maria Santos',
      cargo: 'Recuperação pós-cirúrgica',
      texto: 'A Dra. Lorena Alves foi fundamental na minha recuperação após a cirurgia no joelho. Seu cuidado e dedicação fizeram toda a diferença. Hoje estou 100% recuperada!',
      estrelas: 5
    },
    {
      id: 2,
      nome: 'João Silva',
      cargo: 'Fisioterapia neurológica',
      texto: 'Após o AVC, pensei que não voltaria a andar normalmente. Com o tratamento da Dra. Lorena Alves, recuperei minha mobilidade e independência. Sou muito grato!',
      estrelas: 5
    },
    {
      id: 3,
      nome: 'Clara Costa',
      cargo: 'Dor nas costas',
      texto: 'Sofria com dores crônicas nas costas há anos. O tratamento personalizado da Dra. Lorena Alves me devolveu a qualidade de vida. Profissional excepcional!',
      estrelas: 5
    }
  ];

  return (
    <>
      <Header />
      
      <main className="container-fluid p-0">
        {/* Hero Section */}
        <section className="home py-5">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 conteudo-texto">
            <div className="titulo-home mb-4">
              <h1 className="display-4 fw-bold">
                Cuidado Especializado 
                <br />
                <span className="text-primary">para sua Recuperação</span>
              </h1>
            </div>
            <div className="paragrafo-home mb-4">
              <p className="lead">
                Fisioterapia personalizada com técnicas avançadas para sua reabilitação completa.
                <br />
                Mais de 10 anos de experiência cuidando da sua saúde e bem-estar.
              </p>
            </div>
            <div className="botoes-home mb-4">
              <button className="btn btn-primary btn-lg me-2 mb-2">Agendar Consulta</button>
              <button className="btn btn-outline-primary btn-lg mb-2">Conhecer Serviços</button>  
            </div>
            <div className="cards-home row g-3">
              <div className="col-6 col-md-3">
                <div className="card h-100 text-center p-3 shadow-sm">
                  <i className="bi bi-award fs-1 text-primary"></i>
                  <p className="mb-0 mt-2 fw-bold">Especializada</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card h-100 text-center p-3 shadow-sm">
                  <i className="bi bi-people fs-1 text-primary"></i>
                  <p className="mb-0 mt-2 fw-bold">500+ Pacientes</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card h-100 text-center p-3 shadow-sm">
                  <i className="bi bi-clock-history fs-1 text-primary"></i>
                  <p className="mb-0 mt-2 fw-bold">10+ Anos</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card h-100 text-center p-3 shadow-sm">
                  <i className="bi bi-check-circle fs-1 text-primary"></i>
                  <p className="mb-0 mt-2 fw-bold">Resultados</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 img-doutora text-center mt-4 mt-lg-0">
            <img
               src={imagemDoutora} 
              className="img-fluid rounded shadow" 
              alt="Imagem da doutora" 
              style={{ maxWidth: '500px' }}
            />
          </div>
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="sobre bg-light py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 mb-4 mb-lg-0">
                <img 
                  src={imagemDoutora} 
                  className="img-fluid rounded shadow" 
                  alt="Foto da doutora Lorena Alves"
                />
              </div>
              <div className="col-lg-8">
                <div className="titulo-sobre mb-4">
                  <h2 className="display-5 fw-bold">Sobre Dra. Lorena Alves</h2>
                  <p className="lead">
                    Fisioterapeuta formada pela Universidade Federal com especialização em Fisioterapia Neurológica e Ortopédica.
                    Mais de 10 anos de experiência dedicados ao cuidado e reabilitação de pacientes.
                  </p>
                  <p>
                    Minha missão é proporcionar tratamentos personalizados e eficazes, 
                    sempre priorizando o bem-estar e a recuperação completa de cada paciente.
                  </p>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center">
                        <i className="bi bi-mortarboard fs-1 text-primary"></i>
                        <h5 className="card-title mt-2">Formação Acadêmica</h5>
                        <p className="card-text">Universidade Federal</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center">
                        <i className="bi bi-hospital fs-1 text-primary"></i>
                        <h5 className="card-title mt-2">Experiência Profissional</h5>
                        <p className="card-text">+10 anos</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center">
                        <i className="bi bi-star fs-1 text-primary"></i>
                        <h5 className="card-title mt-2">Abordagem Humanizada</h5>
                        <p className="card-text">Tratamento centrado no paciente</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center">
                        <i className="bi bi-briefcase fs-1 text-primary"></i>
                        <h5 className="card-title mt-2">Atendimento Personalizado</h5>
                        <p className="card-text">200+ Atendidos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section id="servicos" className="servicos py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold">Serviços Especializados</h2>
              <p className="lead">
                Oferecemos uma ampla gama de tratamentos fisioterapêuticos 
                personalizados para atender suas necessidades específicas de reabilitação.
              </p>
            </div>
            <div className="row g-4">
              {servicos.map((servico) => (
                <div key={servico.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow">
                    <div className="card-body text-center">
                      <i className={`bi ${servico.icone} fs-1 text-primary mb-3`}></i>
                      <h5 className="card-title">{servico.titulo}</h5>
                      <p className="card-text">{servico.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section id="depoimentos" className="depoimentos bg-light py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold">O que Dizem Nossos Pacientes</h2>
              <p className="lead">
                Histórias reais de recuperação e transformação através do 
                cuidado especializado.
              </p>
            </div>
            <div className="row g-4">
              {depoimentos.map((depoimento) => (
                <div key={depoimento.id} className="col-lg-4">
                  <div className="card h-100 border-0 shadow">
                    <div className="card-body">
                      <div className="text-warning mb-3">
                        {[...Array(depoimento.estrelas)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                      </div>
                      <blockquote className="blockquote">
                        <p className="mb-4">{depoimento.texto}</p>
                      </blockquote>
                      <hr />
                      <p className="fw-bold mb-0">{depoimento.nome}</p>
                      <small className="text-muted">{depoimento.cargo}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contato Section */}
        <section id="contatos" className="contato py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold">Entre em Contato</h2>
              <p className="lead">
                Estamos aqui para ajudar você. Entre em contato conosco para agendar
                sua consulta ou esclarecer suas dúvidas.
              </p>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <i className="bi bi-geo-alt fs-1 text-primary mb-3"></i>
                    <h5 className="card-title">Localização</h5>
                    <p className="card-text">Rua Exemplo, 123<br />Centro, Cidade - UF</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <i className="bi bi-telephone fs-1 text-primary mb-3"></i>
                    <h5 className="card-title">Telefone</h5>
                    <p className="card-text">(00) 1234-5678</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <i className="bi bi-envelope fs-1 text-primary mb-3"></i>
                    <h5 className="card-title">Email</h5>
                    <p className="card-text">contato@clinicaexemplo.com</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <i className="bi bi-clock fs-1 text-primary mb-3"></i>
                    <h5 className="card-title">Horário</h5>
                    <p className="card-text">Segunda a Sexta<br />8h às 18h</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-8 mx-auto">
                <div className="card border-0 shadow">
                  <div className="card-body p-4">
                    <h4 className="card-title text-center mb-4">
                      <i className="bi bi-person-plus-fill text-primary me-2"></i>
                      Cadastre-se em nossa Clínica
                    </h4>
                    
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

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                          <i className="bi bi-person"></i> Seu Nome *
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="nome" 
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Digite seu nome completo" 
                          required 
                          disabled={loading}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          <i className="bi bi-envelope"></i> Seu Email *
                        </label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Digite seu email" 
                          required 
                          disabled={loading}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="senha" className="form-label">
                          <i className="bi bi-lock"></i> Sua Senha *
                        </label>
                        <input 
                          type="password" 
                          className="form-control" 
                          id="senha" 
                          name="senha"
                          value={formData.senha}
                          onChange={handleInputChange}
                          placeholder="Digite sua senha" 
                          required 
                          disabled={loading}
                          minLength={6}
                        />
                        <div className="form-text">A senha deve ter no mínimo 6 caracteres</div>
                      </div>
                      <div className="d-grid gap-2">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Cadastrando...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-circle me-2"></i>
                              Realizar Cadastro
                            </>
                          )}
                        </button>
                        <Link to="/login" className="btn btn-outline-secondary">
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Já tenho cadastro - Fazer Login
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Botão Flutuante */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <Link 
          className="btn btn-primary btn-lg rounded-circle shadow" 
          to="/atividades" 
          aria-label="Ir para atividades"
        >
          <i className="bi bi-card-list"></i>
        </Link>
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
