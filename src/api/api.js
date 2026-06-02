import axios from 'axios';

const API = 'https://realworld.habsida.net/api';

export const getArticles = (page = 1) => {
  return axios.get(`${API}/articles?limit=3&offset=${(page - 1) * 10}`);
};
export const getArticle = (slug) => {
  return axios.get(`${API}/articles/${slug}`);
};

export const getTags = () => {
  return axios.get(`${API}/tags`);
};

export const registerUser = (data) => {
  return axios.post(`${API}/users`, data);
};
export const loginUser = (data) => {
  return axios.post(`${API}/users/login`, data, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
};

export const getCurrentUser = () => {
  return axios.get(`${API}/user`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
};

export const updateUser = (data) => {
  return axios.put(`${API}/user`, data, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
};
export const createArticle = (data) => {
  return axios.post(`${API}/articles`, data, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
};
