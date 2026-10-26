import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ShoppingCart, Heart, Shield, Award, ArrowRight } from 'lucide-react';
import Rating from '../common/Rating.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const isOutOfStock = Number(product.stock) <= 0;
  const isWishlisted = isInWishlist(product._id);
  const regularPrice = Number(product.price) || 0;
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const discountPercent =
    discountPrice && regularPrice > discountPrice && regularPrice > 0
      ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Product Image */}
          <div className="relative bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-slate-100">
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
            <img
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              className="max-h-60 w-auto object-contain mx-auto transition-transform hover:scale-105 duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-3.5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">{product.name}</h3>
            </div>

            <Rating rating={product.rating} reviewCount={product.reviewCount} />

            {/* Pricing */}
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="text-2xl font-black text-slate-900">
                ৳{(product.discountPrice || product.price).toLocaleString()}
              </span>
              {product.discountPrice && (
                <span className="text-sm font-medium text-slate-400 line-through">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                  Out of Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units available)
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Key Specs */}
            {product.specifications && (
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs space-y-1">
                {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-slate-500 font-medium">{key}:</span>
                    <span className="text-slate-800 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            {!isOutOfStock && (
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-slate-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100">
              <Link
                to={`/product/${product._id}`}
                onClick={onClose}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
              >
                <span>View Full Product Specifications & Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
