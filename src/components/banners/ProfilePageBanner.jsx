import FollowBtn from '../ui/FollowBtn';
import ProfileIcon from '../../assets/profile-img.svg';
import HeartIcon from '../../assets/Icon.svg';

export default function ProfilePageBanner() {
  return (
    <div className="profile-container">
      <div className="center">
        <img src={ProfileIcon} alt="profile-icon" className="profile-icon" />
        <p className='profile-user-name'>John Lobster</p>

        <FollowBtn>
          {' '}
          <img
            src={HeartIcon}
            alt="favorite-icon"
            className="favorite-icon"
          />{' '}
        </FollowBtn>
      </div>
    </div>
  );
}
