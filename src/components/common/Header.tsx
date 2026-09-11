import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { Plus, Sun, Moon, SlidersHorizontal, RefreshCw, Package } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    products,
    filteredProducts,
    openAddModal,
    darkMode,
    toggleDarkMode,
    setIsMobileFilterOpen,
    simulateLoadingState,
    isLoading
  } = useProductCatalog();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-bold shadow-md shadow-zinc-950/10">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white">
                  PRO<span className="text-zinc-500 dark:text-zinc-400 font-normal">CATALOG</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80">
                  Monochrome
                </span>
              </div>
            </div>
          </div>

          {/* Quick Counter Badges */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              <span>Catalog: <strong className="font-bold text-zinc-900 dark:text-white">{products.length}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800">
              <span>Showing: <strong className="font-bold text-zinc-900 dark:text-white">{filteredProducts.length}</strong></span>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              aria-label="Open filter menu"
              className="md:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Simulate Refresh Button */}
            <button
              onClick={simulateLoadingState}
              disabled={isLoading}
              title="Simulate API Refresh"
              aria-label="Simulate catalog refresh"
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-40"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-zinc-900 dark:text-white' : ''}`} />
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-zinc-200" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-800" />
              )}
            </button>

            {/* Add Product Button */}
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 active:bg-black dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 active:scale-95 rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Item</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
