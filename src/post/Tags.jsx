export default function Tags({
  isPopularTags,
  tags = Array.from({ length: 9 }, ()=>"tag"),
}) {
  const content = (
    <div className="tags">
      {tags.map((tag, i) => (
        <button key={i} className="tags-btn">
          {tag}
        </button>
      ))}
    </div>
  );

  if (isPopularTags) {
    return (
      <div className="popular-tag">
        <p className="popular-tag_text">Popular tags</p>

        {content}
      </div>
    );
  }

  return content;
}
