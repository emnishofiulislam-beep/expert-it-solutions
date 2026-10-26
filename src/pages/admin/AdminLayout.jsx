import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Store,
  Menu,
  X,
  Bell,
  Search,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Sparkles,
  ExternalLink,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProducts } from '../../context/ProductContext.jsx';

export default function AdminLayout() {
  const { user, logout, switchRole, orders } = useAuth();
  const { products } = useProducts();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending').length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  const navItems = [
    {
      to: '/admin',
      end: true,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/admin/products',
      end: false,
      label: 'Products',
      icon: Package,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      to: '/admin/orders',
      end: false,
      label: 'Orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      to: '/admin/users',
      end: false,
      label: 'Users',
      icon: Users,
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 z-30 sticky top-0">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xs shadow-xs">
              EX
            </div>
            <span className="font-bold text-white text-sm tracking-tight">Admin Console</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5"
            title="View storefront"
          >
            <Store className="w-3.5 h-3.5 text-blue-400" />
            <span>Store</span>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-500/20">
                EX
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-white tracking-tight leading-none">
                  EXPERT IT
                </h1>
                <span className="text-[10px] text-blue-400 font-medium tracking-wide uppercase">
                  Management Panel
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Core Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Quick stats in sidebar */}
          <div className="px-4 py-3 mx-3 my-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Total Products</span>
              <span className="font-bold text-white">{products.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Total Orders</span>
              <span className="font-bold text-white">{orders.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">System Status</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Operational
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer with user & quick shortcuts */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 space-y-2">
          {/* View store link */}
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-blue-400" />
              <span>Back to Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {/* Current Admin user card */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatar || '/placeholder.jpg'}
                alt={user?.fullName || 'Admin'}
                className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
              />
              <div className="truncate text-left leading-tight">
                <p className="text-xs font-bold text-white truncate">
                  {user?.fullName || 'Super Admin'}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-blue-400 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Admin
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header bar */}
        <header className="hidden md:flex items-center justify-between px-6 lg:px-8 py-3.5 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Administrator Portal</span>
            </div>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-medium text-slate-400 capitalize">
              {location.pathname.replace('/admin', '').replace('/', '') || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick demo role switcher */}
            <button
              type="button"
              onClick={() => switchRole('customer')}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Toggle to customer role for test"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview Customer View</span>
            </button>

            {/* Visit Store Button */}
            <Link
              to="/"
              className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-sm shadow-blue-500/20 flex items-center gap-1.5 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {(pendingOrdersCount > 0 || lowStockCount > 0) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                )}
                {(pendingOrdersCount > 0 || lowStockCount > 0) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Alerts & Notifications</span>
                    <span className="text-[10px] text-slate-400">Live</span>
                  </div>
                  <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
                    {pendingOrdersCount > 0 && (
                      <Link
                        to="/admin/orders"
                        onClick={() => setShowNotifications(false)}
                        className="block px-4 py-3 hover:bg-slate-800/50 transition-colors"
                      >
                        <p className="text-xs font-bold text-amber-400">
                          {pendingOrdersCount} New Orders Pending
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Requires processing and confirmation.
                        </p>
                      </Link>
                    )}
                    {lowStockCount > 0 && (
                      <Link
                        to="/admin/products"
                        onClick={() => setShowNotifications(false)}
                        className="block px-4 py-3 hover:bg-slate-800/50 transition-colors"
                      >
                        <p className="text-xs font-bold text-rose-400">
                          {lowStockCount} Products Low on Stock
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Stock is less than 5 units.
                        </p>
                      </Link>
                    )}
                    {pendingOrdersCount === 0 && lowStockCount === 0 && (
                      <div className="px-4 py-6 text-center text-xs text-slate-500">
                        All systems clear! No pending alerts.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
