import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./DetalhesFilme.css";

import BannerFilme from "../../components/BannerFilme";
import PosterFilme from "../../components/PosterFilme";
import InformacoesFilme from "../../components/InformacoesFilme";
import SinopseFilme from "../../components/SinopseFilme";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function DetalhesFilme() {

    const { id } = useParams();

    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {

        async function carregarFilme() {

            try {

                setCarregando(true);

                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
                );

                if (!response.ok) {
                    throw new Error("Erro ao carregar filme.");
                }

                const data = await response.json();

                setFilme(data);

            } catch (err) {

                setErro(err.message);

            } finally {

                setCarregando(false);

            }

        }

        carregarFilme();

    }, [id]);

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

                <PosterFilme
                    poster={filme.poster_path}
                    titulo={filme.title}
                />

                <InformacoesFilme filme={filme} />

            </div>
            <Link to ="/Catalogo" className="btn-voltar">Voltar</Link>
            <SinopseFilme overview={filme.overview} />
        

        </main>

    );

}

export default DetalhesFilme;