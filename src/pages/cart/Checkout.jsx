import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Breadcrumb from '../../components/common/Breadcrumb.jsx';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, shippingFee, discountAmount, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { error, success } = useToast();

  // If cart is empty, redirect to cart
  if (cartItems.length === 0) {
    navigate('/cart');
  }

  // Form states prefilled from authenticated user if available
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Dhaka',
    area: '',
    postalCode: user?.postalCode || '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery'); // 'Cash on Delivery' or 'Online Payment'
  const [onlineProvider, setOnlineProvider] = useState('bKash'); // 'bKash', 'Nagad', 'Card'
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      error('Please fill in your name, contact phone number, and delivery address.');
      return;
    }

    if (!agreeTerms) {
      error('Please agree to our terms and conditions.');
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      const orderPayload = {
        items: cartItems.map((i) => ({
          product: {
            _id: i.product._id,
            name: i.product.name,
            price: i.product.discountPrice || i.product.price,
            image: i.product.images?.[0] || '/placeholder.jpg',
            category: i.product.category
          },
          quantity: i.quantity,
          price: i.product.discountPrice || i.product.price
        })),
        subtotal,
        shippingFee,
        discount: discountAmount,
        total,
        paymentMethod: paymentMethod === 'Online Payment' ? `${onlineProvider} Online` : 'Cash on Delivery',
        deliveryAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          area: formData.area,
          postalCode: formData.postalCode,
          notes: formData.notes
        }
      };

      const createdOrder = addOrder(orderPayload);
      clearCart();
      setIsPlacingOrder(false);
      success('Order placed successfully! Preparing your shipment.');
      navigate('/order-success', { state: { order: createdOrder } });
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Cart', to: '/cart' },
          { label: 'Checkout' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Checkout & Order Confirmation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete your shipping details to receive your order anywhere in Bangladesh.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer & Delivery Information (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Customer Information */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">
                1
              </span>
              <span>Customer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Shofiul Islam"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number (Required for Courier) *</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+880 17XXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Information */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">
                2
              </span>
              <span>Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Street Address / House / Road *</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House 42, Road 11, Block D"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City / District *</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Dhaka, Chattogram, Sylhet"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Area / Thana *</label>
                <input
                  type="text"
                  required
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g. Uttara, Mirpur, Dhanmondi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Postal / Zip Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="e.g. 1230"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Special Delivery Note</label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Call before delivery"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">
                3
              </span>
              <span>Select Payment Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  className="mt-1 text-blue-600"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pay with cash directly to the delivery rider after inspecting your parcel.
                  </p>
                </div>
              </label>

              {/* Online Payment */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'Online Payment'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online Payment"
                  checked={paymentMethod === 'Online Payment'}
                  onChange={() => setPaymentMethod('Online Payment')}
                  className="mt-1 text-blue-600"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>bKash / Nagad / Cards</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Instant secure payment gateway integration ready for backend connect.
                  </p>
                </div>
              </label>
            </div>

            {/* Sub-options for Online Payment */}
            {paymentMethod === 'Online Payment' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Select Online Gateway:</span>
                <div className="flex flex-wrap gap-3">
                  {['bKash', 'Nagad', 'Rocket', 'Debit/Credit Card'].map((provider) => (
                    <button
                      type="button"
                      key={provider}
                      onClick={() => setOnlineProvider(provider)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        onlineProvider === provider
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  * Live payment gateway is configured to connect with the MERN Express backend seamlessly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order (4 cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Items ({cartItems.length})
            </h3>

            {/* Product Quick List */}
            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 pr-1 text-xs space-y-2">
              {cartItems.map((item) => (
                <div key={item.product._id} className="pt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={item.product.images?.[0] || '/placeholder.jpg'}
                      alt={item.product.name}
                      className="w-10 h-10 object-contain rounded-md bg-slate-50 p-1 border border-slate-200 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 shrink-0">
                    ৳{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Charge</span>
                <span className="font-bold text-slate-800">৳{shippingFee}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Total Amount</span>
                <span className="text-xl text-blue-600">৳{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5"
                />
                <span>
                  I agree to the EXPERT IT SOLUTIONS purchasing terms, return policy, and warranty conditions.
                </span>
              </label>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isPlacingOrder ? 'Processing Order...' : 'Place Order Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Courier Delivery Schedule:</span>
            </div>
            <p>• Inside Dhaka: Delivered within 24 to 48 hours.</p>
            <p>• Outside Dhaka: Delivered via Steadfast/Sundarban within 48 to 72 hours.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
