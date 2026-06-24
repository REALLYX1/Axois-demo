import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemon, onSelect }) {
  if (pokemon.length === 0) {
    return <p className="status">Không tìm thấy Pokémon phù hợp.</p>;
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map((item) => (
        <PokemonCard key={item.name} pokemon={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
