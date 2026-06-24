import { useMemo, useState } from "react";
import PokemonDetail from "../components/PokemonDetail";
import PokemonList from "../components/PokemonList";
import { usePokemon } from "../hooks/usePokemon";

export default function HomePage() {
  const { pokemon, loading, error, refetch } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState("");

  const filteredPokemon = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return pokemon;

    return pokemon.filter((item) => item.name.includes(keyword));
  }, [pokemon, searchTerm]);

  return (
    <main className="container">
      <header className="hero">
        <span className="eyebrow">Poke Poke</span>
        <h1>Khám phá Pokémon</h1>
      </header>

      <section className="toolbar" aria-label="Công cụ tìm kiếm">
        <label className="search-box">
          <span className="sr-only">Tìm Pokémon</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Tìm theo tên Pokémon..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
        <button className="button button--primary" onClick={refetch} disabled={loading}>
          {loading ? "Đang tải..." : "↻ Tải lại"}
        </button>
      </section>

      {!loading && !error && (
        <p className="result-count">
          Hiển thị {filteredPokemon.length} / {pokemon.length} Pokémon
        </p>
      )}

      {loading && <p className="status">Đang tải dữ liệu từ API...</p>}

      {!loading && error && (
        <div className="status status--error" role="alert">
          <p>{error}</p>
          <button className="button button--primary" onClick={refetch}>
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && (
        <PokemonList pokemon={filteredPokemon} onSelect={setSelectedPokemon} />
      )}

      <PokemonDetail name={selectedPokemon} onClose={() => setSelectedPokemon("")} />
    </main>
  );
}
