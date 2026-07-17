import { Routes, Route} from 'react-router-dom';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Navbar from "./components/Navbar";
import './App.css';
import EsqueceuSenha from "./pages/esqueceuSenha/EsqueceuSenha";
import Login from "./pages/Login/telalogin.jsx";
import MinhaLista from './pages/MinhaLista/MinhaLista.jsx';


function App() {

  return (
    <>
      {/* 
        O Navbar pode ficar fora do <Routes> para aparecer em todas as páginas,
        mas a página MinhaLista já tem sua própria sidebar, então o Navbar global
        foi removido para este exemplo. Você pode ajustar conforme a necessidade.
      */}
      {/* <Navbar/> */}
      
      <Routes>
        {/* As rotas definem qual componente renderizar para cada URL */}
        <Route  path='/' element={<Login />} /> 
        <Route  path='/Cadastro' element={<Cadastro />} />
        <Route path='/EsqueceuSenha'  element = {<EsqueceuSenha/>}/>
        <Route path="/minha-lista" element={<MinhaLista />} />
      </Routes>


    </>
  )
}

export default App;
