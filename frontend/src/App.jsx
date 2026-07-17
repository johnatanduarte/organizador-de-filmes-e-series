import { Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import './App.css';
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";
import Login from "./pages/Login/Login.jsx";
import MinhaLista from './pages/MinhaLista/MinhaLista.jsx';
import Inicio from "./pages/Inicio/Inicio.jsx";
import Catalogo from "./pages/Catalogo/Catalogo.jsx"
import DetalhesFilme from "./pages/DetalhesFilme/DetalhesFilme";

function App() {
  return (
    <>
      <Routes>
        {/* Rotas combinadas de ambas as versões */}
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/EsqueceuSenha" element={<EsqueceuSenha />} />
        <Route path="/minha-lista" element={<MinhaLista />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Catalogo" element={<Catalogo />} />
        <Route path="/filme/:id" element={<DetalhesFilme />} />
      </Routes>
    </>
  );
}

export default App;
