'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { logout } from '@/actions/logout';
import ProfileImage from '@/components/ProfileImage';
import type { User } from '@/types/User';
import Link from 'next/link';

export default function ProfileDropdown({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdownArea = dropdownAreaRef.current!;

    document.addEventListener('click', event => {
      const target = event.target as Node;

      if (!dropdownArea.contains(target)) {
        setIsOpen(false);
      }
    });
  }, []);

  return (
    <div ref={dropdownAreaRef} className="relative">
      <div
        className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-neutral-600 pr-2 transition duration-300 hover:bg-neutral-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="aspect-square">
          <ProfileImage
            firstName={user.firstName}
            lastName={user.lastName}
            className="rounded-full p-2"
          />
        </div>
        <span className="ml-1 font-semibold">
          {user.firstName} {user.lastName}
        </span>
        <ChevronDownIcon size={20} />
      </div>
      <div
        className={`${!isOpen ? 'scale-y-0 opacity-0' : ''} absolute top-14 right-0 z-10 grid origin-top gap-6 rounded-md bg-neutral-900 px-4 py-6 shadow-lg transition duration-300`}
        onClick={() => setIsOpen(false)}
      >
        <Link href="/dashboard" className={!user.admin ? 'hidden' : ''}>
          <button className="w-max cursor-pointer rounded-md border border-green-400 px-10 py-2 font-semibold text-green-400 transition duration-300 hover:brightness-125 hover:backdrop-brightness-125">
            Admin dashboard
          </button>
        </Link>
        <Link href="/profile">
          <button className="w-max cursor-pointer rounded-md border border-yellow-400 px-10 py-2 font-semibold text-yellow-400 transition duration-300 hover:brightness-125 hover:backdrop-brightness-125">
            Account settings
          </button>
        </Link>
        <button className="w-max cursor-pointer rounded-md border border-orange-300 px-10 py-2 font-semibold text-orange-400 transition duration-300 hover:brightness-125 hover:backdrop-brightness-125">
          Withdraw credits
        </button>
        <button
          className="cursor-pointer rounded-md border border-red-400 px-10 py-2 font-semibold text-red-400 transition duration-300 hover:brightness-125 hover:backdrop-brightness-125"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
