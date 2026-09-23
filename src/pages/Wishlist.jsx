import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={[{ label: 'My Wishlist' }]} />
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="You have not saved any hardware products to your wishlist yet. Browse our catalog and click the heart icon to save products."
          actionText="Explore Products"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'My Wishlist' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Saved Products ({wishlistItems.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Keep track of equipment you want to purchase or inspect in our showroom.
          </p>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 self-start sm:self-auto flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product, idx) => {
          const finalPrice = product.discountPrice || product.price;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (idx % 4) * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="relative aspect-square bg-slate-50 rounded-xl p-3 flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300 ease-out"
                  />
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-rose-600 hover:bg-rose-50 shadow-xs transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  {product.brand}
                </span>

                <Link
                  to={`/product/${product._id}`}
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 line-clamp-2 leading-snug mb-2"
                >
                  {product.name}
                </Link>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-base font-black text-slate-900">
                    ৳{finalPrice.toLocaleString()}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ৳{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </motion.button>

                <Link
                  to={`/product/${product._id}`}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors text-center block"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
