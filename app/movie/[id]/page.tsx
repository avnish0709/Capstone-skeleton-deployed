import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FavouriteButton from '../../components/FavouriteButton';
import { notFound } from 'next/navigation';
import { getMovieDetails } from '@/app/lib/data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }

  return {
    title: movie.Title,
    description: movie.Plot || `Watch details and info about ${movie.Title}`,
    openGraph: {
      title: `${movie.Title} (${movie.Year})`,
      description: movie.Plot || `Watch details and info about ${movie.Title}`,
      type: 'video.movie',
    },
  };
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-8 px-4">
      <div className="mb-2">
        <Link 
          href="/"
          className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          &larr; Back to Movies
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row">
        {/* Real Poster */}
        <div className="w-full md:w-5/12 aspect-[2/3] md:aspect-auto bg-slate-100 dark:bg-slate-850 relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <Image
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400 p-8">
              <span className="text-6xl mb-4">🎬</span>
              <span className="text-sm font-bold tracking-widest uppercase">No Image Available</span>
            </div>
          )}
        </div>

        {/* Real Movie Details */}
        <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
          <div className="uppercase tracking-widest text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-3">
            {movie.Type}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            {movie.Title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
            <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              {movie.Year}
            </span>
            <span>&bull;</span>
            <span>{movie.Genre}</span>
            <span>&bull;</span>
            <span>{movie.Runtime}</span>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed font-medium">
            <p className="italic text-slate-500 dark:text-slate-400 border-l-4 border-indigo-500 pl-4 py-1 mb-4">
              "{movie.Plot}"
            </p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
          </div>
          
          <div className="mt-8 flex gap-4">
            <FavouriteButton initialIsFavourite={false} large={true} className="w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
