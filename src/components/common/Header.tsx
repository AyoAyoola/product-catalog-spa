import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { Plus, Sun, Moon, SlidersHorizontal, RefreshCw, Sparkles, Command } from 'lucide-react';

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
    <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-brand-500 dark:to-indigo-600 flex items-center justify-center text-white shadow-md shadow-slate-900/10 dark:shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 text-amber-300 dark:text-amber-200" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  Pro<span className="text-brand-600 dark:text-brand-400 font-black">Catalog</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                  Minimal v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Quick Counter Badges */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Catalog: <strong className="font-bold text-slate-900 dark:text-white">{products.length}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/80">
              <span>Showing: <strong className="font-bold text-brand-600 dark:text-brand-400">{filteredProducts.length}</strong></span>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              aria-label="Open filter menu"
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-900/80 rounded-xl hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Simulate Refresh Button */}
            <button
              onClick={simulateLoadingState}
              disabled={isLoading}
              title="Simulate API Refresh"
              aria-label="Simulate catalog refresh"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-900/80 rounded-xl hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-40"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-brand-500' : ''}`} />
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-900/80 rounded-xl hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all duration-300 hover:rotate-45 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 active:scale-95 rounded-xl shadow-sm hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <Plus className="w-4 h-4 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
              <span>Add Item</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
