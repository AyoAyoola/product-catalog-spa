import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { Package, Plus, Sun, Moon, SlidersHorizontal, RefreshCw, Layers } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
                  Pro<span className="text-brand-600 dark:text-brand-400">Catalog</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  SPA
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 hidden md:block">
                Catalog Management & Showcase
              </p>
            </div>
          </div>

          {/* Quick Counter Badges */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-gray-200/60 dark:border-slate-700/60">
              <Layers className="w-3.5 h-3.5 text-brand-500" />
              <span>Total Catalog: <strong className="font-bold text-gray-900 dark:text-white">{products.length}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-gray-200/60 dark:border-slate-700/60">
              <span>Matching: <strong className="font-bold text-brand-600 dark:text-brand-400">{filteredProducts.length}</strong></span>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              aria-label="Open filter menu"
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Filters</span>
            </button>

            {/* Simulate Refresh Button */}
            <button
              onClick={simulateLoadingState}
              disabled={isLoading}
              title="Simulate API Refresh"
              aria-label="Simulate catalog refresh"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-slate-800 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-brand-500' : ''}`} />
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-slate-800 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Add Product Button */}
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md shadow-brand-500/20 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden xs:inline">Add Product</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
