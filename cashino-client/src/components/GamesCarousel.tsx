'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';
import useSWRMutation from 'swr/mutation';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from 'lucide-react';

import {
  gameRequestCriterias,
  type GameRequest,
  type GameRequestCriteria,
  type GameRequestSortOrder,
  type Game,
} from '@/types/Game';
import { requestGameData } from '@/actions/requestGameData';

function GameThumbnail({
  href,
  imageSrc,
  imageAlt,
  provider,
  accentColor1,
  accentColor2,
  accentColor3,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  provider: string;
  accentColor1: string;
  accentColor2: string;
  accentColor3: string;
}) {
  return (
    <Link
      href={href}
      className="relative shrink-0 grow-0 basis-auto rounded-3xl border border-neutral-600 bg-neutral-700 p-2 pb-8 shadow-[0_0_10px_1px_var(--tw-shadow-color)] transition duration-300 hover:border-[var(--accent-color-3)] hover:bg-[var(--accent-color-2)] hover:[--tw-shadow-color:var(--accent-color-3)]"
      style={
        {
          '--accent-color-1': accentColor1,
          '--accent-color-2': accentColor2,
          '--accent-color-3': accentColor3,
        } as CSSProperties
      }
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={252}
        height={300}
        className="rounded-t-3xl"
      />
      <div className="absolute right-2 bottom-2 left-2 grid h-10 place-items-center rounded-b-2xl bg-[var(--accent-color-1)]">
        <span className="text-xs font-semibold uppercase">{provider}</span>
      </div>
    </Link>
  );
}

function GameThumbnailSkeleton() {
  return (
    <div className="shirnk-0 relative grow-0 basis-auto animate-pulse rounded-3xl border border-neutral-500 bg-neutral-700 p-2 pb-8 shadow-sm">
      <div className="h-[300px] w-[252px] rounded-t-3xl bg-neutral-600"></div>
      <div className="absolute right-2 bottom-2 left-2 grid h-10 place-items-center rounded-b-2xl bg-neutral-500"></div>
    </div>
  );
}

export default function GamesCarousel() {
  const [emblaRef, emblaAPI] = useEmblaCarousel({ align: 'start' });
  const [gameData, setGameData] = useState<Game[] | null>(null);

  const [provider, setProvider] = useState<string | undefined>();
  const [gameName, setGameName] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<GameRequestCriteria>('popular');
  const [sortOrder, setSortOrder] = useState<GameRequestSortOrder>('descending');

  useEffect(() => {
    (async () => {
      setGameData(await requestGameData({ provider, gameName, sortCriteria, sortOrder }));
    })();
  }, [provider, gameName, sortCriteria, sortOrder]);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for game..."
            className="text-light-300 rounded-2xl border-2 border-neutral-600 bg-neutral-700 py-3.5 pl-[7.5rem] text-xs"
            onChange={e => setGameName(e.target.value)}
          />
          <button className="absolute top-[0.3rem] bottom-[0.3rem] left-[0.3rem] flex cursor-pointer items-center gap-1 rounded-xl bg-neutral-600 px-3 transition duration-300 hover:brightness-110">
            <span className="text-sm font-medium">Providers</span>
            <ChevronDownIcon size={18} />
          </button>
          <button className="absolute top-3.5 right-4 cursor-pointer">
            <SearchIcon size={18} className="stroke-light-300" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="text-light-300 flex cursor-pointer items-center rounded-2xl border-2 border-neutral-600 bg-neutral-700 px-4 py-2 text-sm transition duration-300 hover:brightness-110"
            onClick={() => {
              const nextIndex = gameRequestCriterias.indexOf(sortCriteria) + 1;
              const insideBounds = nextIndex < gameRequestCriterias.length ? nextIndex : 0;

              setSortCriteria(gameRequestCriterias[insideBounds]);
            }}
          >
            <ArrowUpDownIcon size={22} className="mr-2" />
            <span className="mr-1 w-max">Sort by:</span>
            <span className="font-semibold text-white capitalize">{sortCriteria}</span>
            <ChevronDownIcon size={18} className="ml-2 stroke-white" />
          </button>
          <button
            className={`${sortOrder == 'ascending' ? 'rotate-180' : ''} text-light-300 grid size-12 cursor-pointer place-items-center rounded-2xl border-2 border-neutral-600 bg-neutral-700 p-2 transition duration-300 hover:text-white hover:brightness-110`}
            onClick={() => {
              setSortOrder(sortOrder == 'descending' ? 'ascending' : 'descending');
            }}
          >
            <ArrowDownWideNarrowIcon size={22} />
          </button>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between px-2 font-semibold">
        <div className="flex items-center gap-3">
          <span className="size-4 rounded-full bg-red-400"></span>
          <span className="uppercase">relevant games</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer rounded-xl border-2 border-neutral-600 bg-neutral-700 p-2 transition duration-300 hover:brightness-110"
            onClick={() => emblaAPI?.scrollPrev()}
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            className="cursor-pointer rounded-xl border-2 border-neutral-600 bg-neutral-700 p-2 transition duration-300 hover:brightness-110"
            onClick={() => emblaAPI?.scrollNext()}
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>
      <div ref={emblaRef} className="overflow-hidden p-2">
        <div className="flex select-none *:mr-6">
          {gameData ? (
            gameData.map(game => (
              <GameThumbnail
                href={`/play/${game.id}`}
                provider={game.provider}
                imageSrc={game.imageURL}
                imageAlt={game.altName}
                accentColor1={`#${game.accentColor1}`}
                accentColor2={`#${game.accentColor2}`}
                accentColor3={`#${game.accentColor3}`}
                key={game.id}
              />
            ))
          ) : (
            <>
              <GameThumbnailSkeleton />
              <GameThumbnailSkeleton />
              <GameThumbnailSkeleton />
              <GameThumbnailSkeleton />
              <GameThumbnailSkeleton />
              <GameThumbnailSkeleton />
              <GameThumbnailSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
