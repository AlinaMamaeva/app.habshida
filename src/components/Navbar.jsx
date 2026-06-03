import { Link } from 'react-router-dom';

//icons
import PenIcon from '../assets/PenIcon.svg';
import SettingIcon from '../assets/settingsIcon.svg';
import ProfileIcon from '../assets/profileIcon.svg';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const currentUser = !!token;

  const navLinks = [
    {
      title: 'Home',
      url: '/',
      isVisible: true,
    },
    {
      title: 'Sign In',
      url: '/sign-in',
      isVisible: !currentUser,
    },
    {
      title: 'Sign Up',
      url: '/sign-up',
      isVisible: !currentUser,
    },

    {
      title: 'New Post',
      url: '/new-article',
      icon: PenIcon,
      isVisible: currentUser,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: SettingIcon,
      isVisible: currentUser,
    },
    {
      title: user?.username || 'Profile', // <-- это доп что бы избежать андерфайнт
      url: `/profile/${user?.username}`,
      icon: ProfileIcon,
      isVisible: currentUser,
    },
  ];

  return (
    <>
      <nav className="navbar">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h3 className="navbar-text">Realworld Blog</h3>
        </Link>

        <div className="navbar-links">
          {navLinks
            .filter((btn) => btn.isVisible)
            .map((btn) => (
              <Link key={btn.title} to={btn.url} className="navbar-link">
                {btn.icon && <img src={btn.icon} alt={btn.title} />}

                {btn.title}
              </Link>
            ))}
        </div>
      </nav>
      <hr className="header-line" />
    </>
  );
}
