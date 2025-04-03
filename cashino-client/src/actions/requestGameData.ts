'use server';

import { Game, GameRequest } from '@/types/Game';

export async function requestGameData(request: GameRequest): Promise<Game[]> {
  const response = await fetch('http://localhost/cashino-server/api/select-games.php', {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return await response.json();
}
