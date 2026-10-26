import React, { useState, useMemo } from 'react';
import {
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  X,
  Star,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Eye,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext.jsx';
import { CATEGORIES, BRANDS } from '../../data/categories.js';

export default function Products() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    toggleProductFeatured
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // all, low, out, instock
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    category: CATEGORIES[0]?.name || 'CCTV',
    brand: BRANDS[0] || 'Hikvision',
    price: '',
    discountPrice: '',
    stock: '10',
    sku: '',
    warranty: '1 Year Full Replacement Warranty',
    description: '',
    featured: false
  };

  const [formData, setFormData] = useState(initialForm);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.sku?.toLowerCase().includes(query) ||
        item.brand?.toLowerCase().includes(query);

      // Category
      const matchesCategory =
        selectedCategory === 'all' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      // Brand
      const matchesBrand =
        selectedBrand === 'all' ||
        item.brand?.toLowerCase() === selectedBrand.toLowerCase();

      // Stock
      let matchesStock = true;
      if (stockFilter === 'low') {
        matchesStock = item.stock > 0 && item.stock < 5;
      } else if (stockFilter === 'out') {
        matchesStock = item.stock <= 0;
      } else if (stockFilter === 'instock') {
        matchesStock = item.stock >= 5;
      }

      return matchesSearch && matchesCategory && matchesBrand && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, stockFilter]);

  // Open add modal
  const handleOpenAddModal = () => {
    setFormData(initialForm);
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand || 'Generic',
      price: product.price.toString(),
      discountPrice: product.discountPrice ? product.discountPrice.toString() : '',
      stock: product.stock.toString(),
      sku: product.sku || '',
      warranty: product.specifications?.Warranty || '1 Year Official Warranty',
      description: product.description || '',
      featured: Boolean(product.featured)
    });
    setIsAddModalOpen(true);
  };

  // Submit Add or Edit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingProduct) {
      updateProduct(editingProduct._id, {
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
        stock: Number(formData.stock) || 0,
        sku: formData.sku,
        description: formData.description,
        featured: formData.featured,
        specifications: {
          ...editingProduct.specifications,
          Brand: formData.brand,
          Warranty: formData.warranty
        }
      });
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        price: Number(formData.price),
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
        stock: Number(formData.stock) || 0,
        sku: formData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        description: formData.description,
        featured: formData.featured,
        warranty: formData.warranty,
        images: ['/placeholder.jpg']
      });
    }

    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Product Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage showroom & online inventory, update pricing, stock levels, and featured highlights.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/30 transition-all active:scale-98 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product, brand, SKU..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Categories ({CATEGORIES.length})</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Brand Filter */}
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Brands</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Stock Filter */}
          <div className="relative">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Stock Status</option>
              <option value="instock">In Stock (&ge; 5)</option>
              <option value="low">Low Stock (&lt; 5)</option>
              <option value="out">Out of Stock (0)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
          <span>
            Showing <strong className="text-white">{filteredProducts.length}</strong> of{' '}
            <strong className="text-slate-300">{products.length}</strong> products
          </span>

          {(searchQuery || selectedCategory !== 'all' || selectedBrand !== 'all' || stockFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedBrand('all');
                setStockFilter('all');
              }}
              className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-3 font-semibold">Category</th>
                <th className="py-3.5 px-3 font-semibold">Brand</th>
                <th className="py-3.5 px-3 font-semibold">Price (BDT)</th>
                <th className="py-3.5 px-3 font-semibold">Stock</th>
                <th className="py-3.5 px-3 font-semibold text-center">Featured</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isLow = product.stock > 0 && product.stock < 5;
                  const isOut = product.stock <= 0;

                  return (
                    <tr key={product._id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Name & SKU */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || '/placeholder.jpg'}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-slate-700 shrink-0"
                          />
                          <div className="min-w-0 max-w-[240px]">
                            <p className="font-bold text-white truncate hover:text-blue-400 transition-colors">
                              {product.name}
                            </p>
                            <span className="text-[10px] text-slate-500 font-mono">
                              SKU: {product.sku || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 text-slate-300 font-medium">
                        {product.category}
                      </td>

                      {/* Brand */}
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                          {product.brand || 'Generic'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-3">
                        <div>
                          {product.discountPrice ? (
                            <>
                              <span className="font-bold text-white">
                                ৳{product.discountPrice.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-500 line-through ml-1.5">
                                ৳{product.price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-white">
                              ৳{product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock with quick adjust */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                              isOut
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                : isLow
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            }`}
                          >
                            {product.stock} pcs
                          </span>

                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={() => updateProductStock(product._id, Math.max(0, product.stock - 1))}
                              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold"
                              title="Decrease stock"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => updateProductStock(product._id, product.stock + 1)}
                              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold"
                              title="Increase stock"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => toggleProductFeatured(product._id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            product.featured
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : 'bg-slate-800/40 border-slate-700 text-slate-600 hover:text-slate-400'
                          }`}
                          title="Toggle featured showcase"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/product/${product.slug || product._id}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Preview on Store"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(product)}
                            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(product._id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No products matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hikvision 2MP IP Bullet Camera"
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500"
                  >
                    {BRANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Regular Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Regular Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1850"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                {/* Discounted Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Discount Price (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    placeholder="1599 (optional)"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                {/* Stock Count */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="15"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* SKU */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="CCTV-HIK-002"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                {/* Warranty */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Warranty Term
                  </label>
                  <input
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    placeholder="1 Year Full Replacement"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key product highlights, sensors, resolution, interface..."
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <label htmlFor="featuredToggle" className="text-xs font-medium text-slate-300">
                  Showcase on Home Page Featured Section
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md shadow-blue-600/30 transition-all active:scale-98"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Product?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              This will remove the product from the database and showroom listings. This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md shadow-rose-600/30"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
