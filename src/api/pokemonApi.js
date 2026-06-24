import axiosClient from "./axiosClient";

export async function getPokemonList(page = 1, limit = 30) {
  const offset = (page - 1) * limit;

  const response = await axiosClient.get("/pokemon", {
    params: { limit, offset },
  });
  return response.data;
}

export async function getPokemonDetails(name) {
  const response = await axiosClient.get(`/pokemon/${name}`);
  return response.data;
}
