import { redirect } from 'next/navigation';

import { getUser } from '@/lib/dal';
import DashboardRecord from '@/components/DashboardRecord';
import type { User } from '@/types/User';

export default async function Dashboard() {
  const user = await getUser();

  if (!user?.admin) {
    redirect('/');
  }

  const response = await fetch('http://localhost/cashino-server/api/select-users.php', {
    method: 'post',
  });

  const users: User[] = await response.json();

  return (
    <div className="flex flex-col p-8 text-lg text-white">
      <div className="flex border-collapse">
        <div className="flex w-[8rem] justify-center border p-3 font-semibold">First name</div>
        <div className="flex w-[8rem] justify-center border p-3 font-semibold">Last name</div>
        <div className="flex w-[12rem] justify-center border p-3 font-semibold">
          (Phone number)
        </div>
        <div className="flex w-[10rem] justify-center border p-3 font-semibold">PESEL</div>
        <div className="flex w-[23rem] justify-center border p-3 font-semibold">
          Bank account number
        </div>
        <div className="flex w-[15rem] justify-center border p-3 font-semibold">Email</div>
        <div className="flex w-[5rem] justify-center border p-3 font-semibold">Admin</div>
        <div className="flex w-[6rem] justify-center border p-3 font-semibold">Action</div>
      </div>
      {users.map((user, index) => (
        <DashboardRecord user={user} key={index} />
      ))}
    </div>
  );
}
