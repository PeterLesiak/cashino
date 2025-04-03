import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { decrypt } from '@/lib/session';
import { getUser } from '@/lib/dal';

const userRoutes = ['/profile', '/play'];
const adminRoutes = ['/dashboard'];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isUserRoute = userRoutes.some(route => path.includes(route));
  const isAdminRoute = adminRoutes.some(route => path.includes(route));

  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);

  const authenticated = session?.sessionId;

  if (isUserRoute && !authenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  if (isAdminRoute) {
    const user = await getUser();

    if (!user?.admin) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  }

  if (authenticated && request.nextUrl.pathname == '/sign-in') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
