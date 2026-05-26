import { useEffect, useState } from "react";
import { getArticles } from "../api/api";

export  function useArticles(page) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    setLoading(true);

    getArticles(page)
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch(() => {
        setError("Error loading articles");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return {
    articles,
    loading,
    error,
  };
}
