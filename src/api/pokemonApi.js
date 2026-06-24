import axiosClient from "./axiosClient";

export async function getPokemonList() {
  const response = await axiosClient.get("/pokemon", {
    params: { limit: 30 },
  });
  return response.data.results;
}

export async function getPokemonDetails(name) {
  const response = await axiosClient.get(`/pokemon/${name}`);
  return response.data;
}
