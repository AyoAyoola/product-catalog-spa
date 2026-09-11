import React, { useState, useEffect } from 'react';
import { useProductCatalog } from '../../context/ProductContext';
import { CATEGORIES } from '../../data/mockProducts';
import { CategoryType, ProductFormData } from '../../types/product';
import { X, PlusCircle, CheckCircle2, Image as ImageIcon, Sparkles, DollarSign, PackagePlus } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_IMAGE_PRESETS = [
  { name: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Watch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sneakers', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80' },
  { name: 'Coffee Dripper', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Camera/Mic', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80' },
  { name: 'Skincare', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80' },
];

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  imageUrl?: string;
  stock?: string;
}

export const ProductFormModal: React.FC = () => {
  const { isFormModalOpen, closeFormModal, editingProduct, addProduct, updateProduct } = useProductCatalog();

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '',
    category: 'Electronics',
    imageUrl: '',
    stock: 15,
    isFeatured: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset or populate form when modal opens or editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        imageUrl: editingProduct.imageUrl,
        stock: editingProduct.stock,
        isFeatured: editingProduct.isFeatured || false,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'Electronics',
        imageUrl: SAMPLE_IMAGE_PRESETS[0].url,
        stock: 15,
        isFeatured: false,
      });
    }
    setTouched({});
    setErrors({});
  }, [editingProduct, isFormModalOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFormModalOpen) {
        closeFormModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormModalOpen, closeFormModal]);

  // Real-time Validation logic
  const validate = (data: ProductFormData): FormErrors => {
    const errs: FormErrors = {};

    // Title Validation
    if (!data.title.trim()) {
      errs.title = 'Product title is required';
    } else if (data.title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters long';
    } else if (data.title.trim().length > 100) {
      errs.title = 'Title cannot exceed 100 characters';
    }

    // Description Validation
    if (!data.description.trim()) {
      errs.description = 'Product description is required';
    } else if (data.description.trim().length < 10) {
      errs.description = 'Description must be at least 10 characters long';
    }

    // Price Validation
    if (data.price === '' || data.price === null || data.price === undefined) {
      errs.price = 'Product price is required';
    } else if (isNaN(Number(data.price))) {
      errs.price = 'Price must be a valid number';
    } else if (Number(data.price) <= 0) {
      errs.price = 'Price must be a positive number greater than 0';
    }

    // Category Validation
    if (!data.category) {
      errs.category = 'Please select a product category';
    }

    // Stock Validation
    if (data.stock !== '' && (isNaN(Number(data.stock)) || Number(data.stock) < 0)) {
      errs.stock = 'Stock must be a non-negative number';
    }

    // Image URL Validation (optional format check)
    if (data.imageUrl.trim() && !data.imageUrl.startsWith('http://') && !data.imageUrl.startsWith('https://')) {
      errs.imageUrl = 'Image URL must start with http:// or https://';
    }

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val,
    }));

    // Clear error for field on change
    if (touched[name]) {
      const updated = { ...formData, [name]: val };
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Touch all fields
    setTouched({
      title: true,
      description: true,
      price: true,
      category: true,
      imageUrl: true,
      stock: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
      // Trigger subtle celebratory confetti for new products!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore if confetti fails
      }
    }
  };

  if (!isFormModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeFormModal}
          aria-label="Close product form"
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-slate-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
            <PackagePlus className="w-6 h-6" />
          </div>
          <div>
            <h2 id="form-modal-title" className="text-xl font-extrabold text-gray-900 dark:text-white">
              {editingProduct ? 'Edit Catalog Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {editingProduct ? 'Update item details in your inventory.' : 'Fill in product information to publish to catalog.'}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
          {/* Title Field */}
          <div>
            <label htmlFor="prod-title" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="prod-title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              onBlur={() => handleBlur('title')}
              placeholder="e.g. Aura SoundPro Noise-Canceling Headphones"
              aria-invalid={Boolean(touched.title && errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={`w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                touched.title && errors.title
                  ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
                  : 'border-gray-200 dark:border-slate-700 focus:ring-brand-500'
              }`}
            />
            {touched.title && errors.title && (
              <p id="title-error" className="mt-1 text-xs text-rose-500 font-medium flex items-center gap-1">
                {errors.title}
              </p>
            )}
          </div>

          {/* Category & Price Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category Select */}
            <div>
              <label htmlFor="prod-category" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="prod-category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                onBlur={() => handleBlur('category')}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price Field */}
            <div>
              <label htmlFor="prod-price" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Price ($ USD) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  id="prod-price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  onBlur={() => handleBlur('price')}
                  placeholder="199.99"
                  aria-invalid={Boolean(touched.price && errors.price)}
                  aria-describedby={errors.price ? "price-error" : undefined}
                  className={`w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    touched.price && errors.price
                      ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
                      : 'border-gray-200 dark:border-slate-700 focus:ring-brand-500'
                  }`}
                />
              </div>
              {touched.price && errors.price && (
                <p id="price-error" className="mt-1 text-xs text-rose-500 font-medium">
                  {errors.price}
                </p>
              )}
            </div>

          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="prod-desc" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="prod-desc"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              onBlur={() => handleBlur('description')}
              placeholder="Provide key features, materials, and benefits of this product..."
              aria-invalid={Boolean(touched.description && errors.description)}
              aria-describedby={errors.description ? "desc-error" : undefined}
              className={`w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                touched.description && errors.description
                  ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
                  : 'border-gray-200 dark:border-slate-700 focus:ring-brand-500'
              }`}
            />
            {touched.description && errors.description && (
              <p id="desc-error" className="mt-1 text-xs text-rose-500 font-medium">
                {errors.description}
              </p>
            )}
          </div>

          {/* Stock & Featured Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            
            <div>
              <label htmlFor="prod-stock" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Stock Quantity
              </label>
              <input
                id="prod-stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                onBlur={() => handleBlur('stock')}
                placeholder="15"
                className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="pt-4 sm:pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-brand-600 accent-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Mark as Featured Item
                </span>
              </label>
            </div>

          </div>

          {/* Image URL & Quick Sample Presets */}
          <div className="space-y-3">
            <label htmlFor="prod-image" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              id="prod-image"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              onBlur={() => handleBlur('imageUrl')}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {touched.imageUrl && errors.imageUrl && (
              <p className="text-xs text-rose-500 font-medium">{errors.imageUrl}</p>
            )}

            {/* Sample Image Quick Selector */}
            <div>
              <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">
                Or choose a high-res sample image:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: preset.url }))}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                      formData.imageUrl === preset.url
                        ? 'bg-brand-600 text-white border-brand-600 font-semibold'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-200'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-200/60 dark:border-slate-700/60 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 dark:bg-slate-700 flex-shrink-0">
                  <img
                    src={formData.imageUrl}
                    alt="Live preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = SAMPLE_IMAGE_PRESETS[0].url;
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 block">Live Image Preview</span>
                  <span>Will render on product card thumbnail.</span>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeFormModal}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-lg shadow-brand-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <CheckCircle2 className="w-4 h-4" />
              {editingProduct ? 'Save Changes' : 'Publish Product'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
