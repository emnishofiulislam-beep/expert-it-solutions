import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MailCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Breadcrumb from '../../components/common/Breadcrumb.jsx';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { user, updateProfile } = useAuth();
  const [verified, setVerified] = useState(false);

  const handleSimulateVerify = () => {
    if (user) {
      updateProfile({ isVerified: true });
    }
    setVerified(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <Breadcrumb items={[{ label: 'Verify Email' }]} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl text-center space-y-6">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
          <MailCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {verified ? 'Email Verified Successfully!' : 'Verify Your Email Address'}
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {verified
              ? 'Your email has been confirmed. Your account is now fully activated for warranty requests and high-volume orders.'
              : 'Click the button below to simulate confirming the verification link sent to your registered inbox.'}
          </p>
        </div>

        {verified ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center justify-center gap-2 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Status: Verified Customer</span>
            </div>

            <Link
              to="/account"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Go to My Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleSimulateVerify}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm Email Verification Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/resend-verification"
              className="block text-xs font-semibold text-slate-500 hover:text-blue-600"
            >
              Didn&apos;t get the email? Resend verification link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
