import { redirect } from 'next/navigation';

import { getUser } from '@/lib/dal';
import ProfileUpdateForm from '@/components/ProfileUpdateForm';

export default async function Profile() {
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="flex w-full justify-center p-10">
      <ProfileUpdateForm user={user} />
    </div>
  );
}
