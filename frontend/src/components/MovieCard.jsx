import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";

export default function MovieCard({
  id,
  titulo,
  mostrarBotaoAdd,
  poster,
  subtitulo,
  mostrarBotaoRemover,
  onRemover,
  genre_ids,
}) {

  const navigate = useNavigate();

  function adicionarMinhaLista(e) {
    e.stopPropagation();

    const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];

    const filmeExiste = lista.some((filme) => filme.id === id);


    if (filmeExiste) {
      alert("Esse filme já está na sua lista!");
      return;
    }

    lista.push({
      id,
      title: titulo,
      poster_path: poster,
      release_date: subtitulo,
      genre_ids,
    });

    localStorage.setItem("minhaLista", JSON.stringify(lista));

    alert("Filme adicionado!");
  }

  function removerDaLista(e) {
  e.stopPropagation();

  const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];

  const novaLista = lista.filter((filme) => filme.id !== id);

  localStorage.setItem("minhaLista", JSON.stringify(novaLista));
}

  return (
    <div
      className={styles.movieItem}
      onClick={() => navigate(`/filme/${id}`)}
    >
      <div
        className={styles.moviePoster}
        style={
          poster
            ? {
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
       {mostrarBotaoAdd && (
    <button
        className={styles.addBtn}
        onClick={adicionarMinhaLista}
    >
        +
    </button>
)}

{mostrarBotaoRemover && (
    <button
        className={styles.removeBtn}
        onClick={(e) => {
            e.stopPropagation();
            onRemover(id);
        }}
    >
        x
    </button>
)}
      </div>

      <p>{titulo}</p>

      {subtitulo && (
        <span className={styles.movieSubtitulo}>
          {subtitulo}
        </span>
      )}
    </div>
  );
}