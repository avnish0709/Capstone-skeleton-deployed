import { NextRequest } from 'next/server';
import { cacheLife, cacheTag } from 'next/cache';

async function fetchCachedMovies(query: string) {
  'use cache';
  cacheLife('hours');
  cacheTag('movies-api');

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    return [];
  }

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`);
    if (!res.ok) return [];

    const data = await res.json();
    return data.Search || [];
  } catch (error) {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('s') || searchParams.get('query') || 'Marvel';

  const movies = await fetchCachedMovies(query);

  return Response.json(
    {
      query,
      count: movies.length,
      results: movies,
    },
    {
      status: 200,
    }
  );
}
