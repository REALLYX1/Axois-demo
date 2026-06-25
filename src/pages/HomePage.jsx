import { useEffect, useMemo, useState } from "react";
import PokemonDetail from "../components/PokemonDetail";
import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";
import { getAllPokemonList, getPokemonDetails } from "../api/pokemonApi";
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
  const [allPokemon, setAllPokemon] = useState([]);
  const [allPokemonLoading, setAllPokemonLoading] = useState(true);
  const [allPokemonError, setAllPokemonError] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const totalPages = Math.ceil(totalPokemon / ITEMS_PER_PAGE);
  const keyword = searchTerm.trim().toLowerCase();
  const isIdSearch = keyword.startsWith("#");
  const isNameSearch = Boolean(keyword) && !isIdSearch;

  useEffect(() => {
    async function fetchAllPokemon() {
      try {
        setAllPokemonLoading(true);
        setAllPokemonError("");
        const data = await getAllPokemonList();
        setAllPokemon(data.results);
      } catch (requestError) {
        console.error("Không thể tải danh sách Pokémon đầy đủ:", requestError);
        setAllPokemonError("Không thể tải danh sách Pokémon đầy đủ để tìm theo tên.");
      } finally {
        setAllPokemonLoading(false);
      }
    }

    fetchAllPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    if (!keyword) return pokemon;

    return allPokemon.filter((item) => item.name.includes(keyword));
  }, [allPokemon, keyword, pokemon]);

  const displayedPokemon = isIdSearch
    ? searchResult
      ? [searchResult]
      : []
    : filteredPokemon;

  async function searchPokemon(event) {
    event.preventDefault();
    const keywordValue = searchTerm.trim();

    setSearchError("");

    if (/^\d+$/.test(keywordValue)) {
      setSearchResult(null);
      setSearchError("Hãy thêm dấu # trước số Pokédex, ví dụ: #25.");
      return;
    }

    if (!/^#\d+$/.test(keywordValue)) return;

    try {
      setSearchLoading(true);
      setSearchResult(null);
      const pokemonId = Number(keywordValue.slice(1));

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
      setSearchError(`Không tìm thấy Pokémon có số ${keywordValue}.`);
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
          <span className="search-icon" aria-hidden="true"></span>
          <input
            type="search"
            placeholder="Tìm kiếm theo tên hoặc ID"
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
          {loading ? "Đang tải..." : "Tải lại"}
        </button>
      </form>

      {!loading && !error && (
        <p className="result-count">
          {isIdSearch
            ? "Tìm chính xác bằng số Pokédex"
            : isNameSearch
              ? `Hiển thị ${filteredPokemon.length} Pokémon tìm thấy trong toàn bộ API - Tổng cộng ${totalPokemon}`
              : `Hiển thị ${filteredPokemon.length} Pokémon ở trang này - Tổng cộng ${totalPokemon}`}
        </p>
      )}

      {loading && <p className="status">Đang tải dữ liệu từ API...</p>}

      {!loading && searchLoading && (
        <p className="status">Đang tìm Pokémon theo số Pokédex...</p>
      )}

      {!loading && isNameSearch && allPokemonLoading && (
        <p className="status">Đang tải danh sách Pokémon để tìm theo tên...</p>
      )}

      {!loading && searchError && (
        <p className="status status--error" role="alert">{searchError}</p>
      )}

      {!loading && isNameSearch && allPokemonError && (
        <p className="status status--error" role="alert">{allPokemonError}</p>
      )}

      {!loading && error && (
        <div className="status status--error" role="alert">
          <p>{error}</p>
          <button className="button button--primary" onClick={refetch}>
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && !searchLoading && !searchError && (!isNameSearch || !allPokemonError) && (
        <>
          {(!isNameSearch || !allPokemonLoading) && (
            <PokemonList pokemon={displayedPokemon} onSelect={setSelectedPokemon} />
          )}
          {!isIdSearch && !isNameSearch && (
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
