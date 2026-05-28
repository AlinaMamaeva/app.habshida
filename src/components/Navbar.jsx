import { Link } from 'react-router-dom';

//icons
import PenIcon from '../assets/PenIcon.svg';
import SettingIcon from '../assets/settingsIcon.svg';
import ProfileIcon from '../assets/profileIcon.svg';

export default function Navbar() {
  const currentUser = null;

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
      url: '/sign-out',
      isVisible: !currentUser,
    },

    {
      title: 'New Post',
      url: '/new-post',
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
      title: 'Profile',
      url: '/profile',
      icon: ProfileIcon,
      isVisible: currentUser,
    },
  ];

  return (
    <nav className="navbar">
      <h3 className="navbar-text">Realworld Blog</h3>

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
  );
}
