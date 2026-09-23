import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse flex flex-col justify-between">
      <div>
        <div className="w-full aspect-square bg-slate-200 rounded-xl mb-3.5"></div>
        <div className="h-3 w-1/3 bg-slate-200 rounded-sm mb-2"></div>
        <div className="h-4 w-5/6 bg-slate-200 rounded-sm mb-2.5"></div>
        <div className="h-3 w-1/2 bg-slate-200 rounded-sm mb-4"></div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="h-5 w-20 bg-slate-200 rounded-sm"></div>
        <div className="h-8 w-24 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export function ServiceSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
      <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4"></div>
      <div className="h-5 w-2/3 bg-slate-200 rounded-sm mb-3"></div>
      <div className="h-3 w-full bg-slate-200 rounded-sm mb-2"></div>
      <div className="h-3 w-4/5 bg-slate-200 rounded-sm mb-4"></div>
      <div className="h-4 w-28 bg-slate-200 rounded-sm"></div>
    </div>
  );
}
