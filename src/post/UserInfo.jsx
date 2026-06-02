import { Link } from 'react-router-dom';
import ProfileIcon from '../assets/profileIcon.svg';

export default function UserInfo({ article }) {
 
  console.log('article:', article);

   if (!article?.author) return null;
  /*
  const author = {
    icon: article.author.image || ProfileIcon,
    userName: article.author.username,

    date: new Date('2027-01-01').toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };
*/
  return (
    <div className="user-info">
      <img
        src={article.author.image || ProfileIcon}
        className="user-icon"
        width="24"
        height="24"
        alt={article.author.username}
      />

      <div className="user-text">
        <Link to={`/profile/${article.author.username}`} className="user-name">
          {article.author.username}
        </Link>

        <p className="user-data">
         
          {new Date(article.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
