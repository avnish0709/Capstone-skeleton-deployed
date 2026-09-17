'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // In a real application, you might log the error to Sentry or another service here
    console.error('Route Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-lg shadow-md w-full">
        <span className="text-6xl mb-4 block">⚠️</span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Oops, something went wrong!
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          We encountered an unexpected error while trying to load this content. 
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => retry()}
            className="inline-flex justify-center items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-full transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex justify-center items-center px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-full transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
