import React from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { ProductCard } from './ProductCard';
import { ProductFilter } from './ProductFilter';
import { EmptyState } from './EmptyState';
import { SkeletonLoader } from './SkeletonLoader';
import { Pagination } from './Pagination';

export const ProductGrid: React.FC = () => {
  const { paginatedProducts, filteredProducts, filters, isLoading } = useProductCatalog();

  return (
    <section aria-label="Product Catalog Display" className="space-y-6">
      
      {/* Search, Categories, Sort & Filter Bar */}
      <ProductFilter />

      {/* Conditional Rendering: Loading, Empty, or Products Grid */}
      {isLoading ? (
        <SkeletonLoader count={filters.pageSize} viewMode={filters.viewMode} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div
            className={
              filters.viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={filters.viewMode}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination />
        </>
      )}

    </section>
  );
};
