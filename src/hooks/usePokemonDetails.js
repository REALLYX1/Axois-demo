import { useEffect, useState } from "react";
import { getPokemonDetails } from "../api/pokemonApi";

export function usePokemonDetails(name) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name) {
      setDetails(null);
      return;
    }

    async function fetchDetails() {
      try {
        setLoading(true);
        setError("");
        setDetails(null);
        const data = await getPokemonDetails(name);
        setDetails(data);
      } catch (requestError) {
        console.error("Không thể tải chi tiết Pokémon:", requestError);
        setError("Không thể tải thông tin chi tiết.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [name]);

  return { details, loading, error };
}
