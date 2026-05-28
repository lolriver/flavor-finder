import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  darkMode: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  darkMode
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          currentPage === 1
            ? darkMode
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-400 cursor-not-allowed'
            : darkMode
            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className={`px-3 py-2 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          currentPage === totalPages
            ? darkMode
              ? 'text-gray-600 cursor-not-allowed'
              : 'text-gray-400 cursor-not-allowed'
            : darkMode
            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};