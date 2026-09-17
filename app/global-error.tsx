'use client';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <span className="text-8xl mb-6">💥</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-red-600">
            Critical System Error
          </h2>
          <p className="text-lg text-slate-500 max-w-md mb-8">
            The application encountered an unrecoverable error at the root level.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => retry()}
              className="px-6 py-3 border border-transparent text-base font-semibold rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md"
            >
              Force Retry
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-slate-300 text-base font-semibold rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
              Reload Page
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 p-6 bg-slate-900 rounded-xl text-left max-w-3xl w-full overflow-auto">
              <h3 className="text-red-400 font-mono text-sm font-bold mb-2">Error Digest: {error.digest || 'N/A'}</h3>
              <pre className="text-slate-300 font-mono text-xs whitespace-pre-wrap">
                {error.message}
              </pre>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
