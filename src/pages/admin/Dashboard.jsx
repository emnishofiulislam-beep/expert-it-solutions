import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';

export default function Dashboard() {
  const { orders, users, updateOrderStatus } = useAuth();
  const { products } = useProducts();

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.total) || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending');
  const processingOrders = orders.filter((o) => o.orderStatus === 'Processing');
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered');
  const lowStockProducts = products.filter((p) => p.stock < 5);

  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivered</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Processing</span>
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Truck className="w-3.5 h-3.5" />
            <span>Shipped</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 p-6 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-950/20">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Executive Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            EXPERT IT Solutions Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Real-time telemetry on revenue, showroom inventory, customer orders, and registered accounts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/30 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>

          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            <span>All Orders</span>
          </Link>
        </div>
      </div>

      {/* 4 Major KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">
              ৳{totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% from store orders</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Customer Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{orders.length}</div>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
              <span className="text-amber-400 font-medium">{pendingOrders.length} Pending</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">{deliveredOrders.length} Done</span>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Product Catalog
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{products.length}</div>
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              {lowStockProducts.length > 0 ? (
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {lowStockProducts.length} low stock alert
                </span>
              ) : (
                <span className="text-emerald-400 font-medium">All stocks healthy</span>
              )}
            </div>
          </div>
        </div>

        {/* Registered Users */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Accounts
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{users.length}</div>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
              <span className="text-blue-400 font-medium">
                {users.filter((u) => u.role === 'admin').length} Admins
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium">
                {users.filter((u) => u.role === 'customer').length} Customers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Inventory Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Recent Customer Orders</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest customer purchases and current dispatch statuses.
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Items</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-blue-400">
                      {order._id}
                    </td>
                    <td className="py-3.5">
                      <div className="font-semibold text-white">
                        {order.deliveryAddress?.fullName || 'Customer'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {order.deliveryAddress?.city || 'Dhaka'}
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-300">
                      {order.items?.length || 1} item{order.items?.length > 1 ? 's' : ''}
                    </td>
                    <td className="py-3.5 font-bold text-white">
                      ৳{Number(order.total).toLocaleString()}
                    </td>
                    <td className="py-3.5">
                      {getStatusBadge(order.orderStatus)}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrderForStatus(order)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
                      >
                        Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts & Category Quick View */}
        <div className="space-y-6">
          {/* Low Stock Watch */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Stock Watchlist</h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {lowStockProducts.length} Low
              </span>
            </div>

            <div className="mt-3 divide-y divide-slate-800/60">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.slice(0, 4).map((p) => (
                  <div key={p._id} className="py-3 flex items-center justify-between gap-3">
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white truncate max-w-[180px]">
                        {p.name}
                      </p>
                      <span className="text-[10px] text-slate-400">{p.category}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-rose-400">
                        {p.stock} in stock
                      </span>
                      <p className="text-[10px] text-slate-500">৳{p.discountPrice || p.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  All inventory levels are above the minimum threshold.
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <Link
                to="/admin/products"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
              >
                <span>Manage Inventory in Products</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Service & Hardware Distribution */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Top Categories</h3>
              </div>
              <span className="text-[10px] text-slate-400">Active</span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>CCTV & Surveillance</span>
                  <span className="text-slate-400">38%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Monitors & Displays</span>
                  <span className="text-slate-400">26%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Networking & Routers</span>
                  <span className="text-slate-400">21%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '21%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>PC Components & Storage</span>
                  <span className="text-slate-400">15%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Status Modal */}
      {selectedOrderForStatus && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-white">
              Update Order Status
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Order <span className="text-blue-400 font-mono font-bold">{selectedOrderForStatus._id}</span>
            </p>

            <div className="mt-4 space-y-2">
              {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    updateOrderStatus(selectedOrderForStatus._id, status);
                    setSelectedOrderForStatus(null);
                  }}
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-xl border text-left flex items-center justify-between transition-colors ${
                    selectedOrderForStatus.orderStatus === status
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{status}</span>
                  {selectedOrderForStatus.orderStatus === status && (
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrderForStatus(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
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
