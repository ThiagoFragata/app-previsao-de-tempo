import axios from "axios";

//https://api.hgbrasil.com/weather?key=64b43dc5&lat=-23.682&lon=-46.875

export const key = "89f1d6cb";

const api = axios.create({
  baseURL: "https://api.hgbrasil.com",
});

export default api;
