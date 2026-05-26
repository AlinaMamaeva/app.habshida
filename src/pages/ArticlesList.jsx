import { useState } from "react";
import { useArticles } from "../hooks/useArticles";
import Post from "../post/Post";
import Pagination from "./Pagination";
import Spinner from "../assets/refresh.svg"

export default function ArticlesList() {
  const [page, setPage] = useState(1);
  const { articles, loading, error } = useArticles(page);



  if (loading) 
    return (
   <div className="spinner">
     <img src={Spinner} alt="loading" className="spinner-icon"  /> 
     loading
     
     </div>
  ) 

  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="container">
        {articles.map((article) => (
          <Post key={article.slug} article={article} />
        ))}    
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
