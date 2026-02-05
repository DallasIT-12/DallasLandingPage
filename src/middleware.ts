import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'id', 'zh'],
 
  // Used when no locale matches
  defaultLocale: 'id',
  
  // Disable automatic locale detection
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for the NEXT_LOCALE cookie
  const hasLocaleCookie = request.cookies.has('NEXT_LOCALE');
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

  // If the user is at the root path '/'
  if (pathname === '/') {
    if (hasLocaleCookie && localeCookie && ['en', 'id', 'zh'].includes(localeCookie)) {
      // If we have a valid cookie, redirect to that locale
      const response = NextResponse.redirect(new URL(`/${localeCookie}`, request.url));
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return response;
    } else {
      // If no cookie (or invalid), redirect to the selection page
      const response = NextResponse.redirect(new URL('/select-language', request.url));
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return response;
    }
  }

  // Delegate to next-intl middleware for other paths
  return intlMiddleware(request);
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(id|en|zh)/:path*']
};