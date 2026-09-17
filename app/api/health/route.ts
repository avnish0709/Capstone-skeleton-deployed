import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  return Response.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Movie Stash API',
      version: '1.0.0',
      client: userAgent,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
