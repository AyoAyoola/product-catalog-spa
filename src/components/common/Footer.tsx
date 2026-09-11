import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { ShieldCheck, RotateCcw, Bug } from 'lucide-react';

interface FooterProps {
  onTriggerError?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerError }) => {
  const { resetCatalog } = useProductCatalog();

  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-white via-zinc-50 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left info */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Product Catalog SPA
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              Built with React 19, TypeScript, Tailwind CSS, & WCAG 2.1 AA Standards.
            </p>
          </div>

          {/* Center Badges & Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            
            {/* WCAG Compliance Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 shadow-sm backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              WCAG 2.1 AA Compliant
            </span>

            {/* Reset Catalog Button */}
            <button
              onClick={resetCatalog}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
              title="Reset catalog back to initial 50 products"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Catalog Data
            </button>

            {/* Error Boundary Demo Trigger */}
            {onTriggerError && (
              <button
                onClick={onTriggerError}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500"
                title="Test Error Boundary fallback UI"
              >
                <Bug className="w-3.5 h-3.5" />
                Test Error Boundary
              </button>
            )}

          </div>

        </div>
      </div>
    </footer>
  );
};
