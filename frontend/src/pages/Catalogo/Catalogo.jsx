import {useState, useEffect} from "react";
import Sidebar from "../../components/Sidebar.jsx";
import MovieCard from "../../components/MovieCard.jsx";
import styles from "./Catalogo.module.css";

import iconeLupa from "../../assets/icons/lupa.svg";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = "https://image.tmdb.org/t/p/w300";

function Catalogo () {

    const [filmes, setFilmes] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [generoSelecionado, setGeneroSelecionado] = useState("todos");
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // busca a lista de gêneros uma única vez, ao montar a página
    useEffect(() => {
        async function fetchGeneros() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`       
                );
                const data = await response.json();
                setGeneros(data.genres || []);
            } catch (err) {
                console.error("Erro ao buscar gêneros : ", err);
            }
        }
        fetchGeneros();
    }, []); // fechar useEffect

      // busca os filmes sempre que a busca ou o gênero mudam
      useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchFilmes();
        }, 400); // espera 400ms após parar de digitar, evita chamadas excessivas à API
        return () => clearTimeout(timeoutId);
      }, [busca,generoSelecionado]) //fechar useEffect

      async function fetchFilmes() {
        try {

            setCarregando(true);
            setErro(null);

            let url;

            if (busca.trim() !== "") {
                // busca por texto usa o endpoint de pesquisa.
                url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(busca)}`;
            } else if (generoSelecionado !== "todos") {
                 // filtro por gênero usa o endpoint de descoberta
                 url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${generoSelecionado}`;
            } else {
                // sem busca nem filtro: lista os populares
                 url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
             } 

             const response = await fetch(url);

             if (!response.ok) {
                throw new Error ("Não foi possível carregar o catálogo");
             }

             const data = await response.json();
             setFilmes(data.results || [])
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
        }
       }
    return (
        <>
            <div className={styles.pageRoot}>
                <Sidebar />
                <main className={styles.catalogoContent}>
                    <header className={styles.catalogoHeader}>
                        <h1>Catálogo</h1>
                         <p>Explore filmes para descobrir sua próxima escolha</p>
                    </header>
                    
                    <div className={styles.filtrosBar}>
                        <div className={styles.searchBar}>
                            <img src={iconeLupa} alt="Pesquisar" style={{ width: "18px", height: "18px" }}></img>
                            <input 
                                type="text"
                                placeholder="Pesquisar filmes..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                            />            
                        </div>
                    </div>

                     <div className={styles.categoriesList}>
                        <span
                            className={`${styles.categoryPill} ${generoSelecionado === "todos" ? styles.active : ""}`}
                            onClick={() => setGeneroSelecionado("todos")}
                        >
                            Todos
                        </span>
                        {generos.map((genero) => (
                            <span
                                key = {genero.id}
                                 className={`${styles.categoryPill} ${generoSelecionado === String(genero.id) ? styles.active : ""}`}
                                 onClick={() => setGeneroSelecionado(String(genero.id))}
                            >
                                {genero.name}
                            </span>
                        ))}
                        </div>

                        {carregando && <p className={styles.statusMsg}>Carregando filmes...</p>}
                        {erro && <p className={styles.statusMsg}>Erro : {erro}</p>}

                          {!carregando && !erro && (

                            <div className={styles.moviesGrid}>
                                    {filmes.map((filme) => (
                                 <MovieCard
                                    key={filme.id}
                                    id={filme.id}
                                    titulo={filme.title}
                                    subtitulo={filme.release_date ? filme.release_date.slice(0, 4) : ""}
                                    poster={filme.poster_path ? `${IMG_BASE}${filme.poster_path}` : null}
                                    genre_ids={filme.genre_ids}
                                    mostrarBotaoAdd={true}
                                />
                                ))}
                            </div>
                            )}  

                                {!carregando && !erro && filmes.length === 0 && (
                                    <p className={styles.statusMsg}>
                                         Nenhum filme encontrado.
                                    </p>
                                )}
                                
                    <footer className={styles.tmdbAttribution}>
                    <p>Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.</p>
                    </footer>
                </main>
            </div>

        </>
    )
}

export default Catalogo;
