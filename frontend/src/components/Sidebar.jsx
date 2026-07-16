import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import iconeInicio from "../assets/icons/icone_inicio.svg";
import iconeCatalogo from "../assets/icons/icone_catalogo.svg";
import iconeMinhaLista from "../assets/icons/icone_minha_lista.svg";
import iconeAssistidos from "../assets/icons/icone_assistidos.svg";
import Icon from "../assets/flashview_simbolo.svg";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        {/* LOGO */}
        <div className="sidebar-logo">
          <img src={Icon} alt="FlashView Logo" className="logo-icon" />
          <h2>
            Flash<span>View</span>
          </h2>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className="sidebar-nav">
          <Link
            to="/inicio"
            className={`nav-item ${location.pathname === "/inicio" ? "active" : ""}`}
          >
            <img src={iconeInicio} alt="Ícone Início" className="menu-icon" />
            Inicio
          </Link>

          <Link
            to="/catalogo"
            className={`nav-item ${location.pathname === "/catalogo" ? "active" : ""}`}
          >
            <img
              src={iconeCatalogo}
              alt="Ícone Catálogo"
              className="menu-icon"
            />
            Catálogo
          </Link>

          <Link
            to="/minha-lista"
            className={`nav-item ${location.pathname === "/minha-lista" ? "active" : ""}`}
          >
            <img
              src={iconeMinhaLista}
              alt="Ícone Minha Lista"
              className="menu-icon"
            />
            Minha Lista
          </Link>

          <Link
            to="/assistidos"
            className={`nav-item ${location.pathname === "/assistidos" ? "active" : ""}`}
          >
            <img
              src={iconeAssistidos}
              alt="Ícone Assistidos"
              className="menu-icon"
            />
            Assistidos
          </Link>
        </nav>
      </div>

      {/* PERFIL DO USUÁRIO */}
      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="user-avatar">LR</div>
          <span className="user-name">Lucas</span>
        </div>
      </div>
    </aside>
  );
}
