import { Outlet, useLocation } from 'react-router-dom';
import DefaultBanner from '../components/banners/DefaultBanner';
import Navbar from '../components/Navbar';

import Tags from '../post/Tags';

export default function Layout() {
  const location = useLocation();
  const hide = location.pathname != '/';
  return (
    <div>
      <Navbar />

      {!hide && <DefaultBanner />}

      {!hide && <Tags isPopularTags />}

      <Outlet />
    </div>
  );
}
