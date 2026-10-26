import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Eye, Check, AlertCircle } from 'lucide-react';
import Rating from '../common/Rating.jsx';
import QuickViewModal from './QuickViewModal.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  if (!product) return null;

  const isOutOfStock = Number(product.stock) <= 0;
  const isWishlisted = isInWishlist(product._id);
  const regularPrice = Number(product.price) || 0;
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const discountPercent =
    discountPrice && regularPrice > discountPrice && regularPrice > 0
      ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
      : 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: 'easeOut' }}
        whileHover={{ y: -7, transition: { duration: 0.22, ease: 'easeOut' } }}
        className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/70 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
      >
        {/* Badges and Wishlist button */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
          {discountPercent > 0 && (
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs pointer-events-auto tracking-wide"
            >
              {discountPercent}% OFF
            </motion.span>
          )}
          {product.isNew && (
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs pointer-events-auto tracking-wide"
            >
              NEW
            </motion.span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white border border-slate-100'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </motion.button>

        {/* Product Image */}
        <Link
          to={`/product/${product._id}`}
          className="relative block w-full aspect-square bg-slate-50/80 p-5 overflow-hidden flex items-center justify-center border-b border-slate-100 group-hover:bg-slate-50 transition-colors"
        >
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Quick View Button Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className="pointer-events-auto px-4 py-2 bg-white/95 text-slate-900 rounded-xl text-xs font-bold shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
              <span className="text-blue-600 uppercase tracking-wider font-bold">{product.brand}</span>
              <span className="truncate max-w-[90px]">{product.category}</span>
            </div>

            <Link
              to={`/product/${product._id}`}
              className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2"
              title={product.name}
            >
              {product.name}
            </Link>

            <Rating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <div className="pt-3 mt-2 border-t border-slate-100">
            {/* Price & Stock */}
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-base font-black text-slate-900">
                  ৳{(discountPrice || regularPrice).toLocaleString()}
                </span>
                {discountPrice && (
                  <span className="ml-2 text-xs font-medium text-slate-400 line-through">
                    ৳{regularPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div>
                {isOutOfStock ? (
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" /> In Stock
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product, 1)}
                disabled={isOutOfStock}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 text-white shadow-xs hover:shadow-md hover:shadow-blue-500/25"
                aria-label={`Add ${product.name} to Cart`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsQuickViewOpen(true)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                title="Quick View"
                aria-label="Quick View"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
