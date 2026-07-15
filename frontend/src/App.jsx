import { useState } from 'react'
import { Routes, Route} from 'react-router-dom';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Navbar from "./components/Navbar";
import './App.css'


function App() {

  return (
    <>
      <Navbar/>

      <Routes>
        <Route  path="/Cadastro " element={<Cadastro />} />
      </Routes>

      <Cadastro>

      </Cadastro>
    </>
  )
}

export default App
