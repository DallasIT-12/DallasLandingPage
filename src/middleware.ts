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

  // Admin Authentication
  if (pathname.startsWith('/admin')) {
    // Allow public access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin session
    const adminSession = request.cookies.get('admin_session')?.value;

    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Maintenance Mode Check
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const isMaintenancePath = pathname.match(/\/(id|en|zh)\/maintenance/);
  const isAssetPath = pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|webm|mp4|pdf)$/) || pathname.startsWith('/_next');

  if (isMaintenanceMode && !isMaintenancePath && !isAssetPath && !pathname.startsWith('/api') && !pathname.startsWith('/admin')) {
    const locale = pathname.split('/')[1] || 'id';
    const targetLocale = ['en', 'id', 'zh'].includes(locale) ? locale : 'id';
    return NextResponse.redirect(new URL(`/${targetLocale}/maintenance`, request.url));
  }

  // Skip intl middleware for the select-language page and admin pages
  if (pathname === '/select-language' || pathname.startsWith('/select-language/') || pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Check for the NEXT_LOCALE cookie
  const hasLocaleCookie = request.cookies.has('NEXT_LOCALE');
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const isValidLocale = hasLocaleCookie && localeCookie && ['en', 'id', 'zh'].includes(localeCookie);

  // If the user is at the root path '/'
  if (pathname === '/') {
    if (isValidLocale) {
      // If we have a valid cookie, redirect to that locale
      const response = NextResponse.redirect(new URL(`/${localeCookie}`, request.url));
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      return response;
    } else {
      // If no cookie, default to 'id'
      const response = NextResponse.redirect(new URL('/id', request.url));
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      return response;
    }
  }

  // First-time visitor check removed - we now default to /id at root, and let next-intl handle other paths or direct access.
  // If a user accesses a non-locale path that isn't root, next-intl middleware usually handles it or we can add specific logic if needed.
  // But for now, ensuring root goes to /id covers the main SEO and UX concern.


  // Delegate to next-intl middleware for other paths
  return intlMiddleware(request);
}

export const config = {
  // Match root, locale-prefixed paths, and paths without locale (redirect to add locale)
  matcher: [
    '/',
    '/(id|en|zh)/:path*',
    '/(paperlisens|about|products|produk|articles|maintenance|tools)(/.*)?',
    '/select-language',
    '/admin(/.*)?'
  ]
};