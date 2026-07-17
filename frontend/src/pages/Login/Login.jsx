import React from "react";
import "./Login.css"; 
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx"; 

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor, preencha o usuário e a senha.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      alert(`Olá, ${username}! Login efetuado com sucesso!`);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      <Navbar /> {/* Mantendo o padrão das telas de autenticação */}
      {/* Classes alteradas para string (padrão global) */}
      <div className="loginPage">
        <div className="loginCard">
          {/* Logo Centralizada interna */}
          <div className="cardLogo">
            <div className="rayIcon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="logoTitle">
              Flash<span className="logoSuffix">View</span>
            </h1>
          </div>

          {error && <div className="errorAlert">{error}</div>}

          <form onSubmit={handleSubmit} className="form">
            <div className="inputBox">
              <label htmlFor="username">Login</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="inputBox">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div className="forgotContainer">
                {/* Removi um espaço em branco que estava sobrando no link */}
                <Link to="/EsqueceuSenha" className="forgotLink">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="submitBtn">
              {isLoading ? "Entrando..." : "Login"}
            </button>

            <div className="footerRegister">
              Novo por aqui? <Link to="/Cadastro">Cadastrar</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
