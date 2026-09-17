'use client';

import { useState } from 'react';

interface FavouriteButtonProps {
  initialIsFavourite?: boolean;
  className?: string;
  large?: boolean;
}

export default function FavouriteButton({ 
  initialIsFavourite = false, 
  className = "",
  large = false
}: FavouriteButtonProps) {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);

  const toggleFavourite = (e: React.MouseEvent) => {
    // Prevent navigating if this button is inside a Link
    e.preventDefault();
    e.stopPropagation();
    setIsFavourite(!isFavourite);
  };

  if (large) {
    return (
      <button 
        onClick={toggleFavourite}
        className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${
          isFavourite 
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
        } ${className}`}
      >
        {isFavourite ? '★ Favourited' : '☆ Favourite'}
      </button>
    );
  }

  return (
    <button 
      onClick={toggleFavourite}
      className={`w-full py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
        isFavourite
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10'
          : 'border border-slate-300 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20'
      } ${className}`}
    >
      {isFavourite ? 'Favourited' : 'Favourite'}
    </button>
  );
}
