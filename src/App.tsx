import React, { useState } from 'react';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { ProductProvider } from './context/ProductContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { ConfirmDialog } from './components/common/ConfirmDialog';
import { ProductGrid } from './components/catalog/ProductGrid';
import { ProductDetailModal } from './components/catalog/ProductDetailModal';
import { ProductFormModal } from './components/form/ProductFormModal';

// Buggy Component helper to demonstrate ErrorBoundary
const BuggyComponent: React.FC = () => {
  throw new Error('Simulated runtime error triggered by user to test Error Boundary!');
};

function MainApp() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    return <BuggyComponent />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      <div>
        {/* Navigation & Brand Header */}
        <Header />

        {/* Hero & Intro Banner */}
        <section aria-label="Catalog Overview" className="bg-gradient-to-b from-brand-50/50 to-transparent dark:from-slate-900/40 dark:to-transparent py-8 border-b border-gray-100 dark:border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Product Catalog & Inventory
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                  Browse, filter, and manage your product showcase in real-time. Features accessible keyboard navigation, instant category filtering, price sliders, and full product creation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Catalog Section */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProductGrid />
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <ProductDetailModal />
      <ProductFormModal />
      <ConfirmDialog />
      <Toast />

      {/* Semantic Footer */}
      <Footer onTriggerError={() => setShouldCrash(true)} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ProductProvider>
        <MainApp />
      </ProductProvider>
    </ErrorBoundary>
  );
}
