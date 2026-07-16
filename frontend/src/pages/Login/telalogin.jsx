import React from 'react';
import styles from './telalogin.module.css';
import {Link} from 'react-router-dom';

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, preencha o usuário e a senha.');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      alert(`Olá, ${username}! Login efetuado com sucesso!`);
      setIsLoading(false);
    }, 1200);
  };

 return (
  <div className={styles.loginPage}>
    <div className={styles.loginCard}>
      {/* Logo Centralizada interna */}
      <div className={styles.cardLogo}>
        <div className={styles.rayIcon}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className={styles.logoTitle}>
          Flash<span className={styles.logoSuffix}>View</span>
        </h1>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputBox}>
          <label htmlFor="username">Login</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div className={styles.forgotContainer}>
            <Link  to ="/EsqueceuSenha "className={styles.forgotLink}>Esqueceu a senha?</Link>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className={styles.submitBtn}>
          {isLoading ? 'Entrando...' : 'Login'}
        </button>

        <div className={styles.footerRegister}>
          Novo por aqui? <Link to ='/Cadastro'>Cadastrar </Link>
        </div>
      </form>
    </div>
  </div>
);
}

export default Login;