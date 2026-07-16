import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import "./App.css";
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";
import Inicio from "./pages/Inicio/Inicio.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/EsqueceuSenha" element={<EsqueceuSenha />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
