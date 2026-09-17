import Link from 'next/link';
import Image from 'next/image';
import FavouriteButton from './components/FavouriteButton';
import Badge from './components/Badge';
import { forceRefreshMovies } from './lib/actions';
import { cacheLife, cacheTag } from 'next/cache';

async function getMovies(query: string) {
  'use cache';
  cacheLife('hours');
  cacheTag('movies');

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    console.error('OMDB_API_KEY is missing from environment variables');
    return [];
  }
  
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  return data.Search || [];
}

export default async function Home() {
  // Server-side Data Fetching
  const movies = await getMovies('Marvel');

  return (
    <div className="flex flex-col gap-12 w-full max-w-7xl mx-auto py-8 px-4">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" pulse={true}>
              Featured Collection
            </Badge>
            <Badge variant="secondary">
              Next.js 15
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Discover Movies
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mb-4">
            Explore the latest and greatest films. Curate your personal collection of cinematic masterpieces.
          </p>
          <form action={forceRefreshMovies}>
            <button 
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold transition-colors w-fit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Refresh Cache
            </button>
          </form>
        </div>
        
        {/* Mock Search Bar for visual completeness */}
        <div className="relative w-full md:w-auto mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full md:w-72 px-4 py-3 pl-11 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent transition-all outline-none shadow-sm"
          />
          <svg className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </section>

      {/* Main Grid Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">Trending</span> Now
          </h2>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            No movies found. Check your API key.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie: any) => (
              <article key={movie.imdbID} className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <Link href={`/movie/${movie.imdbID}`} className="flex flex-col flex-grow">
                  {/* Poster Wrapper */}
                  <div className="aspect-[2/3] w-full bg-slate-100 dark:bg-slate-850 relative overflow-hidden">
                    {movie.Poster && movie.Poster !== 'N/A' ? (
                      <Image
                        src={movie.Poster}
                        alt={`${movie.Title} Poster`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                        <span className="text-4xl">🎬</span>
                        <span className="text-sm font-medium">No Image</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {movie.Type}
                    </span>
                  </div>

                  {/* Movie info area */}
                  <div className="p-5 flex flex-col gap-4 flex-grow">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {movie.Title}
                      </h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {movie.Year}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-5 pb-5 mt-auto">
                  <FavouriteButton initialIsFavourite={false} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
