import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../api/api';
import ReactMarkdown from 'react-markdown';
import Spinner from '../assets/refresh.svg';
import UserInfo from '../post/UserInfo';
import Tags from '../post/Tags';
import ArticlesBanner from '../components/banners/ArticlesBanner';
import FavoriteArticleBtn from '../components/ui/FavoriteArticleBtn';
import Post from '../post/Post';

export default function ArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticle(slug)
      .then((res) => {
        setArticle(res.data.article);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="spinner">
        <img src={Spinner} alt="loading" className="spinner-icon" />
        loading
      </div>
    );
  if (!article) return <p>Not Found</p>;

  return (
    <div className="container">
      <div style={{ color: 'red' }}>Article page </div>

      <ArticlesBanner article={article} />

      <div className="article-page article-description-page ">
        <p className="article-description"> {article.description}</p>

        <Tags tags={article.tags} />
      </div>
  
      <div className="article-user">
        <UserInfo article={article} />
        <FavoriteArticleBtn />
      </div>

      {/*<ReactMarkdown>{article.body}</ReactMarkdown> */}
    </div>
  );
}
