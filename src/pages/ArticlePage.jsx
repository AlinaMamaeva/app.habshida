import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../api/api";
import ReactMarkdown from "react-markdown";
import Spinner from "../assets/refresh.svg";
import UserInfo from "../post/UserInfo";
import LikeBtn from "../post/LikeBtn";

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
      <div className="article-page card">
        <div className="post-header">
          <UserInfo user={article.author} />
          <LikeBtn />
        </div>

        <p className="article-list">{article.title}</p>
        <p className="article-description"> {article.description}</p>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}
