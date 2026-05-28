import { Link } from 'react-router-dom';
import ProfileIcon from '../assets/profileIcon.svg';

export default function UserInfo() {
  const user = {
    icon: ProfileIcon,
    userName: 'John',
    userSureName: 'Lobster',
    date: new Date('2027-01-01').toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return (
    <div className="user-info">
      <img src={user.icon} className="user-icon" />
      <div className="user-text">
        <Link to={`/profile/${user.userName}`} 
        className="user-name">
          {user.userName} {user.userSureName}
        </Link>

        <p className="user-data">{user.date}</p>
      </div>
    </div>
  );
}
