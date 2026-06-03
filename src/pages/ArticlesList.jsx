import { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import Post from '../post/Post';
import Spinner from '../assets/refresh.svg';
import Pagination from '../components/Pagination';

export default function ArticlesList() {
  const [page, setPage] = useState(1);
  const { articles, articlesCount, loading, error } = useArticles(page);

  if (loading)
    return (
      <div className="spinner">
        <img src={Spinner} alt="loading" className="spinner-icon" />
        loading
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="container">
        {articles.map((article) => (
          <Post key={article.slug} article={article} />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        total={articlesCount}
        limit={3}
      />
    </div>
  );
}
