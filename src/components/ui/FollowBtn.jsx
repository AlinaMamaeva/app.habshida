import { useState } from 'react';

export default function FollowBtn({ children }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    setIsFollowing((prev) => !prev);
  };
  return (
    <button
      onClick={handleClick}
      className={isFollowing ? 'follow-btn following' : 'follow-btn follow'}
    >
      {children}
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
