import { useState } from "react";
// Adicionado o 'useNavigate' no import do react-router-dom
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx"; // Importando o Navbar
import "./EsqueceuSenha.css";

export default function EsqueceuSenha() {
  const [contato, setContato] = useState("");
  const [codigo, setCodigo] = useState("");
  const [etapa, setEtapa] = useState(1); // 1 = Digitar e-mail/telefone, 2 = Digitar código
  const navigate = useNavigate();

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

  const handleVoltar = () => {
    navigate("/"); // Navega de volta para a rota principal de Login
  };

  return (
    <>
      {/* Adicionado o Navbar no topo */}
      <Navbar />

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
                    required
                  />
                </div>

                <div className="actions-row space-between">
                  {/* Conectado o evento onClick ao handleVoltar */}
                  <button
                    type="button"
                    className="btn-solid btn-small"
                    onClick={handleVoltar}
                  >
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
                    required
                  />
                </div>

                <div className="actions-row center">
                  <button type="submit" className="btn-solid btn-medium">
                    Enviar
                  </button>
                </div>

                <p className="footer-text">
                  Já Possui Uma Conta?{" "}
                  <Link to="/" className="link-highlight">
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
