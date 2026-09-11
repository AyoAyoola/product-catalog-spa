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
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/60">
          <AlertCircle className="w-3 h-3" /> Sold out
        </span>
      );
    }
    if (product.stock < 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/60">
          <Box className="w-3 h-3" /> {product.stock} left
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60">
        In stock
      </span>
    );
  };

  if (viewMode === 'list') {
    return (
      <article className="group glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 animate-fade-in">
        
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
          <img
            src={imageError ? fallbackImage : product.imageUrl}
            alt={product.title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {product.isFeatured && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-black tracking-widest uppercase bg-slate-900 dark:bg-brand-600 text-white shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Tag className="w-3 h-3 text-brand-500" />
              {product.category}
            </span>
            {stockBadge()}
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Price</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedProduct(product)}
              title="Quick View"
              aria-label={`Quick view ${product.title}`}
              className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => openEditModal(product)}
              title="Edit Product"
              aria-label={`Edit ${product.title}`}
              className="p-2 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteCandidate(product)}
              title="Delete Product"
              aria-label={`Delete ${product.title}`}
              className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </article>
    );
  }

  // Grid View Mode (Default Minimalist Card)
  return (
    <article className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full animate-fade-in">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={imageError ? fallbackImage : product.imageUrl}
          alt={product.title}
          onError={() => setImageError(true)}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Featured Ribbon */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[9px] font-black tracking-widest uppercase bg-slate-900/90 dark:bg-brand-600 text-white shadow-sm backdrop-blur-sm">
            Featured
          </span>
        )}

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <button
            onClick={() => setSelectedProduct(product)}
            aria-label={`Quick view ${product.title}`}
            className="p-2.5 bg-white text-slate-900 rounded-xl shadow-lg hover:bg-brand-600 hover:text-white transition-all duration-200 transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => openEditModal(product)}
            aria-label={`Edit ${product.title}`}
            className="p-2.5 bg-white text-slate-900 rounded-xl shadow-lg hover:bg-amber-500 hover:text-white transition-all duration-200 transform hover:scale-110"
            title="Edit Product"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteCandidate(product)}
            aria-label={`Delete ${product.title}`}
            className="p-2.5 bg-white text-slate-900 rounded-xl shadow-lg hover:bg-rose-600 hover:text-white transition-all duration-200 transform hover:scale-110"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-2">
          {/* Header Metadata */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {product.category}
            </span>
            {stockBadge()}
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-sm text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors line-clamp-1"
          >
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {truncateText(product.description, 85)}
          </p>
        </div>

        {/* Footer Rating & Price */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal">({product.reviewCount})</span>
          </div>

          <span className="text-base font-black text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {formatCurrency(product.price)}
          </span>
        </div>

      </div>

    </article>
  );
};
