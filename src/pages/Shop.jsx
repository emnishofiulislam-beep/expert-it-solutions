import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Check
} from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products.js';
import { CATEGORIES, BRANDS } from '../data/categories.js';
import ProductCard from '../components/products/ProductCard.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import Pagination from '../components/common/Pagination.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

const ITEMS_PER_PAGE = 8;

export default function Shop() {
  const productContext = useProducts();
  const products = productContext?.products || DEFAULT_PRODUCTS;
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(40000);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
    const brand = searchParams.get('brand');
    if (brand) setSelectedBrand(brand);
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setInStockOnly(false);
    setPriceRange(40000);
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name ? product.name.toLowerCase().includes(q) : false;
        const matchBrand = product.brand ? product.brand.toLowerCase().includes(q) : false;
        const matchSku = product.sku ? product.sku.toLowerCase().includes(q) : false;
        const matchCat = product.category ? product.category.toLowerCase().includes(q) : false;
        if (!matchName && !matchBrand && !matchSku && !matchCat) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all') {
        const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
        const targetCat = catObj ? catObj.name.toLowerCase() : selectedCategory.toLowerCase();
        if (!product.category || !product.category.toLowerCase().includes(targetCat)) {
          return false;
        }
      }

      // Brand
      if (selectedBrand !== 'all') {
        if (!product.brand || product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // Stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // Price
      const finalPrice = product.discountPrice || product.price || 0;
      if (finalPrice > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price || 0;
      const priceB = b.discountPrice || b.price || 0;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, inStockOnly, priceRange, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange < 40000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Online Shop & Showroom' }]} />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            IT Products & Electronics Showroom
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            Order CCTV equipment, borderless IPS monitors, Wi-Fi routers, enterprise switches, storage drives, and genuine computer accessories with official warranty.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <span className="text-xs text-blue-300 font-semibold block">Total Catalog Items</span>
          <span className="text-2xl font-black text-white">{products.length}+ Products</span>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </h3>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Search inside shop */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Product name, brand, SKU..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Category
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Categories</span>
                <span>{products.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
              Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Brands</option>
              {BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-black text-blue-600">৳{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="300"
              max="40000"
              step="500"
              value={priceRange}
              onChange={(e) => {
                setPriceRange(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>৳300</span>
              <span>৳40,000</span>
            </div>
          </div>

          {/* In Stock Checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS LISTING AREA */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Control Bar: Total count + Mobile Filter Button + Sorting */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
              </button>

              <span className="text-xs font-medium text-slate-500">
                Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
              </span>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured Items</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product, idx) => (
                <ProductCard key={product._id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Matching Products Found"
              description="No products matched your active filters or search keyword. Try clearing some filters or changing your search terms."
              actionText="Reset All Filters"
              onActionClick={handleResetFilters}
            />
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-xs lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 shadow-2xl ml-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span>Filter Products</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                >
                  <option value="all">All Brands</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price slider */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold text-slate-700 uppercase">Max Price</span>
                  <span className="font-black text-blue-600">৳{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="40000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* In stock */}
              <div>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
