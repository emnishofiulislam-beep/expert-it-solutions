import React from 'react';
import logoOriginal from '../../assets/images/Logo expert-01.jpg';

export default function BrandLogo({
  className = 'h-10 sm:h-12 w-auto',
  variant = 'default', // 'default' | 'footer' | 'raw'
  alt = 'EXPERT IT SOLUTIONS'
}) {
  // If used in dark footer, display inside a clean white card for maximum brand contrast
  if (variant === 'footer') {
    return (
      <div className="inline-flex items-center bg-white px-3.5 py-1.5 rounded-xl shadow-md border border-slate-700/50 hover:border-slate-400 transition-all">
        <img
          src="/images/logo.png"
          onError={(e) => {
            e.currentTarget.src = logoOriginal;
          }}
          alt={alt}
          referrerPolicy="no-referrer"
          className="h-9 sm:h-10 w-auto object-contain"
        />
      </div>
    );
  }

  // Default navbar and general rendering
  return (
    <div className="flex items-center shrink-0">
      <img
        src="/images/logo.png"
        onError={(e) => {
          e.currentTarget.src = logoOriginal;
        }}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`${className} object-contain drop-shadow-2xs`}
      />
    </div>
  );
}
