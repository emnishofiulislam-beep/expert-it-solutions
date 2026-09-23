import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ rating = 0, reviewCount, size = 'sm' }) {
  const starSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((index) => {
          const isFilled = rating >= index;
          const isHalf = !isFilled && rating >= index - 0.5;

          return (
            <Star
              key={index}
              className={`${starSize} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-slate-200 text-slate-300'
              }`}
            />
          );
        })}
      </div>
      {typeof rating === 'number' && (
        <span className="text-xs font-semibold text-slate-700 ml-0.5">{rating.toFixed(1)}</span>
      )}
      {typeof reviewCount === 'number' && (
        <span className="text-xs text-slate-400">({reviewCount})</span>
      )}
    </div>
  );
}
