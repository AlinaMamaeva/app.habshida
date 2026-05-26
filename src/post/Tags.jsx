export default function Tags() {
 const tags = Array.from({ length: 9 }, (_, i) => i + 1);
    return(

         <div className="tags">
        {tags.map((tag) => (
            <button key={tag} className="sidebar-btn">
                tag
            </button>
        ))}
      </div>
    )
}