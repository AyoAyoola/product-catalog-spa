import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { SearchX, RotateCcw, Plus } from 'lucide-react';

export const EmptyState: React.FC = () => {
  const { filters, resetFilters, openAddModal } = useProductCatalog();

  const isFiltered = Boolean(
    filters.search ||
    filters.category !== 'All' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 500 ||
    filters.inStockOnly
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-dashed border-gray-300 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center my-8 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {isFiltered ? 'No matching products found' : 'No products in catalog'}
      </h3>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
        {isFiltered ? (
          <>
            We couldn't find any products matching <span className="font-semibold text-gray-700 dark:text-gray-300">"{filters.search || filters.category}"</span>. Try adjusting your search query, price sliders, or category filters.
          </>
        ) : (
          'Your product catalog is currently empty. Get started by adding your first product!'
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All Filters
          </button>
        )}

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>
    </div>
  );
};
