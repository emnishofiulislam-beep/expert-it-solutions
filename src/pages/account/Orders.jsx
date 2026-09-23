import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Eye,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Printer
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Breadcrumb from '../../components/common/Breadcrumb.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';

export default function Orders() {
  const { orders } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders =
    statusFilter === 'all'
      ? orders
      : orders.filter(
          (o) => o.orderStatus?.toLowerCase() === statusFilter.toLowerCase()
        );

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'My Account', to: '/account' }, { label: 'Order History' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Hardware & Component Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track shipment stages, download invoices, and inspect order details.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          {['all', 'processing', 'shipped', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-blue-300 transition-all space-y-4"
            >
              {/* Order Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Order Reference</span>
                    <span className="font-mono font-black text-xs sm:text-sm text-slate-900">{order._id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadgeClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-bold rounded-lg border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>

              {/* Order Body Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Placed Date</span>
                  <span className="font-medium text-slate-800">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Total Amount</span>
                  <span className="font-black text-sm text-slate-900">৳{order.total?.toLocaleString()}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Payment</span>
                  <span className="font-medium text-slate-800">{order.paymentMethod}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Items Ordered</span>
                  <span className="font-medium text-slate-800">
                    {order.items?.length || 0} hardware items
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/70 text-xs text-slate-700">
                    <img
                      src={item.product?.image || '/placeholder.jpg'}
                      alt={item.product?.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="font-medium truncate max-w-[150px]">{item.product?.name}</span>
                    <span className="font-bold text-slate-400">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShoppingBag}
          title="No Orders Found"
          description={
            statusFilter === 'all'
              ? 'You have not placed any orders yet. Explore our showroom and order genuine components today.'
              : `No orders found with status "${statusFilter}".`
          }
          actionText="Browse Showroom"
          actionLink="/shop"
        />
      )}

      {/* MODAL: VIEW ORDER INVOICE DETAILS */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Official Invoice</span>
                <h3 className="font-mono font-black text-lg text-slate-900">{selectedOrder._id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Delivery address info */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Delivery Details:</span>
              <p className="font-bold text-slate-900">{selectedOrder.deliveryAddress?.fullName} ({selectedOrder.deliveryAddress?.phone})</p>
              <p className="text-slate-600">{selectedOrder.deliveryAddress?.address}, {selectedOrder.deliveryAddress?.area}, {selectedOrder.deliveryAddress?.city}</p>
            </div>

            {/* Items Table */}
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2 grid grid-cols-12 font-bold text-slate-400 uppercase text-[10px]">
                <span className="col-span-8">Product Name</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="py-3 grid grid-cols-12 items-center">
                  <div className="col-span-8 flex items-center gap-2">
                    <img
                      src={item.product?.image || '/placeholder.jpg'}
                      alt=""
                      className="w-8 h-8 object-contain rounded border border-slate-200 p-0.5"
                    />
                    <span className="font-medium text-slate-900 truncate">{item.product?.name}</span>
                  </div>
                  <span className="col-span-2 text-center font-bold text-slate-700">{item.quantity}</span>
                  <span className="col-span-2 text-right font-black text-slate-900">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">৳{selectedOrder.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-900">৳{selectedOrder.shippingFee}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-৳{selectedOrder.discount?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                <span>Grand Total</span>
                <span className="text-blue-600">৳{selectedOrder.total?.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
