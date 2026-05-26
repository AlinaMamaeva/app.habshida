export default function Sidebar() {

    const tags = ["one", "something", "chines", "english", "french"];
    /* push.tags("new tag")  but we need to use useStat  setTags([...tags, "new tag"]) with btn onClick */
  return (
    <div className="sidebar">
      <p className="sidebar-text">Popular tags</p>

      <div className="tags">
        {tags.map((tag) => (
            <button key={tag} className="sidebar-btn">
                {tag}
            </button>
        ))}
      </div>
    </div>
  );
}
