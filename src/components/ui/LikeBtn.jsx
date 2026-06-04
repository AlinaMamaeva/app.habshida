import { useState } from 'react';
import FavoriteIcon from '../../assets/favorite.svg';
import { favoriteArticle, unfavoriteArticle } from '../../api/api';

export default function LikeBtn({ slug, favorited, favoritesCount }) {
  const [liked, setLiked] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);
  const [animate, setAnimate] = useState(false);

  const handleLike = async () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    try {
      if (liked) {
        await unfavoriteArticle(slug);
        setCount(count - 1);
      } else {
        await favoriteArticle(slug);
        setCount(count + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className={`like-btn ${animate ? 'like-animate' : ''}`}
        onClick={handleLike}
      >
        <img src={FavoriteIcon} alt="like-icon" />
        {count}
      </button>
    </>
  );
}
