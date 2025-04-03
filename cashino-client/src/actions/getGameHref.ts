'use server';

import { redirect } from 'next/navigation';

type GameHrefResponse =
  | { success: true; href: string }
  | { success: false; errorField: string; errorMessage: string };

export async function getGameHref(gameId: string) {
  const response = await fetch('http://localhost/cashino-server/api/get-game-href.php', {
    method: 'post',
    body: JSON.stringify({ gameId }),
  });

  const responseBody: GameHrefResponse = await response.json();

  if (!responseBody.success) {
    redirect('/');
  }

  return responseBody.href;
}
