import axios from "axios";

// Mọi request trong project sẽ dùng chung địa chỉ API này.
const axiosClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

export default axiosClient;
