import { useState } from "react";
import "./EsqueceuSenha.css";
import flashview from "../../assets/flashview.png";

export default function EsqueceuSenha() {
  const [contato, setContato] = useState("");
  const [codigo, setCodigo] = useState("");
  const [etapa, setEtapa] = useState(1); // 1 = Digitar e-mail/telefone, 2 = Digitar código

  const handleProcurar = (e) => {
    e.preventDefault();
    // Simula a busca do usuário e avança para a próxima tela
    setEtapa(2);
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    // Simula o envio do código validado
    console.log("Código enviado:", codigo);
  };

  return (
      <>
    <div className="esqueceu-senha-page">

      {/*} //CABEÇALHO (Header) 
      <header className="navbar">
        <div className="logo-container">
           Coloque o caminho da sua imagem do raio aqui no src 
          <img src={flashview} alt="Raio Logo" className="logo-icon" />
          <h1 className="logo-text">
            Flash<span className="text-highlight">View</span>
          </h1>
        </div>
        <div className="navbar-actions">
          <button className="btn-outline">Entrar</button>
          <button className="btn-solid">Cadastrar</button>
        </div>
      </header> /*} 
      

      {/* CONTEÚDO PRINCIPAL */}
      <main className="main-content">
        <div className="card">
          <h2 className="card-title">Esqueceu a Senha</h2>

          {etapa === 1 ? (
            /* =========================================
               ETAPA 1: SOLICITAR E-MAIL / TELEFONE
               ========================================= */
            <form onSubmit={handleProcurar} className="form-container">
              <div className="input-group">
                <label htmlFor="contato">E-mail/ Telefone</label>
                <input
                  type="text"
                  id="contato"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="actions-row space-between">
                {/* Botão voltar (depois vocês configuram a rota com React Router) */}
                <button type="button" className="btn-solid btn-small">
                  Voltar
                </button>
                <button type="submit" className="btn-solid btn-small">
                  Procurar
                </button>
              </div>
            </form>
          ) : (
            /* =========================================
               ETAPA 2: DIGITAR CÓDIGO RECEBIDO
               ========================================= */
            <form onSubmit={handleEnviar} className="form-container">
              <p className="instruction-text">
                Informe o codígo enviado
                <br />
                por e-mail/sms
              </p>

              <div className="input-group">
                <input
                  type="text"
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="actions-row center">
                <button type="submit" className="btn-solid btn-medium">
                  Enviar
                </button>
              </div>

              <p className="footer-text">
                Já Possui Uma Conta?{" "}
                <a href="/login" className="link-highlight">
                  Login
                </a>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
    </>
  );
}
