import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';
import LikeBtn from '../components/ui/LikeBtn';
import Tags from './Tags';

export default function Post({ article }) {
  const { title, description, body, slug, author, tagList } = article;

  return (
    <div className="post card">
      {/*Header*/}
      <div className="post-header">
        <UserInfo article={article} />
        <LikeBtn
          slug={slug}
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
        />
      </div>

      {/*Content*/}
      <Link to={`/articles/${slug}`} className="article-list">
        <p>{title}</p>
      </Link>

      <p className="article-description">{description}</p>

      {/*Footer*/}
      <Tags tagList={tagList} />
    </div>
  );
}
