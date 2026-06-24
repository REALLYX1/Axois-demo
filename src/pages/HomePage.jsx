import { useMemo, useState } from "react";
import PokemonDetail from "../components/PokemonDetail";
import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";
import { getPokemonDetails } from "../api/pokemonApi";
import { usePokemon } from "../hooks/usePokemon";

const ITEMS_PER_PAGE = 30;

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { pokemon, totalPokemon, loading, error, refetch } = usePokemon(
    page,
    ITEMS_PER_PAGE,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const totalPages = Math.ceil(totalPokemon / ITEMS_PER_PAGE);
  const isIdSearch = searchTerm.trim().startsWith("#");

  const filteredPokemon = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return pokemon;

    return pokemon.filter((item) => item.name.includes(keyword));
  }, [pokemon, searchTerm]);

  const displayedPokemon = isIdSearch
    ? searchResult
      ? [searchResult]
      : []
    : filteredPokemon;

  async function searchPokemon(event) {
    event.preventDefault();
    const keyword = searchTerm.trim();

    setSearchError("");

    if (/^\d+$/.test(keyword)) {
      setSearchResult(null);
      setSearchError("Hãy thêm dấu # trước số Pokédex, ví dụ: #25.");
      return;
    }

    if (!/^#\d+$/.test(keyword)) return;

    try {
      setSearchLoading(true);
      setSearchResult(null);
      const pokemonId = Number(keyword.slice(1));

      if (!Number.isInteger(pokemonId) || pokemonId < 1) {
        setSearchError("Số Pokédex phải lớn hơn 0, ví dụ: #001.");
        return;
      }

      const details = await getPokemonDetails(pokemonId);

      setSearchResult({
        name: details.name,
        url: `https://pokeapi.co/api/v2/pokemon/${details.id}/`,
      });
    } catch (requestError) {
      console.error("Không tìm thấy Pokémon theo số Pokédex:", requestError);
      setSearchError(`Không tìm thấy Pokémon có số ${keyword}.`);
    } finally {
      setSearchLoading(false);
    }
  }

  function changeSearchTerm(event) {
    setSearchTerm(event.target.value);
    setSearchResult(null);
    setSearchError("");
  }

  function changePage(newPage) {
    setPage(newPage);
    setSearchTerm("");
    setSearchResult(null);
    setSearchError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="container">
      <header className="hero">
        <span className="eyebrow">Poke Poke</span>
        <h1>Khám phá Pokémon</h1>
      </header>

      <form className="toolbar" aria-label="Công cụ tìm kiếm" onSubmit={searchPokemon}>
        <label className="search-box">
          <span className="sr-only">Tìm Pokémon</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Nhập tên hoặc #số Pokédex..."
            value={searchTerm}
            onChange={changeSearchTerm}
          />
        </label>
        <button
          className="button button--secondary"
          type="submit"
          disabled={loading || searchLoading}
        >
          {searchLoading ? "Đang tìm..." : "Tìm"}
        </button>
        <button
          className="button button--primary"
          type="button"
          onClick={refetch}
          disabled={loading}
        >
          {loading ? "Đang tải..." : "↻ Tải lại"}
        </button>
      </form>

      {!loading && !error && (
        <p className="result-count">
          {isIdSearch
            ? "Tìm chính xác bằng số Pokédex"
            : `Hiển thị ${filteredPokemon.length} Pokémon ở trang này · Tổng cộng ${totalPokemon}`}
        </p>
      )}

      {loading && <p className="status">Đang tải dữ liệu từ API...</p>}

      {!loading && searchLoading && (
        <p className="status">Đang tìm Pokémon theo số Pokédex...</p>
      )}

      {!loading && searchError && (
        <p className="status status--error" role="alert">{searchError}</p>
      )}

      {!loading && error && (
        <div className="status status--error" role="alert">
          <p>{error}</p>
          <button className="button button--primary" onClick={refetch}>
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && !searchLoading && !searchError && (
        <>
          <PokemonList pokemon={displayedPokemon} onSelect={setSelectedPokemon} />
          {!isIdSearch && (
            <Pagination
              page={page}
              totalPages={totalPages}
              loading={loading}
              onPageChange={changePage}
            />
          )}
        </>
      )}

      <PokemonDetail name={selectedPokemon} onClose={() => setSelectedPokemon("")} />
    </main>
  );
}
