import { getGameHref } from '@/actions/getGameHref';

export default async function Play({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;

  const gameHref = await getGameHref(gameId);

  return (
    <>
      <div className="fixed inset-0 bg-[#000000bc] backdrop-blur-sm"></div>
      <div className="animate-expand fixed top-1/2 left-1/2 -translate-1/2 shadow-2xl">
        <iframe src={gameHref} className="h-[75vh] w-[75vw] rounded-xl"></iframe>
      </div>
    </>
  );
}
