import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import "./App.css";
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";
import Inicio from "./pages/Inicio/Inicio.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/EsqueceuSenha" element={<EsqueceuSenha />} />
        <Route path="/Inicio" element={<Inicio />} />
      </Routes>
    </>
  );
}

export default App;
