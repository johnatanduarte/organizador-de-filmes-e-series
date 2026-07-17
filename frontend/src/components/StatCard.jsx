export default function StatCard({ valor, legenda, corTexto }) {
  return (
    <div className="stat-card">
      <h2 className={corTexto}>{valor}</h2>
      <span>{legenda}</span>
    </div>
  );
}
