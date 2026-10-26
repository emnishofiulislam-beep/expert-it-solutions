import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  Printer,
  ChevronDown,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Orders() {
  const { orders, updateOrderStatus, deleteOrder } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Status Counts
  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.orderStatus === 'Pending').length,
      processing: orders.filter((o) => o.orderStatus === 'Processing').length,
      shipped: orders.filter((o) => o.orderStatus === 'Shipped').length,
      delivered: orders.filter((o) => o.orderStatus === 'Delivered').length,
      cancelled: orders.filter((o) => o.orderStatus === 'Cancelled').length,
    };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        order._id.toLowerCase().includes(query) ||
        order.deliveryAddress?.fullName?.toLowerCase().includes(query) ||
        order.deliveryAddress?.phone?.includes(query) ||
        order.deliveryAddress?.city?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'all' ||
        order.orderStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

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

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Orders & Shipments Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review customer orders, update tracking statuses, and process invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Total Orders:</span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            {orders.length}
          </span>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: 'all', label: 'All Orders', count: counts.all },
          { key: 'pending', label: 'Pending', count: counts.pending },
          { key: 'processing', label: 'Processing', count: counts.processing },
          { key: 'shipped', label: 'Shipped', count: counts.shipped },
          { key: 'delivered', label: 'Delivered', count: counts.delivered },
          { key: 'cancelled', label: 'Cancelled', count: counts.cancelled },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatusFilter(tab.key)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              statusFilter === tab.key
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === tab.key
                  ? 'bg-blue-800 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, customer, phone, city..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>

        <div className="text-xs text-slate-400 self-end sm:self-auto">
          Showing <strong className="text-white">{filteredOrders.length}</strong> matching orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 font-semibold">Order ID</th>
                <th className="py-3.5 px-3 font-semibold">Date</th>
                <th className="py-3.5 px-3 font-semibold">Customer</th>
                <th className="py-3.5 px-3 font-semibold">Items</th>
                <th className="py-3.5 px-3 font-semibold">Total</th>
                <th className="py-3.5 px-3 font-semibold">Payment</th>
                <th className="py-3.5 px-3 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                      {/* ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-400">
                        {order._id}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                        {formattedDate}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-white">
                          {order.deliveryAddress?.fullName || 'Customer'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {order.deliveryAddress?.phone || 'N/A'}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-3 text-slate-300">
                        {order.items?.length || 1} item{order.items?.length > 1 ? 's' : ''}
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-3 font-bold text-white whitespace-nowrap">
                        ৳{Number(order.total).toLocaleString()}
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-3">
                        <div className="text-slate-300 font-medium">
                          {order.paymentMethod || 'COD'}
                        </div>
                        <span
                          className={`text-[10px] font-bold ${
                            order.paymentStatus === 'Paid'
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {order.paymentStatus || 'Pending'}
                        </span>
                      </td>

                      {/* Order Status selector */}
                      <td className="py-3.5 px-3">
                        <div className="relative inline-block">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="text-xs font-semibold py-1 pl-2.5 pr-7 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 appearance-none cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedOrderDetails(order)}
                            className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(order._id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete Order"
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
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No orders found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold">
                  EXP
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Order {selectedOrderDetails._id}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Placed on{' '}
                    {new Date(selectedOrderDetails.createdAt).toLocaleString('en-GB')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintInvoice}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
                  title="Print Invoice"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOrderDetails(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Customer & Contact
                </span>
                <p className="text-xs font-bold text-white">
                  {selectedOrderDetails.deliveryAddress?.fullName}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>{selectedOrderDetails.deliveryAddress?.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Shipping Destination
                </span>
                <div className="flex items-start gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {selectedOrderDetails.deliveryAddress?.address},{' '}
                    {selectedOrderDetails.deliveryAddress?.city} -{' '}
                    {selectedOrderDetails.deliveryAddress?.postalCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Ordered Items
              </h4>

              <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                {selectedOrderDetails.items?.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product?.image || '/placeholder.jpg'}
                        alt={item.product?.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-800 border border-slate-700"
                      />
                      <div>
                        <p className="text-xs font-bold text-white line-clamp-1">
                          {item.product?.name}
                        </p>
                        <span className="text-[11px] text-slate-400">
                          ৳{Number(item.price).toLocaleString()} &times; {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">
                      ৳{(Number(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>৳{Number(selectedOrderDetails.subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping Delivery Fee</span>
                <span>৳{Number(selectedOrderDetails.shippingFee).toLocaleString()}</span>
              </div>
              {selectedOrderDetails.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied</span>
                  <span>-৳{Number(selectedOrderDetails.discount).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Payable</span>
                <span className="text-blue-400">
                  ৳{Number(selectedOrderDetails.total).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Status change directly in modal */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                {getStatusBadge(selectedOrderDetails.orderStatus)}
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Order Record?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Are you sure you want to delete order {deleteConfirmId}? This action cannot be reversed.
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
                  deleteOrder(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md shadow-rose-600/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
