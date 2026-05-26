import axios from "axios";

const API = "https://realworld.habsida.net/api";

export const getArticles = (page = 1) => {
  return axios.get(`${API}/articles?limit=3&offset=${(page - 1) * 10}`);
};
export const getArticle = (slug) => {
  return axios.get(`${API}/articles/${slug}`);
};
