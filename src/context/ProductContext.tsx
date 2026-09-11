import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, FilterState, ProductFormData, ToastMessage } from '../types/product';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const STORAGE_KEY = 'procatalog_products_v1';
const THEME_KEY = 'procatalog_theme_v1';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'All',
  minPrice: 0,
  maxPrice: 500,
  inStockOnly: false,
  sortBy: 'featured',
  viewMode: 'grid',
  page: 1,
  pageSize: 12,
};

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  paginatedProducts: Product[];
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  
  // CRUD Actions
  addProduct: (data: ProductFormData) => void;
  updateProduct: (id: string, data: ProductFormData) => void;
  deleteProduct: (id: string) => void;
  resetCatalog: () => void;

  // Modals & UI state
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isFormModalOpen: boolean;
  editingProduct: Product | null;
  openAddModal: () => void;
  openEditModal: (product: Product) => void;
  closeFormModal: () => void;

  // Delete dialog state
  deleteCandidate: Product | null;
  setDeleteCandidate: (product: Product | null) => void;
  confirmDelete: () => void;

  // Feedback & Utilities
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  simulateLoadingState: () => void;
  toast: ToastMessage | null;
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  dismissToast: () => void;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Mobile Filter Drawer
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (open: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial products from localStorage or fall back to MOCK_PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return MOCK_PRODUCTS;
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Save products to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Toast Helper
  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString();
    setToast({ id, type, title, message });
  };

  const dismissToast = () => setToast(null);

  // Auto dismiss toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search term matching title or description or category
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // Category matching
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Price Range matching
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Stock status filter
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'featured':
        default:
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
      }
    });
  }, [products, filters.search, filters.category, filters.minPrice, filters.maxPrice, filters.inStockOnly, filters.sortBy]);

  // Pagination Logic
  const paginatedProducts = useMemo(() => {
    const startIndex = (filters.page - 1) * filters.pageSize;
    return filteredProducts.slice(startIndex, startIndex + filters.pageSize);
  }, [filteredProducts, filters.page, filters.pageSize]);

  // Reset page to 1 whenever filters change
  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // If updating search/category/price, reset page to 1
      ...(key !== 'page' && key !== 'viewMode' ? { page: 1 } : {}),
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showToast('info', 'Filters Reset', 'All search terms and filters have been reset to default.');
  };

  // CRUD Implementations
  const addProduct = (data: ProductFormData) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: data.title.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      category: data.category,
      imageUrl: data.imageUrl.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewCount: 1,
      stock: Number(data.stock) || 10,
      isFeatured: Boolean(data.isFeatured),
      createdAt: new Date().toISOString(),
    };

    setProducts(prev => [newProduct, ...prev]);
    setIsFormModalOpen(false);
    showToast('success', 'Product Created', `"${newProduct.title}" has been added to the catalog.`);
  };

  const updateProduct = (id: string, data: ProductFormData) => {
    setProducts(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: data.title.trim(),
          description: data.description.trim(),
          price: Number(data.price),
          category: data.category,
          imageUrl: data.imageUrl.trim() || item.imageUrl,
          stock: Number(data.stock),
          isFeatured: Boolean(data.isFeatured),
        };
      }
      return item;
    }));
    setIsFormModalOpen(false);
    setEditingProduct(null);
    showToast('success', 'Product Updated', `"${data.title}" details have been updated successfully.`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(item => item.id !== id));
    setDeleteCandidate(null);
    if (target) {
      showToast('warning', 'Product Removed', `"${target.title}" was deleted from the catalog.`);
    }
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      deleteProduct(deleteCandidate.id);
    }
  };

  const resetCatalog = () => {
    setProducts(MOCK_PRODUCTS);
    setFilters(DEFAULT_FILTERS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('info', 'Catalog Restored', 'Catalog restored to 50 original mock products.');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingProduct(null);
  };

  const simulateLoadingState = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('info', 'Catalog Refreshed', 'Simulated server fetch completed successfully.');
    }, 800);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        paginatedProducts,
        filters,
        setFilter,
        resetFilters,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
        selectedProduct,
        setSelectedProduct,
        isFormModalOpen,
        editingProduct,
        openAddModal,
        openEditModal,
        closeFormModal,
        deleteCandidate,
        setDeleteCandidate,
        confirmDelete,
        isLoading,
        setIsLoading,
        simulateLoadingState,
        toast,
        showToast,
        dismissToast,
        darkMode,
        toggleDarkMode,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductCatalog = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductCatalog must be used within a ProductProvider');
  }
  return context;
};
