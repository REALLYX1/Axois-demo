export default function PokemonCard({ pokemon, onSelect }) {
  const pokemonId = Number(pokemon.url.split("/").filter(Boolean).pop());
  const imageUrl =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <article className="pokemon-card">
      <span className="pokemon-card__id">#{String(pokemonId).padStart(3, "0")}</span>
      <img src={imageUrl} alt={`Hình ${pokemon.name}`} loading="lazy" />
      <h2>{pokemon.name}</h2>
      <button className="button button--text" onClick={() => onSelect(pokemon.name)}>
        Xem chi tiết <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}
