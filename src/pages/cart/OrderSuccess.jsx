import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Printer,
  Calendar,
  MapPin,
  CreditCard,
  ShoppingBag
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center p-8 sm:p-12 space-y-8">
        {/* Success Icon */}
        <div className="space-y-3">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Thank you for choosing EXPERT IT SOLUTIONS. Your invoice has been generated and our showroom packing team is preparing your hardware.
          </p>
        </div>

        {/* Order Details Card */}
        {order ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-left space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Order ID</span>
                <p className="font-mono font-black text-base text-blue-600">{order._id}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Status</span>
                <span className="block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {order.orderStatus}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Payment</span>
                <p className="text-xs font-bold text-slate-800">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Items Purchased */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Ordered Items:</span>
              <div className="divide-y divide-slate-200">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <img
                        src={item.product?.image || '/placeholder.jpg'}
                        alt={item.product?.name}
                        className="w-8 h-8 object-contain rounded-md bg-white p-0.5 border border-slate-200"
                      />
                      <span className="truncate font-medium text-slate-800">
                        {item.product?.name} (x{item.quantity})
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-600">Total Paid / Payable:</span>
              <span className="font-black text-lg text-slate-900">৳{order.total?.toLocaleString()}</span>
            </div>

            {/* Delivery address */}
            {order.deliveryAddress && (
              <div className="border-t border-slate-200 pt-3 text-xs text-slate-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Shipping to: <strong>{order.deliveryAddress.fullName}</strong>, {order.deliveryAddress.address}, {order.deliveryAddress.area}, {order.deliveryAddress.city} (Phone: {order.deliveryAddress.phone})
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-500">
            Order confirmed. Check your registered email or orders section for invoice tracking.
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/account/orders"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track in My Orders</span>
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
