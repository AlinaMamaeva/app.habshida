import { useEffect, useState } from "react";
import { getArticles, getArticlesByAuthor } from "../api/api";

  export  function useArticles(page, username) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articlesCount, setArticlesCount] = useState(0);
 

  useEffect(() => {
    setLoading(true);

const request = username ? getArticlesByAuthor(username, page) : getArticles(page)


  request
      .then((res) => {
        setArticles(res.data.articles);
        setArticlesCount(res.data.articlesCount);
      })
      .catch(() => {
        setError("Error loading articles");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, username]);

  return {
    articles,
    articlesCount,
    loading,
    error,
  };
}
