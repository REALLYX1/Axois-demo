export default function Pagination({ page, totalPages, loading, onPageChange }) {
  const firstVisiblePage = Math.max(1, page - 3);
  const lastVisiblePage = Math.min(totalPages, page + 3);
  const visiblePages = [];

  for (let pageNumber = firstVisiblePage; pageNumber <= lastVisiblePage; pageNumber += 1) {
    visiblePages.push(pageNumber);
  }

  return (
    <nav className="pagination" aria-label="Phân trang Pokémon">
      <p className="pagination__summary">
        Trang <strong>{page}</strong> / {totalPages}
      </p>

      <div className="pagination__controls">
        <button
          className="button page-button page-button--wide"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || loading}
        >
          ← Trước
        </button>

        {firstVisiblePage > 1 && (
          <>
            <button
              className="button page-button"
              onClick={() => onPageChange(1)}
              disabled={loading}
            >
              1
            </button>
            {firstVisiblePage > 2 && <span className="pagination__ellipsis">...</span>}
          </>
        )}

        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`button page-button ${pageNumber === page ? "page-button--active" : ""}`}
            onClick={() => onPageChange(pageNumber)}
            disabled={loading}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}

        {lastVisiblePage < totalPages && (
          <>
            {lastVisiblePage < totalPages - 1 && (
              <span className="pagination__ellipsis">...</span>
            )}
            <button
              className="button page-button"
              onClick={() => onPageChange(totalPages)}
              disabled={loading}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="button page-button page-button--wide"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || loading}
        >
          Sau →
        </button>
      </div>
    </nav>
  );
}
