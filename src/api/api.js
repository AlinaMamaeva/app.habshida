import axios from 'axios';

const API = 'https://realworld.habsida.net/api';

export const getArticles = (page = 1) => {
  return axios.get(`${API}/articles?limit=3&offset=${(page - 1) * 3}`);
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
  return axios.post(`${API}/users/login`, data);
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
  return axios.post(
    `${API}/articles`,
    { article: data },
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    }
  );
};

export const updateArticle = (slug, data) => {
  return axios.put(`${API}/articles/${slug}`, data, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
};

export const deleteArticle = (slug) => {
  return axios.delete(`${API}/articles/${slug}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
};

export const favoriteArticle = (slug) => {
  return axios.post(
    `${API}/articles/${slug}/favorite`,
    {},
    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    }
  );
};

export const unfavoriteArticle = (slug) => {
  return axios.delete(
    `${API}/articles/${slug}/favorite`,

    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    }
  );
};

export const getArticlesByAuthor = (username, page = 1) => {
  return axios.get(
    `${API}/articles?author=${username}&limit=3&offset=${(page - 1) * 3}`
  );
};

export const getProfile = (username, token) => {
  return axios.get(`${API}/profiles/${username}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
