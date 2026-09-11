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
    info: <Info className="w-5 h-5 text-brand-500 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
    error: 'bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100',
    warning: 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
    info: 'bg-brand-50 dark:bg-brand-950/80 border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-100',
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all ${bgStyles[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1 text-sm">
          <h4 className="font-semibold">{toast.title}</h4>
          <p className="mt-0.5 opacity-90">{toast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          aria-label="Close notification"
          className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
