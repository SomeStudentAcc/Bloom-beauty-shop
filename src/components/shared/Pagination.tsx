import React from 'react';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onPageChange }) => {
    const getPages = () => {
        const pages: (number | string)[] = [];
      
        if (pageCount <= 6) {
          // Show all pages if total is 6 or less
          for (let i = 1; i <= pageCount; i++) pages.push(i);
        } else {
          // Always show first 5 pages
          const visiblePages = 5;
          const lastVisible = visiblePages;
      
          for (let i = 1; i <= lastVisible; i++) {
            pages.push(i);
          }
      
          // Add ellipsis if total pages > 6
          if (pageCount > visiblePages + 1) {
            pages.push('...');
          }
      
          // Add last page
          pages.push(pageCount);
        }
      
        return pages;
      };
      

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-2"
      >
        ‹
      </button>

      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={i}>...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(Number(p))}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              page === p ? 'bg-primary text-white' : 'hover:bg-gray-200'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className="px-2"
      >
        ›
      </button>
    </div>
  );
};
