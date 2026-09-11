import React, { useState } from 'react';
import { Product } from '../../types/product';
import { useProductCatalog } from '../../context/ProductContext';
import { formatCurrency, truncateText } from '../../utils/formatters';
import { Star, Eye, Edit3, Trash2, Tag, Box, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { setSelectedProduct, openEditModal, setDeleteCandidate } = useProductCatalog();
  const [imageError, setImageError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

  const stockBadge = () => {
    if (product.stock <= 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="w-3 h-3" /> Out of stock
        </span>
      );
    }
    if (product.stock < 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <Box className="w-3 h-3" /> Only {product.stock} left
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
        In stock ({product.stock})
      </span>
    );
  };

  if (viewMode === 'list') {
    return (
      <article className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-200 flex flex-col sm:flex-row items-center gap-5">
        
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-36 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 flex-shrink-0">
          <img
            src={imageError ? fallbackImage : product.imageUrl}
            alt={product.title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {product.isFeatured && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-brand-600 text-white shadow-md">
              Featured
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
              <Tag className="w-3 h-3 text-brand-500" />
              {product.category}
            </span>
            {stockBadge()}
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center text-amber-400 text-xs font-semibold gap-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 dark:text-gray-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-500 dark:text-gray-400 block">Price</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedProduct(product)}
              title="Quick View"
              aria-label={`Quick view ${product.title}`}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/60 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => openEditModal(product)}
              title="Edit Product"
              aria-label={`Edit ${product.title}`}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/60 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteCandidate(product)}
              title="Delete Product"
              aria-label={`Delete ${product.title}`}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </article>
    );
  }

  // Grid View Mode (Default)
  return (
    <article className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={imageError ? fallbackImage : product.imageUrl}
          alt={product.title}
          onError={() => setImageError(true)}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Featured Ribbon */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-brand-600 text-white shadow-md">
            Featured
          </span>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4 backdrop-blur-[2px]">
          <button
            onClick={() => setSelectedProduct(product)}
            aria-label={`Quick view ${product.title}`}
            className="p-2.5 bg-white text-gray-900 rounded-xl shadow-lg hover:bg-brand-600 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-500"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => openEditModal(product)}
            aria-label={`Edit ${product.title}`}
            className="p-2.5 bg-white text-gray-900 rounded-xl shadow-lg hover:bg-amber-600 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
            title="Edit Product"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteCandidate(product)}
            aria-label={`Delete ${product.title}`}
            className="p-2.5 bg-white text-gray-900 rounded-xl shadow-lg hover:bg-rose-600 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-500"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-2">
          {/* Header Metadata: Category & Stock */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/80 px-2.5 py-0.5 rounded-lg border border-brand-200/60 dark:border-brand-900/60">
              {product.category}
            </span>
            {stockBadge()}
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-base text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors line-clamp-1"
          >
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {truncateText(product.description, 90)}
          </p>
        </div>

        {/* Footer Rating & Price */}
        <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center text-amber-400 text-xs font-semibold gap-1">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-gray-400 dark:text-gray-500 font-normal">({product.reviewCount})</span>
          </div>

          <span className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {formatCurrency(product.price)}
          </span>
        </div>

      </div>

    </article>
  );
};
