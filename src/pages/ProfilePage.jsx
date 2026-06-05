import UserBanner from '../components/banners/UserBanner';
import Tags from '../post/Tags';
import Post from '../post/Post';
import Pagination from '../components/Pagination';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { getProfile } from '../api/api';
import Spinner from '../assets/refresh.svg';

export default function ProfilePage() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { articles, articlesCount, loading } = useArticles(page, username);
  const [user, setUser] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isMyProfile = currentUser?.username === username;

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const token = currentUser?.token;

    getProfile(username, token)
      .then((res) => setUser(res.data.profile))
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <div className="container ">
      <UserBanner user={user} isMyProfile={isMyProfile} />
      <div></div>
      <Tags isPopularTags />
      {loading ? (
        <div className="spinner">
          <img src={Spinner} alt="loading" className="spinner-icon" />
          Loading
        </div>
      ) : (
        articles.map((article) => <Post key={article.slug} article={article} />)
      )}

      <Pagination
        page={page}
        setPage={setPage}
        total={articlesCount}
        limit={3}
      />
    </div>
  );
}
