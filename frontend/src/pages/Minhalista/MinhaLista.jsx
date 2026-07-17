import React, { useState, useEffect } from 'react';
import styles from './MinhaLista.module.css';
import Sidebar from '../../components/Sidebar.jsx';
import MovieCard from '../../components/MovieCard.jsx';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = "https://image.tmdb.org/t/p/w300";

export default function MinhaLista() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState("todos");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Busca a lista de gêneros da API
  useEffect(() => {
    async function fetchGeneros() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
        const data = await response.json();
        setGeneros(data.genres || []);
      } catch (err) {
        console.error("Erro ao buscar gêneros: ", err);
      }
    }
    fetchGeneros();
  }, []);

  // Busca os filmes da API com base no gênero selecionado
  useEffect(() => {
    async function fetchFilmes() {
      try {
        setCarregando(true);
        setErro(null);

        // Nota: Idealmente, aqui você buscaria de um endpoint do seu backend
        // que retorna os filmes salvos pelo usuário.
        // Como exemplo, vamos buscar os filmes mais bem avaliados.
        let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=pt-BR`;

        if (generoSelecionado !== "todos") {
          url += `&with_genres=${generoSelecionado}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Não foi possível carregar os filmes.");
        }
        const data = await response.json();

        // Filtra os resultados no lado do cliente se a API não suportar filtro direto na URL de "top_rated"
        // A API `discover` é melhor para isso, mas `top_rated` serve como exemplo.
        setFilmes(data.results || []);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }
    fetchFilmes();
  }, [generoSelecionado]);

  return (
    <div className={styles.container}>
      <Sidebar />

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

        <section className={styles.filterSection}>
          <span className={styles.filterLabel}>Gênero:</span>
          <div className={styles.badgeContainer}>
            <button
              className={`${styles.badge} ${generoSelecionado === 'todos' ? styles.badgeActive : ''}`}
              onClick={() => setGeneroSelecionado('todos')}
            >
              Todos
            </button>
            {generos.map((genero) => (
              <button
                key={genero.id}
                className={`${styles.badge} ${generoSelecionado === String(genero.id) ? styles.badgeActive : ''}`}
                onClick={() => setGeneroSelecionado(String(genero.id))}
              >
                {genero.name}
              </button>
            ))}
          </div>
        </section>

        {carregando && <p className={styles.statusMsg}>Carregando sua lista...</p>}
        {erro && <p className={styles.statusMsg}>Erro: {erro}</p>}

        {!carregando && !erro && (
          <section className={styles.movieGrid}>
            {filmes.length > 0 ? (
              filmes.map((filme) => (
                <MovieCard
                  key={filme.id}
                  id={filme.id}
                  titulo={filme.title}
                  subtitulo={filme.release_date ? filme.release_date.slice(0, 4) : ""}
                  poster={filme.poster_path ? `${IMG_BASE}${filme.poster_path}` : null}
                  mostrarBotaoAdd={false} // O botão de adicionar não faz sentido aqui
                />
              ))
            ) : (
              <p className={styles.statusMsg}>Nenhum filme encontrado para este gênero.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}