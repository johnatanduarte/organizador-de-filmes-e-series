import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import "./App.css";
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";
import Inicio from "./pages/Inicio/Inicio.jsx";
import Login from "./pages/Login/Login.jsx";
import Catalogo from "./pages/Catalogo/Catalogo.jsx"
import DetalhesFilme from "./pages/DetalhesFilme/DetalhesFilme";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/EsqueceuSenha" element={<EsqueceuSenha />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Catalogo" element={<Catalogo />}/>
        <Route path="/filme/:id" element={<DetalhesFilme />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
