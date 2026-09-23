import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Share2,
  Star,
  Package,
  MessageSquareQuote
} from 'lucide-react';
import { PRODUCTS } from '../data/products.js';
import Rating from '../components/common/Rating.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success } = useToast();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications'); // 'specifications', 'description', 'reviews'

  // User review state
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState([
    {
      id: 1,
      author: 'Tanvir Hossain',
      date: '2 weeks ago',
      rating: 5,
      comment: 'Excellent quality product! Received in genuine sealed packaging. Delivered inside Dhaka within 24 hours.'
    },
    {
      id: 2,
      author: 'Rafiqul Islam',
      date: '1 month ago',
      rating: 5,
      comment: 'Installed in our office. Working non-stop with zero issues. Official warranty card was stamped properly.'
    }
  ]);

  // Find product by id or slug
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p._id === id || p.slug === id);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          title="Product Not Found"
          description="The product you are looking for does not exist in our showroom database or may have been discontinued."
          actionText="Back to Shop"
          actionLink="/shop"
        />
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isWishlisted = isInWishlist(product._id);
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p._id !== product._id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newRev = {
      id: Date.now(),
      author: reviewName,
      date: 'Just now',
      rating: reviewRating,
      comment: reviewComment
    };

    setLocalReviews((prev) => [newRev, ...prev]);
    setReviewName('');
    setReviewComment('');
    success('Thank you! Your product review has been submitted.');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success('Product link copied to clipboard!');
    }
  };

  const galleryImages = product.images?.length > 0 ? product.images : ['/placeholder.jpg'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <Breadcrumb
        items={[
          { label: 'Shop', to: '/shop' },
          { label: product.category, to: `/shop?category=${encodeURIComponent(product.category)}` },
          { label: product.name }
        ]}
      />

      {/* Main Product Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square bg-slate-50 rounded-2xl border border-slate-200 p-6 flex items-center justify-center overflow-hidden">
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}

              <img
                src={galleryImages[selectedImageIndex] || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail selector */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-18 h-18 rounded-xl border-2 p-2 bg-slate-50 flex items-center justify-center shrink-0 transition-colors ${
                      selectedImageIndex === idx
                        ? 'border-blue-600 bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">SKU: {product.sku}</span>
                </div>

                <button
                  onClick={handleShare}
                  className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                  title="Share this product"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs font-semibold text-slate-600">
                  {product.category}
                </span>
              </div>

              {/* Price Display */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  ৳{(product.discountPrice || product.price).toLocaleString()}
                </span>
                {product.discountPrice && (
                  <span className="text-base font-medium text-slate-400 line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm ml-auto">
                    Save ৳{(product.price - product.discountPrice).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock info */}
              <div className="flex items-center gap-3 text-xs">
                <span className="font-bold text-slate-600">Availability:</span>
                {isOutOfStock ? (
                  <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    Out of Stock
                  </span>
                ) : (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units in Showroom)
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector & Purchase Actions */}
              {!isOutOfStock && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2 text-slate-700 hover:bg-slate-100 font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-slate-900 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3.5 py-2 text-slate-700 hover:bg-slate-100 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3.5 rounded-xl border transition-colors ${
                        isWishlisted
                          ? 'border-rose-300 bg-rose-50 text-rose-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Express Courier in BD</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl">
                <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>7 Days Replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications / Description / Reviews */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 px-6 sm:px-8 bg-slate-50/70 overflow-x-auto">
          {[
            { id: 'specifications', label: 'Technical Specifications' },
            { id: 'description', label: 'Full Overview' },
            { id: 'reviews', label: `Customer Reviews (${localReviews.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-white -mb-px'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {/* Specifications Table */}
          {activeTab === 'specifications' && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-base font-bold text-slate-900">Technical Details</h3>
              {product.specifications ? (
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs sm:text-sm ${
                        idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                      }`}
                    >
                      <span className="font-semibold text-slate-600">{key}</span>
                      <span className="sm:col-span-2 font-medium text-slate-900 mt-1 sm:mt-0">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No specifications declared for this product.</p>
              )}
            </div>
          )}

          {/* Description */}
          {activeTab === 'description' && (
            <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-4">
              <p>{product.description}</p>
              <h4 className="text-base font-bold text-slate-900 pt-2">Why Buy from EXPERT IT SOLUTIONS?</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>100% Genuine, authentic products sourced directly from authorized national distributors.</li>
                <li>Comprehensive after-sales service and replacement support in our physical Dhaka showroom.</li>
                <li>Fast, safe shipping with insured transport packaging across all districts in Bangladesh.</li>
                <li>Experienced technicians available to assist with driver installations, firmware upgrades, and cabling.</li>
              </ul>
            </div>
          )}

          {/* Reviews & Form */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Existing Reviews */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Verified User Feedback</h3>
                <div className="space-y-3">
                  {localReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                            {rev.author.charAt(0)}
                          </div>
                          <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <Rating rating={rev.rating} />
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Form */}
              <div className="lg:col-span-5 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-blue-600" />
                  <span>Leave a Product Review</span>
                </h4>

                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Rating</label>
                    <div className="flex gap-1.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Asif Ahmed"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Feedback</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience regarding performance, warranty, or delivery..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Related IT Products in {product.category}</h3>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-xs font-bold text-blue-600 hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
