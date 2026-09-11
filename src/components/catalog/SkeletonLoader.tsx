import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  viewMode?: 'grid' | 'list';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 8, viewMode = 'grid' }) => {
  const items = Array.from({ length: count });

  if (viewMode === 'list') {
    return (
      <div className="space-y-4 my-6">
        {items.map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 animate-pulse"
          >
            <div className="w-full sm:w-48 h-36 bg-gray-200 dark:bg-slate-800 rounded-xl flex-shrink-0" />
            <div className="flex-1 w-full space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-20 bg-gray-200 dark:bg-slate-800 rounded-md" />
                <div className="h-5 w-16 bg-gray-200 dark:bg-slate-800 rounded-md" />
              </div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-800 rounded-md" />
            </div>
            <div className="w-full sm:w-32 h-10 bg-gray-200 dark:bg-slate-800 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
      {items.map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden p-4 space-y-4 animate-pulse flex flex-col h-72"
        >
          <div className="w-full h-44 bg-gray-200 dark:bg-slate-800 rounded-xl" />
          <div className="flex justify-between items-center">
            <div className="h-4 w-16 bg-gray-200 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-12 bg-gray-200 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded-md" />
        </div>
      ))}
    </div>
  );
};
