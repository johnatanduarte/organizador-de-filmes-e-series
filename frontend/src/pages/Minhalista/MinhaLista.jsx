import React from 'react';
import styles from './MinhaLista.module.css';

// Mock de dados para os filmes (você pode substituir por uma API depois)
const filmes = [
  { id: 1, titulo: 'Duna', genero: 'Ficção', ano: 2021 },
  { id: 2, titulo: 'Oppenheimer', genero: 'Drama', ano: 2023 },
  { id: 3, titulo: 'Parasita', genero: 'Drama', ano: 2019 },
  { id: 4, titulo: 'Us', genero: 'Terror', ano: 2019 },
  { id: 5, titulo: 'Coringa', genero: 'Drama', ano: 2019 },
  { id: 6, titulo: 'John Wick', genero: 'Ação', ano: 2014 },
  { id: 7, titulo: 'Interestelar', genero: 'Ficção', ano: 2014 },
  { id: 8, titulo: 'Vingadores', genero: 'Ação', ano: 2012 },
];

const generos = ['Todos', 'Ação', 'Drama', 'Ficção', 'Comédia', 'Terror', 'Animação'];

export default function MinhaLista() {
  return (
    <div className={styles.container}>
      {/* 1. SIDEBAR LATERAL */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>⚡</span> FlashView
        </div>
        
        <div className={styles.searchSidebar}>
          <input type="text" placeholder="Pesquisar..." />
        </div>

        <nav className={styles.menu}>
          <a href="#inicio">🏠 Início</a>
          <a href="#catalogo">📂 Catálogo</a>
          <a href="#minhalista" className={styles.active}>🔖 Minha Lista</a>
          <a href="#assistidos">✅ Assistidos</a>
        </nav>
      </aside>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div>
            <h1>Minha Lista</h1>
            <p>Bem-vindo de volta! Aqui estão os títulos que você guardou para maratonar quando quiser.</p>
          </div>
          <div className={styles.topSearch}>
            <input type="text" placeholder="🔍 Pesquisar" />
          </div>
        </header>

        {/* 3. FILTROS (BADGES) */}
        <section className={styles.filterSection}>
          <span className={styles.filterLabel}>Gênero:</span>
          <div className={styles.badgeContainer}>
            {generos.map((gen) => (
              <button 
                key={gen} 
                className={gen === 'Todos' ? `${styles.badge} ${styles.badgeActive}` : styles.badge}
              >
                {gen}
              </button>
            ))}
          </div>
        </section>

        {/* 4. GRID DE FILMES */}
        <section className={styles.movieGrid}>
          {filmes.map((filme) => (
            <div key={filme.id} className={styles.movieCard}>
              <div className={styles.cardThumbnail}>
                <span className={styles.bookmarkIcon}>🔖</span>
              </div>
              <div className={styles.cardInfo}>
                <h3>{filme.titulo}</h3>
                <p>{filme.genero} • {filme.ano}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}