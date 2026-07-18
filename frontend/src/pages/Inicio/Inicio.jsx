import { useEffect, useState } from "react";
import { useNavigate, Link,  } from "react-router-dom";

import Sidebar from "../../components/Sidebar.jsx";
import StatCard from "../../components/StatCard.jsx";
import SeriesCard from "../../components/SeriesCard.jsx";
import MovieCard from "../../components/MovieCard.jsx";

import styles from "./Inicio.module.css";

import iconeLupa from "../../assets/icons/lupa.svg";
import iconeAssistidos from "../../assets/icons/icone_assistidos.svg";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = "https://image.tmdb.org/t/p/w300";

export default function Inicio() {

  const [busca, setBusca] = useState("");
  const [resultadoBusca, setResultadoBusca] = useState([]);
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState("todos");
  const navigate = useNavigate();
  const usuarioNome = localStorage.getItem("usuarioNome") || "Usuário";


  const estatisticas = [
    { id: 1, valor: "32", legenda: "Assistidos", corTexto: "text-orange" },
    { id: 2, valor: "18", legenda: "Quero Assistir", corTexto: "text-cyan" },
    { id: 3, valor: "7", legenda: "Series em Dia", corTexto: "text-white" },
  ];

  const seriesEmAndamento = [
    {
      id: 1,
      titulo: "Game of Thrones",
      subtitulo: "Próximo: T5 Ep 5",
      textoBotao: "Marcar assistido",
      finalizado: false,
    },
    {
      id: 2,
      titulo: "Mr. Robot",
      subtitulo: "Próximo: T2 Ep 9",
      textoBotao: "Marcar assistido",
      finalizado: false,
    },
    {
      id: 3,
      titulo: "La Casa de Papel",
      subtitulo: "Próximo: T3 Ep 2",
      textoBotao: "Assistido",
      finalizado: true,
    },
  ];

  useEffect(() => {

    carregarFilmes();

}, [generoSelecionado]);

  useEffect(() => {
  carregarGeneros();
}, []);

  useEffect(() => {

    if (busca.trim() === "") {
      setResultadoBusca([]);
      return;
    }

    const timeout = setTimeout(() => {
      pesquisarFilmes();
    }, 300);

    return () => clearTimeout(timeout);

  }, [busca]);

  async function carregarFilmes() {

    try {

        let url;

        if (generoSelecionado === "todos") {

            url =
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;

        } else {

            url =
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${generoSelecionado}`;

        }

        const response = await fetch(url);

        const data = await response.json();

        setFilmesPopulares(data.results.slice(0,6));

    } catch (erro) {

        console.log(erro);

    }

}

  async function pesquisarFilmes() {

    try {

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(busca)}`
      );

      const data = await response.json();

      setResultadoBusca(data.results.slice(0, 6));

    } catch (erro) {

      console.error("Erro na pesquisa:", erro);

    }

  }

  async function carregarGeneros() {

  try {

    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
    );

    const data = await response.json();

    setGeneros(data.genres || []);

  } catch (erro) {

    console.error("Erro ao carregar gêneros:", erro);

  }

}

  return (
    <div className={styles.layoutContainer}>

      <Sidebar />

      <main className={styles.inicioContent}>

        {/* PESQUISA */}
        <header className={styles.inicioHeader}>

          <div className={styles.searchBar}>

            <img
              src={iconeLupa}
              alt="Pesquisar"
              style={{ width: "18px", height: "18px" }}
            />

            <input
              type="text"
              placeholder="Pesquisar filmes..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

          </div>

        </header>

        {/* RESULTADOS DA BUSCA */}
        {resultadoBusca.length > 0 && (

          <section className={styles.contentSection}>

            <div className={styles.sectionHeader}>
              <h3>Resultados da Pesquisa</h3>
            </div>

            <div className={styles.moviesGrid}>

              {resultadoBusca.map((filme) => (

                <MovieCard
                  key={filme.id}
                  id={filme.id}
                  titulo={filme.title}
                  subtitulo={
                    filme.release_date
                      ? filme.release_date.slice(0, 4)
                      : ""
                  }
                  poster={
                    filme.poster_path
                      ? `${IMG_BASE}${filme.poster_path}`
                      : null
                  }
                  mostrarBotaoAdd={false}
                />

              ))}

            </div>

          </section>

        )}

        {/* BOAS-VINDAS */}
        <section className={styles.welcomeSection}>

        <span className={styles.userName}>{usuarioNome}</span>

          <p>O que você quer organizar hoje?</p>

          <div className={styles.statsGrid}>

            {estatisticas.map((stat) => (

              <StatCard
                key={stat.id}
                valor={stat.valor}
                legenda={stat.legenda}
                corTexto={stat.corTexto}
              />

            ))}

          </div>

        </section>

        {/* SÉRIES */}
        <section className={styles.contentSection}>

          <div className={styles.sectionHeader}>

            <h3>Séries em Andamento</h3>

            <a href="#" className={styles.linkCyan}>
              Ver tudo
            </a>

          </div>

          <div className={styles.seriesGrid}>

            {seriesEmAndamento.map((serie) => (

              <SeriesCard
                key={serie.id}
                titulo={serie.titulo}
                subtitulo={serie.subtitulo}
                textoBotao={serie.textoBotao}
                finalizado={serie.finalizado}
                iconeAssistido={iconeAssistidos}
              />

            ))}

          </div>

        </section>

        {/* POPULARES */}
        <section className={styles.contentSection}>

          <div className={styles.sectionHeader}>

            <h3>Populares no Catálogo</h3>

            <Link to="/Catalogo" className={styles.linkCyan}>
              Ver tudo
            </Link>

          </div>

          <div className={styles.moviesGrid}>

            {filmesPopulares.map((filme) => (

              <MovieCard
                key={filme.id}
                id={filme.id}
                titulo={filme.title}
                subtitulo={
                  filme.release_date
                    ? filme.release_date.slice(0, 4)
                    : ""
                }
                poster={
                  filme.poster_path
                    ? `${IMG_BASE}${filme.poster_path}`
                    : null
                }
                mostrarBotaoAdd={true}
              />

            ))}

          </div>

        </section>

        {/* CATEGORIAS */}
<section className={styles.contentSection}>

    <div className={styles.sectionHeader}>

        <h3>Explorar por Categoria</h3>

        <Link
            to="/Catalogo"
            className={styles.linkCyan}
        >
            Ver catálogo
        </Link>

    </div>

    <div className={styles.categoriesList}>

        <span
            className={`${styles.categoryPill} ${
                generoSelecionado === "todos"
                    ? styles.active
                    : ""
            }`}
            onClick={() => setGeneroSelecionado("todos")}
        >
            Todos
        </span>

        {generos.map((genero) => (

            <span
                key={genero.id}
                className={`${styles.categoryPill} ${
                    generoSelecionado === String(genero.id)
                        ? styles.active
                        : ""
                }`}
                onClick={() =>
                    setGeneroSelecionado(String(genero.id))
                }
            >
                {genero.name}
            </span>

        ))}

    </div>

  </section>

    <footer className={styles.tmdbAttribution}>
      <p>Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
    </footer>
      </main>


  </div>
  );
}
