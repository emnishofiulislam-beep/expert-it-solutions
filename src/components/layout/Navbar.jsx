import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Server,
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  Package,
  Settings,
  ChevronDown,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import BrandLogo from '../common/BrandLogo.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold transition-colors rounded-md ${
      isActive
        ? 'text-blue-600 bg-blue-50/80 font-bold'
        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group py-1" aria-label="EXPERT IT SOLUTIONS">
            <BrandLogo className="h-10 sm:h-12 w-auto group-hover:scale-102 transition-transform duration-200" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/categories" className={navLinkClass}>
              Categories
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CCTV, monitor, router, cables..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>
          </div>

          {/* Right Action Icons & User Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="View Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="View Shopping Cart"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-all text-left"
                  aria-expanded={isUserDropdownOpen}
                >
                  <img
                    src={user.avatar || '/placeholder.jpg'}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-md object-cover border border-slate-300"
                  />
                  <div className="hidden xl:flex flex-col text-xs leading-tight">
                    <span className="font-semibold text-slate-900 truncate max-w-[100px]">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">Verified User</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/account/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Settings className="w-4 h-4" />
                      My Account
                    </Link>

                    <Link
                      to="/account/orders"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Heart className="w-4 h-4" />
                      Saved Wishlist
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all hover:shadow-blue-500/20"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, or categories..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Services
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Shop
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Categories
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Contact Us
            </NavLink>
          </nav>

          <div className="border-t border-slate-100 pt-3">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-2 py-1">
                  <img
                    src={user.avatar || '/placeholder.jpg'}
                    alt={user.fullName}
                    className="w-9 h-9 rounded-md object-cover border border-slate-300"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    to="/account/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/account/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-center px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    My Orders
                  </Link>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3 text-xs text-slate-500 space-y-1.5">
            <p className="font-semibold text-slate-700">Customer Support & Showrooms:</p>
            <p>Hotline: <a href="tel:+8801762596986" className="text-blue-600 font-medium">+8801762596986</a>, <a href="tel:+8809644217151" className="text-blue-600 font-medium">+8809644217151</a></p>
            <p>Email: <a href="mailto:reza@expertitsolutionsbd.com" className="text-blue-600 font-medium">reza@expertitsolutionsbd.com</a></p>
            <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-100">
              <p><strong className="text-slate-700">Registered:</strong> 16, Tower Hamlet, Level-07, Kemal Ataturk Avenue, Banani, Dhaka-1213</p>
              <p><strong className="text-slate-700">Corporate:</strong> Shop #307, Level #03, Sheltech Sierra Computer City, New Elephant Road, Dhaka 1205</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
