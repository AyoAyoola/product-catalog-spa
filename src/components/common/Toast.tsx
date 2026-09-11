import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useProductCatalog();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-zinc-400 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-800 dark:border-zinc-200',
    error: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-800 dark:border-zinc-200',
    warning: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-800 dark:border-zinc-200',
    info: 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-800 dark:border-zinc-200',
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all ${bgStyles[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1 text-sm">
          <h4 className="font-bold">{toast.title}</h4>
          <p className="mt-0.5 opacity-90 text-xs font-medium">{toast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          aria-label="Close notification"
          className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
