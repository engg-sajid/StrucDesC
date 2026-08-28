import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

// Only protect history or dashboard pages now
const protectedRoutes = ['/history']; 

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute) {
    const cookie = req.cookies.get('session')?.value;
    
    try {
      if (!cookie) throw new Error('No cookie');
      await decrypt(cookie);
    } catch (error) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};