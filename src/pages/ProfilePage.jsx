import ProfilePageBanner from '../components/banners/ProfilePageBanner';
import Tags from '../post/Tags';
import Pagination from '../components/Pagination';
import { useState } from 'react';

export default function ProfilePage() {
  const [page, setPage] = useState(1);

  return (
    <>
      <div style={{color: "red"}}>PROFILE PAGE</div>
      <ProfilePageBanner />
      <Tags isPopularTags />

      <Pagination page={page} setPage={setPage} />
    </>
  );
}
