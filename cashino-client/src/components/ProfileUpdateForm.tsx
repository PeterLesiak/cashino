'use client';

import { useActionState, useState } from 'react';
import {
  EyeIcon,
  EyeOffIcon,
  FileDigitIcon,
  LandmarkIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react';

import { updateProfile } from '@/actions/updateProfile';
import ProfileImage from '@/components/ProfileImage';
import { formatBankAccountNumber, formatPhoneNumber } from '@/lib/utils';
import { User } from '@/types/User';

export default function ProfileUpdateForm({ user }: { user: User }) {
  const [formState, formAction, formPending] = useActionState(updateProfile, undefined);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex h-min min-w-[43rem] flex-col items-center rounded-xl bg-neutral-900 p-10 text-white">
      <div className="mb-10 size-24 text-3xl">
        {firstName ? (
          <ProfileImage
            firstName={firstName}
            lastName={lastName}
            className="rounded-full shadow-[0_0_15px_hsl(var(--bg-hue)_100%_50%)]"
          />
        ) : (
          <div className="size-full animate-pulse rounded-full bg-neutral-300"></div>
        )}
      </div>
      <form action={formAction} className="grid w-full gap-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative grid gap-2">
            <label htmlFor="firstName" className="flex items-center gap-1">
              <span>
                First name<span className="ml-1 text-red-500">*</span>
              </span>
              {formState?.errors?.firstName ? (
                <span className="text-xs text-red-500">{formState.errors.firstName[0]}</span>
              ) : null}
            </label>
            <input
              type="text"
              defaultValue={
                (formState?.previousFormData.get('firstName') as string) ?? user.firstName
              }
              placeholder="Your first name"
              required
              name="firstName"
              id="firstName"
              className={`${formState?.errors?.firstName ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
              onChange={e => setFirstName(e.target.value)}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <UserIcon size={18} className="stroke-light-300" />
            </div>
          </div>

          <div className="relative grid gap-2">
            <label htmlFor="lastName" className="flex items-center gap-1">
              <span>
                Last name<span className="ml-1 text-red-500">*</span>
              </span>
              {formState?.errors?.lastName ? (
                <span className="text-xs text-red-500">{formState.errors.lastName[0]}</span>
              ) : null}
            </label>
            <input
              type="text"
              defaultValue={
                (formState?.previousFormData.get('lastName') as string) ?? user.lastName
              }
              placeholder="Your last name"
              required
              name="lastName"
              id="lastName"
              className={`${formState?.errors?.lastName ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
              onChange={e => setLastName(e.target.value)}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <UserIcon size={18} className="stroke-light-300" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="relative grid gap-2">
            <label htmlFor="phoneNumber" className="flex items-center gap-1">
              <span>Phone number</span>
              {formState?.errors?.phoneNumber ? (
                <span className="text-xs text-red-500">{formState.errors.phoneNumber[0]}</span>
              ) : null}
            </label>
            <input
              type="tel"
              defaultValue={
                (formState?.previousFormData.get('phoneNumber') as string) ??
                formatPhoneNumber(user.phoneNumber ?? '')
              }
              placeholder="___ ___ ___"
              minLength={11}
              maxLength={11}
              name="phoneNumber"
              id="phoneNumber"
              className={`${formState?.errors?.phoneNumber ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-11`}
              onChange={event => {
                const input = event.target;

                input.value = formatPhoneNumber(input.value);
              }}
            />
            <span className="text-light-300 absolute bottom-[9px] left-[9px]">+48</span>
            <div className="absolute right-0.5 bottom-1 p-2">
              <PhoneIcon size={18} className="stroke-light-300" />
            </div>
          </div>

          <div className="relative grid gap-2">
            <label htmlFor="PESEL" className="flex items-center gap-1">
              <span>
                PESEL<span className="ml-1 text-red-500">*</span>
              </span>
              {formState?.errors?.PESEL ? (
                <span className="text-xs text-red-500">{formState.errors.PESEL[0]}</span>
              ) : null}
            </label>
            <input
              type="text"
              defaultValue={(formState?.previousFormData.get('PESEL') as string) ?? user.PESEL}
              placeholder="___________"
              required
              minLength={11}
              maxLength={11}
              name="PESEL"
              id="PESEL"
              className={`${formState?.errors?.PESEL ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <FileDigitIcon size={18} className="stroke-light-300" />
            </div>
          </div>
        </div>

        <div className="relative grid gap-2">
          <label htmlFor="bankAccountNumber" className="flex items-center gap-1">
            <span>
              Bank account number<span className="ml-1 text-red-500">*</span>
            </span>
            {formState?.errors?.bankAccountNumber ? (
              <span className="text-xs text-red-500">
                {formState.errors.bankAccountNumber[0]}
              </span>
            ) : null}
          </label>
          <input
            type="text"
            defaultValue={
              (formState?.previousFormData.get('bankAccountNumber') as string) ??
              formatBankAccountNumber(user.bankAccountNumber)
            }
            placeholder="__ ____ ____ ____ ____ ____ ____"
            required
            minLength={32}
            maxLength={32}
            name="bankAccountNumber"
            id="bankAccountNumber"
            className={`${formState?.errors?.bankAccountNumber ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-8`}
            onChange={event => {
              const input = event.target;

              input.value = formatBankAccountNumber(input.value);
            }}
          />
          <span className="text-light-300 absolute bottom-[9px] left-[9px]">PL</span>
          <div className="absolute right-0.5 bottom-1 p-2">
            <LandmarkIcon size={18} className="stroke-light-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="relative grid gap-2">
            <label htmlFor="email" className="flex items-center gap-1">
              <span>
                Email<span className="ml-1 text-red-500">*</span>
              </span>
              {formState?.errors?.email ? (
                <span className="text-xs text-red-500">{formState.errors.email[0]}</span>
              ) : null}
            </label>
            <input
              type="email"
              defaultValue={(formState?.previousFormData.get('email') as string) ?? user.email}
              placeholder="Enter your email"
              required
              name="email"
              id="email"
              className={`${formState?.errors?.email ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <MailIcon size={18} className="stroke-light-300" />
            </div>
          </div>

          <div className="relative grid gap-2">
            <label htmlFor="password" className="flex items-center gap-1">
              <span>
                Password<span className="ml-1 text-red-500">*</span>
              </span>
              {formState?.errors?.password ? (
                <span className="text-xs text-red-500">{formState.errors.password[0]}</span>
              ) : null}
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              defaultValue={formState?.previousFormData.get('password') as string}
              placeholder="Enter your password"
              required
              name="password"
              id="password"
              className={`${formState?.errors?.password ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
            />
            <button
              type="button"
              className="absolute right-0.5 bottom-0.5 cursor-pointer p-2"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeOffIcon size={22} className="stroke-light-300" />
              ) : (
                <EyeIcon size={22} className="stroke-light-300" />
              )}
            </button>
          </div>
        </div>

        <button
          disabled={formPending}
          type="submit"
          className="w-full cursor-pointer rounded-md bg-red-400 py-3 font-medium text-white shadow-xs transition hover:brightness-125"
        >
          Update account
        </button>
      </form>
    </div>
  );
}
