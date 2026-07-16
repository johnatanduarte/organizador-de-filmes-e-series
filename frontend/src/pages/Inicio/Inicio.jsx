import Sidebar from "../../components/Sidebar.jsx";
import StatCard from "../../components/StatCard.jsx";
import SeriesCard from "../../components/SeriesCard.jsx";
import MovieCard from "../../components/MovieCard.jsx";
import "./Inicio.css";

import iconeLupa from "../../assets/icons/lupa.svg";
import iconeAssistidos from "../../assets/icons/icone_assistidos.svg";

export default function Inicio() {
  // Simulando os dados que virão do seu Banco de Dados / API no futuro
  const estatisticas = [
    { id: 1, valor: "32", legenda: "Assistidos", corTexto: "text-orange" },
    { id: 2, valor: "18", legenda: "Quero Assistir", corTexto: "text-cyan" },
    { id: 3, valor: "7", legenda: "Series em Dia", corTexto: "text-white" },
  ];

  const seriesEmAndamento = [
    { id: 1, titulo: "Game of Thrones", subtitulo: "Proximo: T5 Ep 5", textoBotao: "Marcar assistido", finalizado: false },
    { id: 2, titulo: "Mr. Robot", subtitulo: "Proximo: T2 Ep 9", textoBotao: "Marcar assistido", finalizado: false },
    { id: 3, titulo: "La Casa de Papel", subtitulo: "Proximo: T3 Ep 2", textoBotao: "Assistido", finalizado: true },
  ];

  const filmesPopulares = [
    { id: 1, titulo: "Interestelar", mostrarBotaoAdd: true },
    { id: 2, titulo: "Clube da Luta", mostrarBotaoAdd: false },
    { id: 3, titulo: "Forrest Gump", mostrarBotaoAdd: false },
    { id: 4, titulo: "Vingadores", mostrarBotaoAdd: false },
    { id: 5, titulo: "Parasita", mostrarBotaoAdd: false },
    { id: 6, titulo: "Duna", mostrarBotaoAdd: false },
  ];

  const categorias = ["Ação", "Drama", "Ficção", "Comedia", "Terror", "Romance", "Animação"];

  return (
    <div className="layout-container">
      <Sidebar />

      <main className="inicio-content">
        {/* BARRA DE PESQUISA */}
        <header className="inicio-header">
          <div className="search-bar">
            <img src={iconeLupa} alt="Pesquisar" style={{ width: "18px", height: "18px" }} />
            <input type="text" placeholder="Pesquisar" />
          </div>
        </header>

        {/* SAUDAÇÃO E ESTATÍSTICAS */}
        <section className="welcome-section">
          <h1>Ola, Lucas</h1>
          <p>O que voce quer organizar hoje?</p>

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

        {/* SERIES EM ANDAMENTO */}
        <section className="content-section">
          <div className="section-header">
            <h3>Series em Andamento</h3>
            <a href="#" className="link-cyan">Ver tudo</a>
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

        {/* POPULARES NO CATÁLOGO */}
        <section className="content-section">
          <div className="section-header">
            <h3>Populares no Catálogo</h3>
            <a href="#" className="link-cyan">Ver tudo</a>
          </div>

          <div className="movies-grid">
            {filmesPopulares.map((filme) => (
              <MovieCard
                key={filme.id}
                titulo={filme.titulo}
                mostrarBotaoAdd={filme.mostrarBotaoAdd}
              />
            ))}
          </div>
        </section>

        {/* EXPLORAR POR CATEGORIA */}
        <section className="content-section categories-section">
          <h3>Explorar por Categoria</h3>
          <div className="categories-list">
            {categorias.map((categoria, index) => (
              <span key={index} className="category-pill">
                {categoria}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}