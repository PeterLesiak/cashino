import type { ComponentProps, CSSProperties } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { hashStringToHue } from '@/lib/utils';

const profileImage = cva(
  'grid size-full place-items-center bg-[hsl(var(--bg-hue)_100%_50%))] p-2',
);

export interface ProfileImageProps
  extends ComponentProps<'div'>,
    VariantProps<typeof profileImage> {
  firstName: string;
  lastName?: string;
}

export default function ProfileImage({
  firstName,
  lastName,
  className,
  ...props
}: ProfileImageProps) {
  const [firstNameFormatted, lastNameFormatted] = [
    firstName.trim().toUpperCase(),
    lastName?.trim().toUpperCase(),
  ];

  const initials = `${firstNameFormatted[0]}${lastNameFormatted ? lastNameFormatted[0] : '_'}`;
  const backgroundHueHash = hashStringToHue(`${firstNameFormatted} ${lastNameFormatted}`);

  return (
    <div
      className={profileImage({ className })}
      style={{ '--bg-hue': backgroundHueHash } as CSSProperties}
      {...props}
    >
      <span className="font-semibold text-white">{initials}</span>
    </div>
  );
}
