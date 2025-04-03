import 'server-only';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import dayjs from 'dayjs';

import { getUser } from '@/lib/dal';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  sessionId: number;
  expiresAt: Date | null;
};

type CreateSessionRequest = { userId: number; expiresAt: string | null };

type CreateSessionResponse =
  | { success: true; sessionId: number }
  | { success: false; errorField: string; errorMessage: string };

export function defaultExpireDate() {
  return new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
}

export async function createSession(
  userId: number,
  expiresAt: Date | null = defaultExpireDate(),
) {
  const expiresAtString = expiresAt ? dayjs(expiresAt).format('YYYY-MM-DD HH:mm:ss') : null;

  const request: CreateSessionRequest = { userId, expiresAt: expiresAtString };

  const response = await fetch('http://localhost/cashino-server/api/create-session.php', {
    method: 'post',
    body: JSON.stringify(request),
  });

  const responseBody: CreateSessionResponse = await response.json();

  if (!responseBody.success) return;

  const { sessionId } = responseBody;

  const session = await encrypt({ sessionId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt ?? undefined,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = payload.expiresAt ? defaultExpireDate() : undefined;

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  });
}

type DeleteSessionRequest = { sessionId: number; userId: number };

type DeleteSessionResponse =
  | { success: true }
  | { success: false; errorField: string; errorMessage: string };

export async function deleteSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session);

  const user = await getUser();

  if (!payload || !user) return;

  const request: DeleteSessionRequest = { sessionId: payload.sessionId, userId: user.id };

  const response = await fetch('http://localhost/cashino-server/api/delete-session.php', {
    method: 'post',
    body: JSON.stringify(request /* fuck AI autocomplitions */),
  });

  const responseBody: DeleteSessionResponse = await response.json();

  if (!responseBody.success) {
    // TODO: wow that sucks, but I really don't care
  }

  cookieStore.delete('session');
}

export async function encrypt(payload: SessionPayload) {
  let jwt = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt();

  if (payload.expiresAt) {
    const date = defaultExpireDate();

    jwt = jwt.setExpirationTime(date);
  }

  return jwt.sign(encodedKey);
}

export async function decrypt(session?: string) {
  if (!session) return null;

  const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
    algorithms: ['HS256'],
  });

  return payload;
}
