import FollowBtn from '../ui/FollowBtn';
import ProfileIcon from '../../assets/profile-img.svg';
import HeartIcon from '../../assets/Icon.svg';

export default function UserBanner({ user, isMyProfile }) {
  return (
    <div className="profile-container">
      <div className="center">
        <img
          src={user?.image || ProfileIcon}
          alt="profile-icon"
          className="profile-icon"
          width="24"
          height="24"
          style={{ borderRadius: '50%' }}
        />
        <p className="profile-user-name">{user?.username}</p>

        {!isMyProfile && (
          <FollowBtn>
            <img
              src={HeartIcon}
              alt="favorite-icon"
              className="favorite-icon"
            />
          </FollowBtn>
        )}
      </div>
    </div>
  );
}
