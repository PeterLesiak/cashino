import Image from 'next/image';

import GamesCarousel from '@/components/GamesCarousel';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-neutral-800 p-3 text-white">
      <div className="flex h-[24.25rem] justify-between gap-3">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/gold-background.png"
            alt=""
            width={1920}
            height={1080}
            className="w-full"
          />
          <div className="absolute inset-0 flex flex-col justify-center gap-8 pl-24">
            <h2 className="grid gap-4 text-3xl text-[clamp(0.1rem,_3vw,_3rem)] font-bold">
              <span>Welcome Package</span>
              <span>
                ──<span className="mx-4 text-yellow-400">$/$200</span>──
              </span>
              <span>
                <span className="text-yellow-400">+200</span> free spins
              </span>
            </h2>
            <button className="w-fit cursor-pointer rounded-md bg-red-400 px-8 py-3 font-semibold uppercase transition duration-300 hover:bg-red-500">
              play now
            </button>
          </div>
        </div>
        <div className="flex flex-col rounded-lg border-2 border-neutral-600">
          <div className="flex items-center gap-2 rounded-t-md px-3 py-2">
            <Image src="/medal.png" alt="" width={20} height={20} />
            <h4 className="text-lg font-semibold">Latest Winners</h4>
          </div>
          <div className="grid grid-flow-col items-center bg-neutral-700 p-3">
            <div className="mr-3 size-10 animate-pulse rounded bg-neutral-300"></div>
            <div className="text-light-300 flex w-max flex-col gap-1 text-sm">
              <span>
                <span className="font-semibold">Piotr, Lesiak</span> just won
              </span>
              <span>
                in <span className="font-semibold text-white">Coin Strike: Hold a...</span>
              </span>
            </div>
            <span className="ml-4 font-medium">$18.00</span>
          </div>
          <div className="grid grid-flow-col items-center p-3">
            <div className="mr-3 size-10 animate-pulse rounded bg-neutral-300"></div>
            <div className="text-light-300 flex w-max flex-col gap-1 text-sm">
              <span>
                <span className="font-semibold">Piotr, Lesiak</span> just won
              </span>
              <span>
                in <span className="font-semibold text-white">Coin Strike: Hold a...</span>
              </span>
            </div>
            <span className="ml-4 font-medium">$18.00</span>
          </div>
          <div className="grid grid-flow-col items-center bg-neutral-700 p-3">
            <div className="mr-3 size-10 animate-pulse rounded bg-neutral-300"></div>
            <div className="text-light-300 flex w-max flex-col gap-1 text-sm">
              <span>
                <span className="font-semibold">Piotr, Lesiak</span> just won
              </span>
              <span>
                in <span className="font-semibold text-white">Coin Strike: Hold a...</span>
              </span>
            </div>
            <span className="ml-4 font-medium">$18.00</span>
          </div>
          <div className="grid grid-flow-col items-center p-3">
            <div className="mr-3 size-10 animate-pulse rounded bg-neutral-300"></div>
            <div className="text-light-300 flex w-max flex-col gap-1 text-sm">
              <span>
                <span className="font-semibold">Piotr, Lesiak</span> just won
              </span>
              <span>
                in <span className="font-semibold text-white">Coin Strike: Hold a...</span>
              </span>
            </div>
            <span className="ml-4 font-medium">$18.00</span>
          </div>
          <div className="grid grid-flow-col items-center rounded-b-md bg-neutral-700 p-3">
            <div className="mr-3 size-10 animate-pulse rounded bg-neutral-300"></div>
            <div className="text-light-300 flex w-max flex-col gap-1 text-sm">
              <span>
                <span className="font-semibold">Piotr, Lesiak</span> just won
              </span>
              <span>
                in <span className="font-semibold text-white">Coin Strike: Hold a...</span>
              </span>
            </div>
            <span className="ml-4 font-medium">$18.00</span>
          </div>
        </div>
      </div>

      <GamesCarousel />
    </div>
  );
}
