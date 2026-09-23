import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import Breadcrumb from '../../components/common/Breadcrumb.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingArea,
    setShippingArea,
    shippingFee,
    promoCode,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    total
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven’t added any IT hardware, monitors, or accessories to your cart yet."
          actionText="Start Shopping"
          actionLink="/shop"
        />
      </div>
    );
  }

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart ({cartItems.length} items)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your selected hardware components and calculate delivery.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 self-start sm:self-auto flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden sm:grid grid-cols-12 p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>

          <div className="divide-y divide-slate-100 p-4 sm:p-0">
            {cartItems.map((item) => {
              const unitPrice = item.product.discountPrice || item.product.price;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.product._id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center sm:p-5 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Product Details */}
                  <div className="sm:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.images?.[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                        {item.product.brand}
                      </span>
                      <Link
                        to={`/product/${item.product._id}`}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 line-clamp-2 leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-[11px] text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold pt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-left sm:text-center">
                    <span className="sm:hidden text-xs text-slate-400 font-semibold mr-2">Unit Price:</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">
                      ৳{unitPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center">
                    <span className="sm:hidden text-xs text-slate-400 font-semibold mr-2">Qty:</span>
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-slate-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="sm:col-span-2 text-left sm:text-right">
                    <span className="sm:hidden text-xs text-slate-400 font-semibold mr-2">Subtotal:</span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      ৳{itemTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/shop"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Box (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            {/* Subtotal */}
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-slate-500">Cart Subtotal</span>
              <span className="font-bold text-slate-900">৳{subtotal.toLocaleString()}</span>
            </div>

            {/* Shipping Area Selector */}
            <div className="space-y-2 text-xs">
              <span className="text-slate-600 font-bold block">Delivery Destination:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShippingArea('inside_dhaka')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    shippingArea === 'inside_dhaka'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Inside Dhaka (৳60)
                </button>
                <button
                  type="button"
                  onClick={() => setShippingArea('outside_dhaka')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    shippingArea === 'outside_dhaka'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Outside Dhaka (৳120)
                </button>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-2 pt-1">
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Coupon: EXPERT10"
                    className="w-full pl-8 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 uppercase font-mono"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoCode && (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2 rounded-lg text-xs font-semibold">
                  <span>Coupon &quot;{promoCode}&quot; (-৳{discountAmount.toLocaleString()})</span>
                  <button onClick={removePromoCode} className="text-emerald-950 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Final Calculations */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Shipping Fee</span>
                <span className="font-bold text-slate-800">৳{shippingFee}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Estimated Total</span>
                <span className="text-xl text-blue-600">৳{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/shop"
                className="block text-center w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure Showroom Purchase</span>
            </div>
            <p>Every product includes official brand warranty card and fast delivery guarantee across Bangladesh.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
