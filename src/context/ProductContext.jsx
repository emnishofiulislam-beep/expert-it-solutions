import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products.js';

const ProductContext = createContext(null);

const STORAGE_KEY = 'expert_it_products_data';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored products, falling back to initial catalog', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Sync products changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Add new product
  const addProduct = (productData) => {
    const slug = productData.slug || productData.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProduct = {
      _id: 'prod-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: productData.name,
      slug: slug,
      sku: productData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      brand: productData.brand || 'Generic',
      category: productData.category || 'Other Accessories',
      price: Number(productData.price) || 0,
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : null,
      stock: Number(productData.stock) || 0,
      rating: Number(productData.rating) || 5.0,
      reviewCount: Number(productData.reviewCount) || 1,
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : ['/placeholder.jpg'],
      description: productData.description || 'Quality genuine product backed by official warranty.',
      specifications: productData.specifications || {
        'Brand': productData.brand || 'Generic',
        'Warranty': productData.warranty || '1 Year Official Warranty'
      },
      featured: Boolean(productData.featured),
      isNew: true,
      createdAt: new Date().toISOString()
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  // Update existing product
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item._id === id || item.id === id) {
          return {
            ...item,
            ...updatedFields,
            price: updatedFields.price !== undefined ? Number(updatedFields.price) : item.price,
            discountPrice: updatedFields.discountPrice !== undefined
              ? (updatedFields.discountPrice ? Number(updatedFields.discountPrice) : null)
              : item.discountPrice,
            stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : item.stock,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item._id !== id && item.id !== id));
  };

  // Quick stock updater
  const updateProductStock = (id, newStock) => {
    updateProduct(id, { stock: Math.max(0, Number(newStock) || 0) });
  };

  // Toggle featured status
  const toggleProductFeatured = (id) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item._id === id || item.id === id) {
          return { ...item, featured: !item.featured };
        }
        return item;
      })
    );
  };

  // Reset to default catalog
  const resetToDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getProductById = (id) => {
    return products.find((item) => item._id === id || item.id === id);
  };

  const getProductBySlug = (slug) => {
    return products.find((item) => item.slug === slug);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        toggleProductFeatured,
        resetToDefaultProducts,
        getProductById,
        getProductBySlug
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
