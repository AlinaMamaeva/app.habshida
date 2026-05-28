
export default function Pagination({ page, setPage }) {
  const pages = Array.from({ length: 7 }, (_, i) => i + 1);
  return (
    <div className="pagination">
      {pages.map((p) => (
        <button
          className={`pagination-btn  ${page === p ? "active" : ""} `}
          key={p}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
