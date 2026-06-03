export default function Pagination({ page, setPage, total, limit = 3 }) {
  const pageCount = Math.ceil(total / limit);
  const windowSize = 7;

  const start = Math.max(1, Math.min(page - 3, pageCount - windowSize + 1));
  const end = Math.min(pageCount, start + windowSize - 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        style={{fontSize: "16px"}}
      >
        {' '}
        «{' '}
      </button>

      {pages.map((p) => (
        <button
          className={`pagination-btn  ${page === p ? 'active' : ''} `}
          key={p}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => setPage(page + 1)}
        disabled={page === pageCount}
         style={{fontSize: "16px"}}
      >
        »
      </button>
    </div>
  );
}
