import { useCallback, useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonApi";

export function usePokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPokemonList();
      setPokemon(data);
    } catch (requestError) {
      console.error("Không thể tải danh sách Pokémon:", requestError);
      setError("Không thể tải dữ liệu. Vui lòng kiểm tra mạng và thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return { pokemon, loading, error, refetch: fetchPokemon };
}
