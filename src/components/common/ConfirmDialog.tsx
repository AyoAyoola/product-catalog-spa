import React, { useEffect } from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmDialog: React.FC = () => {
  const { deleteCandidate, setDeleteCandidate, confirmDelete } = useProductCatalog();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && deleteCandidate) {
        setDeleteCandidate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteCandidate, setDeleteCandidate]);

  if (!deleteCandidate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
        <button
          onClick={() => setDeleteCandidate(null)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/80 flex items-center justify-center text-rose-600 dark:text-rose-400 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 id="delete-dialog-title" className="text-lg font-bold text-gray-900 dark:text-white">
              Delete Product?
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Action cannot be undone</p>
          </div>
        </div>

        <p id="delete-dialog-desc" className="text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to permanently remove <span className="font-semibold text-gray-900 dark:text-white">"{deleteCandidate.title}"</span> from the catalog?
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setDeleteCandidate(null)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-lg shadow-rose-600/20 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};
