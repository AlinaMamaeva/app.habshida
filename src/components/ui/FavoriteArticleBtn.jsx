import { useState, useEffect } from 'react';
export default function FavoriteArticleBtn({ articleId }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(`favorite:${articleId}`);
      setSaved(value === true);
  }, [articleId]);

  function handleClick() {
    const next = !saved;
    setSaved(next);
    localStorage.setItem(`favorite:${articleId}`, String(next));
  }

  return (
    <>
      <button className="fav-article" onClick={handleClick}>
        {' '}
        {saved ? 'Saved' : 'Favorite article'}
      </button>
    </>
  );
}
