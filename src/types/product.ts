export type CategoryType = 
  | 'Electronics'
  | 'Fashion'
  | 'Home & Living'
  | 'Books & Stationery'
  | 'Sports & Fitness'
  | 'Beauty & Wellness';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: CategoryType;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured?: boolean;
  createdAt: string;
}

export type SortOption = 
  | 'featured' 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating' 
  | 'title-asc' 
  | 'newest';

export type ViewMode = 'grid' | 'list';

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: SortOption;
  viewMode: ViewMode;
  page: number;
  pageSize: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number | '';
  category: CategoryType;
  imageUrl: string;
  stock: number | '';
  isFeatured?: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
