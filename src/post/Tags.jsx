import { useEffect, useState } from 'react';
import { getTags } from '../api/api';

export default function Tags({limit = 9, isPopularTags }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
      .then((res) => setTags(res.data.tags))
      .catch((err) => console.log(err));
  }, []);

  const tagsList = (
    <div className="tags">
      {(isPopularTags ? tags.slice(0,5):tags.slice(0,limit)).map((tag) => (
        <button key={tag} className="tags-btn">
          {tag.toLowerCase()}
        </button>
      ))}
    </div>
  );

  if (isPopularTags) {
    return (
      <div className="popular-tag">
        <p className="popular-tag_text">Popular tags</p>

        {tagsList}
      </div>
    );
  }

  return tagsList;
}
