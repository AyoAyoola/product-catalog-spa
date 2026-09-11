import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { ShieldCheck, RotateCcw, Bug, Heart } from 'lucide-react';

interface FooterProps {
  onTriggerError?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerError }) => {
  const { resetCatalog } = useProductCatalog();

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left info */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Product Catalog SPA Development Project
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Built with React 19, TypeScript, Tailwind CSS, & WCAG AA standards.
            </p>
          </div>

          {/* Center Badges & Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            
            {/* WCAG Compliance Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              WCAG 2.1 AA Compliant
            </span>

            {/* Reset Catalog Button */}
            <button
              onClick={resetCatalog}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
              title="Reset catalog back to initial 50 products"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Catalog Data
            </button>

            {/* Error Boundary Demo Trigger */}
            {onTriggerError && (
              <button
                onClick={onTriggerError}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                title="Test Error Boundary fallback UI"
              >
                <Bug className="w-3.5 h-3.5" />
                Test Error Boundary
              </button>
            )}

          </div>

          {/* Right copyright */}
          <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Frontend Examination</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
