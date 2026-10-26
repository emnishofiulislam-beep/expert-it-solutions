import React, { useState, useMemo } from 'react';
import {
  Users as UsersIcon,
  Search,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  AlertTriangle,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Users() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    toggleUserVerification,
    user: currentLoggedInUser
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    fullName: '',
    email: '',
    phone: '',
    role: 'customer',
    city: 'Dhaka',
    address: '',
    postalCode: '1200',
    isVerified: true
  };

  const [formData, setFormData] = useState(initialForm);

  // Metrics
  const metrics = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === 'admin').length,
      staff: users.filter((u) => u.role === 'staff').length,
      customers: users.filter((u) => u.role === 'customer').length,
      verified: users.filter((u) => u.isVerified).length,
    };
  }, [users]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        user.fullName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone?.includes(q);

      const matchesRole =
        roleFilter === 'all' || user.role.toLowerCase() === roleFilter.toLowerCase();

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'verified' && user.isVerified) ||
        (statusFilter === 'unverified' && !user.isVerified);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleOpenAddModal = () => {
    setFormData(initialForm);
    setEditingUser(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (targetUser) => {
    setEditingUser(targetUser);
    setFormData({
      fullName: targetUser.fullName,
      email: targetUser.email,
      phone: targetUser.phone || '',
      role: targetUser.role || 'customer',
      city: targetUser.city || 'Dhaka',
      address: targetUser.address || '',
      postalCode: targetUser.postalCode || '',
      isVerified: Boolean(targetUser.isVerified)
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    if (editingUser) {
      updateUser(editingUser.id, formData);
    } else {
      addUser(formData);
    }

    setIsAddModalOpen(false);
    setEditingUser(null);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </span>
        );
      case 'staff':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>Staff</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span>Customer</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            User Accounts & Roles
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage administrative staff, customer profiles, verification statuses, and role privileges.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/30 transition-all active:scale-98 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Account</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Users</span>
          <div className="text-2xl font-black text-white mt-1">{metrics.total}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-purple-400 font-semibold uppercase">Administrators</span>
          <div className="text-2xl font-black text-purple-400 mt-1">{metrics.admins}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-blue-400 font-semibold uppercase">Customers</span>
          <div className="text-2xl font-black text-blue-400 mt-1">{metrics.customers}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-emerald-400 font-semibold uppercase">Verified</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{metrics.verified}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user by name, email, phone..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins Only</option>
            <option value="staff">Staff Only</option>
            <option value="customer">Customers Only</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Verification</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Unverified Only</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 self-end sm:self-auto">
          Showing <strong className="text-white">{filteredUsers.length}</strong> accounts
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 font-semibold">User</th>
                <th className="py-3.5 px-3 font-semibold">Contact Info</th>
                <th className="py-3.5 px-3 font-semibold">Role</th>
                <th className="py-3.5 px-3 font-semibold">Verification</th>
                <th className="py-3.5 px-3 font-semibold">Location</th>
                <th className="py-3.5 px-3 font-semibold text-center">Orders</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => {
                  const isCurrent = currentLoggedInUser && currentLoggedInUser.id === u.id;

                  return (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* User Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar || '/placeholder.jpg'}
                            alt={u.fullName}
                            className="w-9 h-9 rounded-full object-cover border border-slate-700 bg-slate-800 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white truncate">{u.fullName}</span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 truncate block">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-3">
                        <span className="text-slate-300 font-mono text-[11px]">
                          {u.phone || 'N/A'}
                        </span>
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-3">{getRoleBadge(u.role)}</td>

                      {/* Verification */}
                      <td className="py-3.5 px-3">
                        <button
                          type="button"
                          onClick={() => toggleUserVerification(u.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer ${u.isVerified
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                            }`}
                          title="Click to toggle verification status"
                        >
                          {u.isVerified ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Unverified</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-3 text-slate-300">
                        {u.city || 'Dhaka'}
                      </td>

                      {/* Orders */}
                      <td className="py-3.5 px-3 text-center font-bold text-white">
                        {u.ordersCount || 0}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(u)}
                            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {!isCurrent && (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(u.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No accounts found matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingUser ? 'Edit User Profile' : 'Add New User'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1711-000000"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    User Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                  >
                    <option value="customer">Customer</option>
                    <option value="staff">Staff / Support</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    City / Division
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Dhaka"
                    className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House 42, Road 11, Uttara"
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="userVerifiedToggle"
                  checked={formData.isVerified}
                  onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-950 border-slate-700 cursor-pointer"
                />
                <label htmlFor="userVerifiedToggle" className="text-xs font-medium text-slate-300 cursor-pointer">
                  Account Email Verified
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md shadow-blue-600/30 transition-all active:scale-98"
                >
                  {editingUser ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete User Account?</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Are you sure you want to delete this account? They will lose access to their profile and order history.
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
                  deleteUser(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md shadow-rose-600/30"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
