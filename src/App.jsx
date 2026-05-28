import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArticlesList from './pages/ArticlesList';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';

import Layout from './layouts/Layout';

//css
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ArticlesList />,
      },
      {
        path: 'articles',
        element: <ArticlesList />,
      },
      {
        path: 'articles/:slug',
        element: <ArticlePage />,
      },
      {
        path: 'profile/:username',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
