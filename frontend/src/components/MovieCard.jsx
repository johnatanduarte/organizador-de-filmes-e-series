import { useNavigate } from "react-router-dom";

export default function MovieCard({
  id,
  titulo,
  mostrarBotaoAdd,
  poster,
  subtitulo
}) {

  const navigate = useNavigate();

  return (
    <div
      className="movie-item"
      onClick={() => navigate(`/filme/${id}`)}
    >
      <div
        className="movie-poster"
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
        {mostrarBotaoAdd && <button className="add-btn">+</button>}
      </div>

      <p>{titulo}</p>

      {subtitulo && (
        <span className="movie-subtitulo">
          {subtitulo}
        </span>
      )}
    </div>
  );
}