import React, { useEffect } from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { X, Star, Tag, Box, Calendar, Edit3, Trash2, ShieldCheck, Check } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, openEditModal, setDeleteCandidate } = useProductCatalog();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Product Image Panel */}
          <div className="relative aspect-square md:aspect-auto h-full min-h-[250px] bg-gray-100 dark:bg-slate-800 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              className="w-full h-full object-cover object-center"
            />
            {selectedProduct.isFeatured && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold uppercase bg-brand-600 text-white shadow-lg">
                Featured Product
              </span>
            )}
          </div>

          {/* Product Details Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Stock Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  <Tag className="w-3.5 h-3.5 text-brand-500" />
                  {selectedProduct.category}
                </span>

                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${
                  selectedProduct.stock > 0
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                }`}>
                  <Box className="w-3.5 h-3.5" />
                  {selectedProduct.stock > 0 ? `${selectedProduct.stock} In Stock` : 'Out of Stock'}
                </span>
              </div>

              {/* Title */}
              <h2 id="product-detail-title" className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {selectedProduct.title}
              </h2>

              {/* Rating & Review */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-400 gap-1 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ({selectedProduct.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="py-2 border-y border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Regular Price</span>
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                  {formatCurrency(selectedProduct.price)}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                  Product Overview
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Date & Metadata */}
              <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 pt-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Added to catalog: {formatDate(selectedProduct.createdAt)}</span>
              </div>

              {/* Trust Badges */}
              <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-700/60 space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Catalog Item # {selectedProduct.id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Check className="w-3.5 h-3.5 text-brand-500" />
                  <span>WCAG AA Accessible Format</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  openEditModal(selectedProduct);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <Edit3 className="w-4 h-4" />
                Edit Product
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setDeleteCandidate(selectedProduct);
                }}
                className="inline-flex items-center justify-center p-2.5 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
