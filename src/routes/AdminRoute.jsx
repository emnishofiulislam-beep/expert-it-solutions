import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ShieldAlert, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { isAuthenticated, user, isLoading, switchRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <span className="text-xs text-slate-400 font-mono">Verifying administrative credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is not admin
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-5 shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            Admin Access Required
          </h2>
          
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            You are signed in as <span className="text-white font-semibold">{user.fullName}</span> with the role of{' '}
            <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-mono uppercase font-bold border border-blue-500/20">
              {user.role}
            </span>. Access to the EXPERT IT SOLUTIONS Admin Panel is restricted to administrators.
          </p>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mb-6 text-left text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <KeyRound className="w-4 h-4" />
              <span>Developer & Demo Mode Notice:</span>
            </div>
            <p className="text-slate-400">
              You can instantly elevate this account to Admin role with one click below to test the Dashboard, Products, Users, and Orders.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => switchRole('admin')}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enable Admin Role & Enter Panel</span>
            </button>

            <Link
              to="/"
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Store Front</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
