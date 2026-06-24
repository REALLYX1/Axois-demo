import { useCallback, useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonApi";

export function usePokemon(page, limit) {
  const [pokemon, setPokemon] = useState([]);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPokemonList(page, limit);
      setPokemon(data.results);
      setTotalPokemon(data.count);
    } catch (requestError) {
      console.error("Không thể tải danh sách Pokémon:", requestError);
      setError("Không thể tải dữ liệu. Vui lòng kiểm tra mạng và thử lại.");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return { pokemon, totalPokemon, loading, error, refetch: fetchPokemon };
}
