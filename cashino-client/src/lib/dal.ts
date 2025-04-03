import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { decrypt, type SessionPayload } from '@/lib/session';
import type { User, UserRequest, UserResponse } from '@/types/User';

export const verifySession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;

  const session = await decrypt(cookie);

  if (!session) {
    return null;
  }

  return session;
});

export const getUser = cache(async (): Promise<User | null> => {
  const session = await verifySession();

  if (!session) return null;

  const request: UserRequest = { sessionId: session.sessionId };

  const response = await fetch('http://localhost/cashino-server/api/get-user.php', {
    method: 'post',
    body: JSON.stringify(request),
  });

  const responseBody: UserResponse = await response.json();

  if (!responseBody.success) return null;

  return responseBody.user;
});
