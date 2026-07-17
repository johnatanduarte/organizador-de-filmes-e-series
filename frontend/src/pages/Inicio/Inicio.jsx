import { useEffect, useState } from "react";
import { useNavigate, Link,  } from "react-router-dom";

import Sidebar from "../../components/Sidebar.jsx";
import StatCard from "../../components/StatCard.jsx";
import SeriesCard from "../../components/SeriesCard.jsx";
import MovieCard from "../../components/MovieCard.jsx";

import "./Inicio.css";

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

        setFilmesPopulares(data.results.slice(0,5));

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
    <div className="layout-container">

      <Sidebar />

      <main className="inicio-content">

        {/* PESQUISA */}
        <header className="inicio-header">

          <div className="search-bar">

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

          <section className="content-section">

            <div className="section-header">
              <h3>Resultados da Pesquisa</h3>
            </div>

            <div className="movies-grid">

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
        <section className="welcome-section">

          <h1>Olá, Lucas</h1>

          <p>O que você quer organizar hoje?</p>

          <div className="stats-grid">

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
        <section className="content-section">

          <div className="section-header">

            <h3>Séries em Andamento</h3>

            <a href="#" className="link-cyan">
              Ver tudo
            </a>

          </div>

          <div className="series-grid">

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
        <section className="content-section">

          <div className="section-header">

            <h3>Populares no Catálogo</h3>

            <Link to="/Catalogo" className="link-cyan">
              Ver tudo
            </Link>

          </div>

          <div className="movies-grid">

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
     {/* CATEGORIAS */}
<section className="content-section categories-section">

    <div className="section-header">

        <h3>Explorar por Categoria</h3>

        <Link
            to="/Catalogo"
            className="link-cyan"
        >
            Ver catálogo
        </Link>

    </div>

    <div className="categories-list">

        <span
            className={`category-pill ${
                generoSelecionado === "todos"
                    ? "active"
                    : ""
            }`}
            onClick={() => setGeneroSelecionado("todos")}
        >
            Todos
        </span>

        {generos.map((genero) => (

            <span
                key={genero.id}
                className={`category-pill ${
                    generoSelecionado === String(genero.id)
                        ? "active"
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

    <footer className="tmdb-attribution">
      <p>Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
    </footer>
      </main>


  </div>
  );
}