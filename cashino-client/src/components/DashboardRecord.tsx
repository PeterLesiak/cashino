'use client';

import type { User } from '@/types/User';

export default function DashboardRecord({ user }: { user: User }) {
  return (
    <div className="flex h-min border-collapse">
      <input
        type="text"
        name="firstName"
        defaultValue={user.firstName}
        className="w-[8rem] border p-3"
      />
      <input
        type="text"
        name="lastName"
        defaultValue={user.lastName}
        className="w-[8rem] border p-3"
      />
      <input
        type="text"
        name="phoneNumber"
        defaultValue={user.phoneNumber ? user.phoneNumber : ''}
        className="w-[12rem] border p-3"
      />
      <input
        type="text"
        name="PESEL"
        defaultValue={user.PESEL}
        className="w-[10rem] border p-3"
      />
      <input
        type="text"
        name="bankAccountNumber"
        defaultValue={user.bankAccountNumber}
        className="w-[23rem] border p-3"
      />
      <input
        type="email"
        name="email"
        defaultValue={user.email}
        className="w-[15rem] border p-3"
      />
      <div className="grid w-[5rem] place-items-center border p-3">
        <input type="checkbox" name="admin" defaultChecked={user.admin === 1} />
      </div>
      <div className="grid w-[6rem] place-items-center border py-4">
        <button className="cursor-pointer rounded-lg bg-red-300 px-3 py-1 text-sm font-semibold">
          Save
        </button>
      </div>
    </div>
  );
}
