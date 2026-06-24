import { usePokemonDetails } from "../hooks/usePokemonDetails";

export default function PokemonDetail({ name, onClose }) {
  const { details, loading, error } = usePokemonDetails(name);

  if (!name) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <article
        className="pokemon-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pokemon-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose} aria-label="Đóng">×</button>
        {loading && <p className="status">Đang tải chi tiết...</p>}
        {error && <p className="status status--error">{error}</p>}

        {details && (
          <>
            <img
              className="pokemon-detail__image"
              src={details.sprites.other["official-artwork"].front_default}
              alt={`Hình ${details.name}`}
            />
            <div className="pokemon-detail__content">
              <span className="pokemon-card__id">
                Pokémon #{String(details.id).padStart(3, "0")}
              </span>
              <h2 id="pokemon-detail-title">{details.name}</h2>
              <div className="type-list">
                {details.types.map(({ type }) => <span key={type.name}>{type.name}</span>)}
              </div>
              <dl className="pokemon-stats">
                <div><dt>Chiều cao</dt><dd>{details.height / 10} m</dd></div>
                <div><dt>Cân nặng</dt><dd>{details.weight / 10} kg</dd></div>
                <div><dt>Kinh nghiệm cơ bản</dt><dd>{details.base_experience}</dd></div>
              </dl>
            </div>
          </>
        )}
      </article>
    </div>
  );
}
