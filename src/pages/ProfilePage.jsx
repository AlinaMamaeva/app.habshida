import UserBanner from '../components/banners/UserBanner';
import Tags from '../post/Tags';
import Pagination from '../components/Pagination';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const [page, setPage] = useState(1);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { username } = useParams();

  const isMyProfile = currentUser?.username === username;
  return (
    <>
      <div style={{ color: 'red' }}>PROFILE PAGE</div>
      <UserBanner user={{ username }} isMyProfile={isMyProfile} />

      <Tags isPopularTags />

      <Pagination page={page} setPage={setPage} />
    </>
  );
}
