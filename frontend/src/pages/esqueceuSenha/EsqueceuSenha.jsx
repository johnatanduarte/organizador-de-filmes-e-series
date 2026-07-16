import { useState } from "react";
import { Link } from "react-router-dom";
import "./EsqueceuSenha.css";

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
                  <Link to="/" className="link-highlight"> {/* Trocado <a> por <Link> e href por to */}
                    Login
                  </Link>
                </p>
              </form>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
