import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Navbar from "./components/Navbar/Navbar.jsx";
import './App.css';
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";
import Login from "./pages/Login/telalogin.jsx"; // 1. Renomeado para PascalCase


function App() {

  return (
    <>
      {/* O Navbar fica fora do <Routes> para aparecer em todas as páginas */}
      <Navbar/>
      {/* O <main> ajuda a centralizar o conteúdo da página */}
      <main className="page-container">
      <Routes>
        {/* 2. Adicionada a rota para a página de Login */}
        <Route  path='/' element={<Login />} /> 
        <Route  path='/Cadastro' element={<Cadastro />} />
        <Route path='/EsqueceuSenha'  element = {<EsqueceuSenha/>}/>
      </Routes>


      </main>
    </>
  )
}

export default App;