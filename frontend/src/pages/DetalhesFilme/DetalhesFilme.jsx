import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./DetalhesFilme.css";

import BannerFilme from "../../components/BannerFilme";
import PosterFilme from "../../components/PosterFilme";
import InformacoesFilme from "../../components/InformacoesFilme";
import SinopseFilme from "../../components/SinopseFilme";
import { adicionarNaLista, estaNaLista } from "../../utils/minhaLista";
import { removerDaLista } from "../../utils/minhaLista";
import ComentariosFilme from "../../components/ComentariosFilme";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = "https://image.tmdb.org/t/p/w300";

function DetalhesFilme() {
  const { id } = useParams();

  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [naLista, setNaLista] = useState(false); // novo state

  useEffect(() => {
    async function carregarFilme() {
      try {
        setCarregando(true);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`,
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar filme.");
        }

        const data = await response.json();

        setFilme(data);
        setNaLista(estaNaLista(data.id)); // checa assim que o filme carrega
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarFilme();
  }, [id]);

  function handleToggleMinhaLista() {
    if (naLista) {
      removerDaLista(filme.id);
      setNaLista(false);
    } else {
      adicionarNaLista({
        id: filme.id,
        title: filme.title,
        poster_path: filme.poster_path
          ? `${IMG_BASE}${filme.poster_path}`
          : null,
        release_date: filme.release_date,
        genre_ids: filme.genres ? filme.genres.map((g) => g.id) : [],
      });
      setNaLista(true);
    }
  }

  if (carregando) {
    return <h2>Carregando...</h2>;
  }

  if (erro) {
    return <h2>{erro}</h2>;
  }

  return (
    <main className="detalhes-page">
      <BannerFilme backdrop={filme.backdrop_path} />

      <div className="detalhes-container">
        <PosterFilme poster={filme.poster_path} titulo={filme.title} />

        <InformacoesFilme filme={filme} />
      </div>
      <div className="btn-detail">
        <Link to="/Catalogo" className="btn-voltar ">
          Voltar
        </Link>

        <button
          className={naLista ? "btn-na-lista" : "btn-adicionar-lista"}
          onClick={handleToggleMinhaLista}
        >
          {naLista
            ? "✓ Na sua Lista (clique para remover)"
            : "+ Adicionar à Minha Lista"}
        </button>
      </div>

      <SinopseFilme overview={filme.overview} />
      <ComentariosFilme filmeId={filme.id} />
    </main>
  );
}

export default DetalhesFilme;
