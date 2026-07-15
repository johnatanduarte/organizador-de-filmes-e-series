import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Navbar from "./components/Navbar";
import './App.css';
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";


function App() {

  return (
    <>
      <Navbar/>

      <Routes>
        <Route  path='/Cadastro' element={<Cadastro />} />
        <Route path='/EsqueceuSenha'  element = {<EsqueceuSenha/>}/>
      </Routes>


    </>
  )
}

export default App;
