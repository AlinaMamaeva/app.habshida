import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArticlesList from './pages/ArticlesList';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Settings from './pages/Settings';

import Layout from './layouts/Layout';

//css
import './App.css';
import NewPost from './pages/NewPost';

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
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'new-post',
        element: <NewPost />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
