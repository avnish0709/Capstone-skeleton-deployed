import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID: string;
  Type?: string;
  Response: string;
}

export const getMovieDetails = cache(async (id: string): Promise<MovieDetails | null> => {
  'use cache';
  cacheLife('hours');
  cacheTag('movie-details');

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
    if (!res.ok) return null;

    const data = await res.json();
    return data.Response === 'True' ? data : null;
  } catch (error) {
    return null;
  }
});
