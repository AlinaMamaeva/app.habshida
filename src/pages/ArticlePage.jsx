import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../api/api';
import { Link } from 'react-router-dom';
import Spinner from '../assets/refresh.svg';
import UserInfo from '../post/UserInfo';
import Tags from '../post/Tags';
import ArticlesBanner from '../components/banners/ArticlesBanner';
import FavoriteArticleBtn from '../components/ui/FavoriteArticleBtn';
import ReactMarkdown from 'react-markdown';
import { deleteArticle } from '../api/api';
import { useNavigate } from 'react-router-dom';


export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
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

  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (!article) return <p>Not Found</p>;
  const isOwner = currentUser?.username === article?.author?.username;

  const handleDelete = async () => {
    try {
      await deleteArticle(slug);
      navigate('/');
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="container">
      <ArticlesBanner article={article} />

      <div className="article-page article-description-page ">
        <p className="article-description"> {article.description}</p>
        <div className="article-body">
          {' '}
          <ReactMarkdown>{article?.body}</ReactMarkdown>{' '}
        </div>

        <Tags tagList={article.tagList} style={{ marginTop: '20px' }} />
      </div>

      <div className="article-user">
        <UserInfo article={article} />
        {isOwner ? (
          <div className="update-btn">
            <Link to={`/articles/${article.slug}/edit`} className="edit-btn">
              Edit
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              {' '}
              Delete
            </button>
          </div>
        ) : (
          <FavoriteArticleBtn  articleId={slug}/>
        )}
      </div>
    </div>
  );
}
