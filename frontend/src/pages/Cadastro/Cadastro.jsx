<<<<<<< HEAD
import { useState } from "react"; // O hook useState é a função que permite um componente "guardar" e atualizar dados que, quando mudam, fazem a tela renderizar sozinha.
import { Link } from 'react-router-dom';
import './Cadastro.css';

=======
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Cadastro.css"; // Ajustado o caminho do CSS para a mesma pasta
>>>>>>> 63912172cede746ca550e544a757da0d58af9b4b

const Cadastro = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    } else {
      alert("O formulário foi enviado com sucesso!");
    }

    console.log("Dados do cadastro : ", formData);
    // Aqui entra a chamada pra API/backend, salvando o usuário
  }

  return (
    <>
      {/* Navbar renderizado no topo da página de Cadastro */}
      <Navbar />

      <div className="register-page">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Cadastro</h2>

          <label>Nome Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>E-mail </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Senha </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label> Confirmar Senha </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="btn-submit">
            Cadastrar
          </button>

          <div className="login-redirect">
            Já Possui Uma Conta? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Cadastro;
