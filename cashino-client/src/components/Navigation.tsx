import Link from 'next/link';
import Image from 'next/image';
import { MessageCircleMoreIcon, SearchIcon } from 'lucide-react';

import { getUser } from '@/lib/dal';
import ProfileDropdown from '@/components/ProfileDropdown';

export default async function Navigation() {
  const user = await getUser();

  return (
    <nav className="flex items-center justify-between border-b-2 border-neutral-600 bg-gradient-to-r from-neutral-700 from-15% to-neutral-800 to-25% py-2 pr-3 pl-6 text-white">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icon.png" alt="" width={32} height={32} />
        <h3 className="mt-1 text-xl font-semibold uppercase">
          <span className="text-red-300 [text-shadow:0_0_2px]">cash</span>ino
        </h3>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/" className="flex gap-2 font-semibold text-white">
          <Image src="/poker-cards.png" alt="" width={22} height={22} />
          <span>Slots</span>
        </Link>
        <Link
          href="/"
          className="text-light-300 group flex gap-2 font-semibold transition duration-300 hover:text-white"
        >
          <Image
            src="/casino-chip.png"
            alt=""
            width={22}
            height={22}
            className="brightness-75 saturate-0 duration-300 group-hover:brightness-100 group-hover:saturate-100"
          />
          <span>Live Casino</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-neutral-600 p-1">
        <div className="flex items-center gap-1 px-1">
          <Image src="/coin.png" alt="" width={20} height={20} />
          <span className="mt-0.5 text-sm font-bold">
            <span className="bg-gradient-to-b from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              46,650,576.
            </span>
            <span className="text-light-300">65</span>
          </span>
        </div>
        <button className="cursor-pointer rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-2 text-xs font-semibold transition duration-300 hover:border-orange-400 hover:bg-neutral-600 hover:text-yellow-400">
          Deposit
        </button>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <ProfileDropdown user={user} />
        ) : (
          <Link href="/sign-in">
            <button className="cursor-pointer rounded-md border border-red-500 bg-red-400 px-6 py-2 text-sm font-semibold transition duration-300 hover:bg-red-500">
              Sign in
            </button>
          </Link>
        )}
        <button className="group grid cursor-pointer place-items-center rounded-xl border border-neutral-600 p-2 transition duration-300 hover:border-red-400">
          <MessageCircleMoreIcon
            size={26}
            className="fill-neutral-300 stroke-neutral-800 transition duration-300 group-hover:fill-red-400"
          />
        </button>
        <button className="group grid cursor-pointer place-items-center rounded-xl border border-neutral-600 p-2.5 transition duration-300 hover:border-red-400">
          <SearchIcon
            size={22}
            className="stroke-neutral-300 transition duration-300 group-hover:stroke-red-400"
          />
        </button>
      </div>
    </nav>
  );
}
