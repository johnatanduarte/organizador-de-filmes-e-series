export default function MovieCard({ titulo, mostrarBotaoAdd }) {
  return (
    <div className="movie-item">
      <div className="movie-poster">
        {mostrarBotaoAdd && <button className="add-btn">+</button>}
      </div>
      <p>{titulo}</p>
    </div>
  );
}
