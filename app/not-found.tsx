import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-8xl mb-6">🍿</span>
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mb-8">
        We searched everywhere, but we couldn't find the movie or page you were looking for.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md"
      >
        Return to Home
      </Link>
    </div>
  );
}
