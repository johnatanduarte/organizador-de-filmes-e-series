function InformacoesFilme({ filme }) {

    return (

        <div className="informacoes-filme">

            <h1>{filme.title}</h1>

            <div className="dados-filme">

                <span>⭐ {filme.vote_average.toFixed(1)}</span>

                <span>
                    📅 {filme.release_date.slice(0,4)}
                </span>

                <span>
                    ⏱ {filme.runtime} min
                </span>

            </div>

            <div className="generos">

                {filme.genres.map((genero) => (

                    <span
                        key={genero.id}
                        className="genero"
                    >
                        {genero.name}
                    </span>

                ))}

            </div>

        </div>

    );

}

export default InformacoesFilme;