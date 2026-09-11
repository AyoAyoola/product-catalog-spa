import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination: React.FC = () => {
  const { filteredProducts, filters, setFilter } = useProductCatalog();

  const totalItems = filteredProducts.length;
  if (totalItems === 0) return null;

  const totalPages = Math.ceil(totalItems / filters.pageSize);
  const currentPage = filters.page;

  const startIndex = (currentPage - 1) * filters.pageSize + 1;
  const endIndex = Math.min(currentPage * filters.pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav
      aria-label="Product catalog pagination"
      className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      {/* Items Counter & Per Page Selector */}
      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <span>
          Showing <strong className="font-semibold text-gray-900 dark:text-white">{startIndex}</strong> to{' '}
          <strong className="font-semibold text-gray-900 dark:text-white">{endIndex}</strong> of{' '}
          <strong className="font-semibold text-gray-900 dark:text-white">{totalItems}</strong> products
        </span>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-slate-700">
          <label htmlFor="page-size-select" className="sr-only">Items per page</label>
          <span className="text-xs">Per page:</span>
          <select
            id="page-size-select"
            value={filters.pageSize}
            onChange={(e) => setFilter('pageSize', Number(e.target.value))}
            className="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white text-xs font-semibold px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        
        {/* Prev Page Button */}
        <button
          onClick={() => setFilter('page', Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="inline-flex items-center justify-center p-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (typeof page === 'string') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 dark:text-gray-600 text-xs">
                  ...
                </span>
              );
            }
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => setFilter('page', page)}
                aria-label={`Page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                className={`w-9 h-9 text-xs font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => setFilter('page', Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="inline-flex items-center justify-center p-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </nav>
  );
};
