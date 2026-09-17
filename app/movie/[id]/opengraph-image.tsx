import { ImageResponse } from 'next/og';
import { getMovieDetails } from '@/app/lib/data';

export const alt = 'Movie Details Card';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  const title = movie?.Title || 'Movie Stash';
  const year = movie?.Year || '';
  const genre = movie?.Genre || 'Cinema';
  const rating = movie?.imdbRating ? `⭐ ${movie.imdbRating}` : '';
  const plot = movie?.Plot ? (movie.Plot.length > 140 ? `${movie.Plot.slice(0, 140)}...` : movie.Plot) : '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%)',
          backgroundSize: '50px 50px',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#f8fafc',
        }}
      >
        {/* Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              backgroundColor: '#6366f1',
              borderRadius: '12px',
              padding: '8px 16px',
              fontSize: '24px',
              fontWeight: 800,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🎬</span>
            <span>MOVIE STASH</span>
          </div>
          {year && (
            <div
              style={{
                backgroundColor: '#334155',
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '20px',
                fontWeight: 600,
                color: '#cbd5e1',
              }}
            >
              {year}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '1000px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '24px',
              color: '#94a3b8',
              fontWeight: 600,
            }}
          >
            {genre && <span>{genre}</span>}
            {rating && <span>|</span>}
            {rating && <span style={{ color: '#fbbf24' }}>{rating}</span>}
          </div>

          {plot && (
            <div
              style={{
                fontSize: '24px',
                color: '#cbd5e1',
                lineHeight: 1.4,
                marginTop: '12px',
                fontStyle: 'italic',
              }}
            >
              "{plot}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #334155',
            paddingTop: '24px',
            fontSize: '20px',
            color: '#64748b',
          }}
        >
          <div>Discover, save & collect your favorite movies</div>
          <div style={{ color: '#818cf8', fontWeight: 700 }}>moviestash.app</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
