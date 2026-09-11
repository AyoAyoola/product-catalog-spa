import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { CATEGORIES } from '../../data/mockProducts';
import { SortOption } from '../../types/product';
import { Search, X, SlidersHorizontal, LayoutGrid, List, RotateCcw, CheckSquare, Square } from 'lucide-react';
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
    <div className="space-y-4 my-6">
      
      {/* Main Monochromatic Filter Panel */}
      <div className="mono-panel rounded-2xl p-4 space-y-4 transition-all">
        
        {/* Top Controls: Search Input + Sorting + View Toggle */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Realtime Search Bar */}
          <div className="relative flex-1 group">
            <label htmlFor="catalog-search" className="sr-only">Search catalog</label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="catalog-search"
              type="text"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search by title, description, or category..."
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-zinc-100/70 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-900 dark:focus:border-zinc-100 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-200"
            />
            {filters.search ? (
              <button
                type="button"
                onClick={() => setFilter('search', '')}
                aria-label="Clear search input"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-3 hidden sm:flex items-center pointer-events-none text-[10px] font-bold text-zinc-400">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">⌘K</span>
              </div>
            )}
          </div>

          {/* Right Controls: Sort Select & View Mode Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-2.5">
            
            {/* Sorting Select */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-select" className="sr-only">Sort options</label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilter('sortBy', e.target.value as SortOption)}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500/20 cursor-pointer transition-colors"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="title-asc">Title: A to Z</option>
                <option value="newest">Newest Added</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setFilter('viewMode', 'grid')}
                aria-label="Grid View"
                aria-pressed={filters.viewMode === 'grid'}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  filters.viewMode === 'grid'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
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
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  filters.viewMode === 'list'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Category Pills Row */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          
          <div role="tablist" aria-label="Product Categories" className="flex flex-wrap items-center gap-1.5">
            
            {/* All Category Pill */}
            <button
              type="button"
              role="tab"
              aria-selected={filters.category === 'All'}
              onClick={() => setFilter('category', 'All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-200 ${
                filters.category === 'All'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              All ({products.length})
            </button>

            {/* Individual Category Pills */}
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-200 ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-4 text-xs font-bold text-zinc-600 dark:text-zinc-400">
            <button
              type="button"
              onClick={() => setFilter('inStockOnly', !filters.inStockOnly)}
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {filters.inStockOnly ? (
                <CheckSquare className="w-4 h-4 text-zinc-900 dark:text-white" />
              ) : (
                <Square className="w-4 h-4 text-zinc-400" />
              )}
              <span>In stock</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear ({activeFilterCount})
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter options"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in duration-200 md:hidden"
        >
          <div className="bg-white dark:bg-zinc-900 w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-zinc-900 dark:text-white" />
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">Filter Catalog</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Category
                </label>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setFilter('category', 'All')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      filters.category === 'All'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilter('category', cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        filters.category === cat
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {cat} ({products.filter(p => p.category === cat).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Slider */}
              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                  <span>Max Price</span>
                  <span className="text-zinc-900 dark:text-white font-black">{formatCurrency(filters.maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
                  className="w-full accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
                />
              </div>

              {/* Mobile Stock Checkbox */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <label className="flex items-center gap-3 text-xs font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilter('inStockOnly', e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900 dark:text-zinc-100 accent-zinc-900"
                  />
                  <span>In-stock only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-xl"
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
