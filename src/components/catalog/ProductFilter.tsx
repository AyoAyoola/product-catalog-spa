import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { CATEGORIES } from '../../data/mockProducts';
import { SortOption, ViewMode } from '../../types/product';
import { Search, X, SlidersHorizontal, LayoutGrid, List, RotateCcw, CheckSquare, Square, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const ProductFilter: React.FC = () => {
  const {
    filters,
    setFilter,
    resetFilters,
    filteredProducts,
    products,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
  } = useProductCatalog();

  const activeFilterCount = [
    Boolean(filters.search),
    filters.category !== 'All',
    filters.minPrice > 0 || filters.maxPrice < 500,
    filters.inStockOnly,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6 my-6">
      
      {/* Main Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        
        {/* Top Controls: Search Input + Sorting + View Toggle */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Realtime Search Bar */}
          <div className="relative flex-1">
            <label htmlFor="catalog-search" className="sr-only">Search products</label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="catalog-search"
              type="text"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search by product title, category, or description..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilter('search', '')}
                aria-label="Clear search input"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort Select & View Mode Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            
            {/* Sorting Select */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="sr-only sm:not-sr-only text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilter('sortBy', e.target.value as SortOption)}
                className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-xs sm:text-sm font-medium py-2.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="title-asc">Title: A to Z</option>
                <option value="newest">Newest Added</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setFilter('viewMode', 'grid')}
                aria-label="Grid View"
                aria-pressed={filters.viewMode === 'grid'}
                className={`p-1.5 rounded-lg transition-all ${
                  filters.viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setFilter('viewMode', 'list')}
                aria-label="List View"
                aria-pressed={filters.viewMode === 'list'}
                className={`p-1.5 rounded-lg transition-all ${
                  filters.viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Category Pills Row (Desktop & Tablet) */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          <div role="tablist" aria-label="Product Categories" className="flex flex-wrap items-center gap-1.5">
            
            {/* All Category Pill */}
            <button
              type="button"
              role="tab"
              aria-selected={filters.category === 'All'}
              onClick={() => setFilter('category', 'All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filters.category === 'All'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              All ({products.length})
            </button>

            {/* Individual Categories */}
            {CATEGORIES.map((cat) => {
              const count = products.filter(p => p.category === cat).length;
              const isSelected = filters.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter('category', cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Quick Stock Toggle & Clear button */}
          <div className="flex items-center gap-4 text-xs font-medium text-gray-600 dark:text-gray-300">
            <button
              type="button"
              onClick={() => setFilter('inStockOnly', !filters.inStockOnly)}
              className="inline-flex items-center gap-1.5 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {filters.inStockOnly ? (
                <CheckSquare className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              ) : (
                <Square className="w-4 h-4 text-gray-400" />
              )}
              <span>In-stock only</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset ({activeFilterCount})
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter products"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 md:hidden"
        >
          <div className="bg-white dark:bg-slate-900 w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-brand-600" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Filter Products</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Category
                </label>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setFilter('category', 'All')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      filters.category === 'All'
                        ? 'bg-brand-600 text-white font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilter('category', cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        filters.category === cat
                          ? 'bg-brand-600 text-white font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat} ({products.filter(p => p.category === cat).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Slider */}
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <span>Max Price Filter</span>
                  <span className="text-brand-600 dark:text-brand-400 text-sm font-extrabold">
                    {formatCurrency(filters.maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
              </div>

              {/* Mobile Stock Filter */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                <label className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilter('inStockOnly', e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 accent-brand-600"
                  />
                  <span>Show only in-stock items</span>
                </label>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-gray-200 dark:border-slate-800 flex items-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 rounded-xl"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-xl shadow-md"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
