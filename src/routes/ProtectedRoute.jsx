import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { AlertTriangle, Mail } from 'lucide-react';

export default function ProtectedRoute({ children, requireVerified = false }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If page strictly requires verified email and user is unverified
  if (requireVerified && !user.isVerified) {
    return (
      <div className="max-w-2xl mx-auto my-16 px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center shadow-xs">
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-4">
            <Mail className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Please Verify Your Email Address</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            Your account ({user.email}) is registered, but requires email verification before accessing this secure section.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/resend-verification"
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Resend Verification Email
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
