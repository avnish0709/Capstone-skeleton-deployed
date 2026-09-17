import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Create a response object forwarding the request
  const response = NextResponse.next();

  // Inject custom proxy tracking headers
  response.headers.set('x-movie-stash-proxy', 'v16.3');
  response.headers.set('x-request-timestamp', new Date().toISOString());

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
