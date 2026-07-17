import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span>⚡</span> FlashView
      </div>
      <div className={styles.searchSidebar}>
        <input type="text" placeholder="Pesquisar..." />
      </div>
      <nav className={styles.menu}>
        <Link to="/Inicio" className={location.pathname === '/Inicio' ? styles.active : ''}>🏠 Início</Link>
        <Link to="/Catalogo" className={location.pathname === '/Catalogo' ? styles.active : ''}>📂 Catálogo</Link>
        <Link to="/minha-lista" className={location.pathname === '/minha-lista' ? styles.active : ''}>🔖 Minha Lista</Link>
        <a href="#assistidos">✅ Assistidos</a>
      </nav>
    </aside>
  );
}