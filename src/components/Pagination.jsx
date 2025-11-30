import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ meta, onPageChange }) {
  const { page = 1, totalPages = 1, total = 0, limit = 10 } = meta || {};

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        نمایش {startItem} تا {endItem} از {total} مورد
      </div>
      
      <div className="join">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="join-item btn btn-outline"
          aria-label="صفحه قبلی"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <button
                key={`ellipsis-${index}`}
                className="join-item btn btn-disabled"
                disabled
              >
                ...
              </button>
            );
          }

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`join-item btn ${
                page === pageNum ? "btn-active" : "btn-outline"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="join-item btn btn-outline"
          aria-label="صفحه بعد"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

