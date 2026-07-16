export default function SeriesCard({
  titulo,
  subtitulo,
  textoBotao,
  finalizado,
  iconeAssistido,
}) {
  return (
    <div className="series-card">
      <div className="series-image-placeholder"></div>
      <div className="series-info">
        <h4>{titulo}</h4>
        <p>{subtitulo}</p>
        <button className={`btn-mark ${finalizado ? "btn-done" : ""}`}>
          {textoBotao}
          {finalizado && iconeAssistido && (
            <img
              src={iconeAssistido}
              alt="Check"
              style={{ width: "14px", height: "14px", marginLeft: "5px" }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
