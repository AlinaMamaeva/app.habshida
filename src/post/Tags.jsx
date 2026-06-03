import { useEffect, useState } from 'react';
import { getTags } from '../api/api';

export default function Tags({ tagList = [], isPopularTags, style }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!isPopularTags) return;

    getTags()
      .then((res) => setTags(res.data.tags))
      .catch((err) => console.log(err));
  }, [isPopularTags]);

  const tagsContent = (
    <div className="tags" style={style}>
      {(isPopularTags ? tags : Array.isArray(tagList) ? tagList : [])
        .filter((tag) => tag != null)
        .slice(0, isPopularTags ? 7 : undefined)
        .map((tag) => (
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

        {tagsContent}
      </div>
    );
  }

  return tagsContent;
}
