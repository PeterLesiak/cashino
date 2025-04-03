'use client';

import Image from 'next/image';
import {
  useState,
  useRef,
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
  type DragEvent,
  useActionState,
} from 'react';
import * as motion from 'motion/react-client';
import { animate } from 'motion';
import bytes from 'bytes';
import {
  EyeIcon,
  EyeOffIcon,
  FileDigitIcon,
  LandmarkIcon,
  MailIcon,
  PhoneIcon,
  UploadIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';

import { signIn } from '@/actions/signIn';
import { signUp } from '@/actions/signUp';
import ProfileImage from '@/components/ProfileImage';

type CurrentPage = 'signIn' | 'signUp';

function SignInPage({
  currentPage,
  setCurrentPage,
}: {
  currentPage: CurrentPage;
  setCurrentPage: Dispatch<SetStateAction<CurrentPage>>;
}) {
  const [formState, formAction, formPending] = useActionState(signIn, undefined);

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <motion.div
      className={`${currentPage != 'signIn' ? 'hidden' : ''} flex w-[28rem] flex-col items-center p-8`}
    >
      <Image src="/icon.png" alt="" width={48} height={48} className="mb-6" />
      <h2 className="mb-2 text-2xl">Welcome back</h2>
      <h3 className="mb-8 text-sm">Please enter your details to sign in.</h3>
      <button className="border-light-300 mb-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border py-3 shadow-xs transition hover:backdrop-brightness-95">
        <Image src="/google.png" alt="google icon" width={22} height={22} />
        <span>Sign in with Google</span>
      </button>
      <div className="mb-6 flex w-full items-center gap-2">
        <span className="bg-light-300 h-[2px] w-full opacity-50"></span>
        <span className="text-sm uppercase opacity-50">or</span>
        <span className="bg-light-300 h-[2px] w-full opacity-50"></span>
      </div>
      <form action={formAction} className="grid w-full gap-5">
        <div className="relative grid gap-1">
          <label htmlFor="email" className="flex items-center gap-1">
            <span>
              Email Address<span className="ml-0.5 text-red-500">*</span>
            </span>
            {formState?.errors?.email ? (
              <span className="text-xs text-red-500">{formState.errors.email[0]}</span>
            ) : null}
          </label>
          <input
            type="email"
            defaultValue={formState?.previousFormData.get('email') as string}
            placeholder="Enter your email"
            required
            name="email"
            id="email"
            className={`${formState?.errors?.email ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
          />
          <div className="absolute right-0.5 bottom-1 p-2">
            <MailIcon size={18} className="stroke-neutral-600" />
          </div>
        </div>
        <div className="relative grid gap-1">
          <label htmlFor="password" className="flex items-center gap-1">
            <span>
              Password<span className="ml-0.5 text-red-500">*</span>
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
              <EyeOffIcon size={22} className="stroke-neutral-600" />
            ) : (
              <EyeIcon size={22} className="stroke-neutral-600" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="checked:bg-black"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <span className="cursor-pointer underline">Forgot password?</span>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-red-400 py-3 font-medium text-white shadow-xs transition hover:brightness-125"
        >
          Sign in
        </button>
      </form>
      <span className="mt-6">
        Don't have an account yet?
        <span
          className="ml-1 cursor-pointer underline"
          onClick={() => setCurrentPage('signUp')}
        >
          Sign up
        </span>
      </span>
    </motion.div>
  );
}

function SignUpPage({
  currentPage,
  setCurrentPage,
}: {
  currentPage: CurrentPage;
  setCurrentPage: Dispatch<SetStateAction<CurrentPage>>;
}) {
  const [formState, formAction, formPending] = useActionState(signUp, undefined);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [photoSubmitted, setPhotoSubmitted] = useState<File | null>(null);
  const [photoSource, setPhotoSource] = useState<string | null>(null);

  const [photoProgress, setPhotoProgress] = useState(0);

  const submitPhoto = async (file: File) => {
    setPhotoSubmitted(file);

    const reader = new FileReader();

    reader.addEventListener('load', event => {
      const target = event.target!;

      setPhotoSource(target.result as string);
    });

    reader.readAsDataURL(file);

    await animate(0, 100, {
      duration: 3,
      ease: 'circInOut',
      delay: 2,
      onUpdate: current => setPhotoProgress(current),
    });
  };

  const pickPhoto = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];

      if (file) {
        submitPhoto(file);
      }
    });

    fileInput.click();
  };

  const dropFile = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const file = event.dataTransfer?.files?.[0];

    if (file) {
      submitPhoto(file);
    }
  };

  const cancelPhoto = () => {
    setPhotoSubmitted(null);
    setPhotoSource(null);
  };

  return (
    <motion.div
      className={`${currentPage != 'signUp' ? 'hidden' : ''} flex min-w-[43rem] flex-col items-center px-8 py-6`}
    >
      <div className="mb-10 grid grid-flow-col gap-3">
        <div className="size-14 place-self-center overflow-hidden rounded-full text-xl">
          {firstName ? (
            <ProfileImage firstName={firstName} lastName={lastName} />
          ) : (
            <div className="size-full animate-pulse bg-neutral-300"></div>
          )}
        </div>
        <div className="grid gap-1">
          <h2 className="text-xl font-medium">Register account</h2>
          <h3 className="text-sm">Please enter your details to sign up.</h3>
        </div>
      </div>
      <form action={formAction} className="grid w-full gap-4">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative grid gap-1">
            <label htmlFor="firstName" className="flex items-center gap-1">
              <span>
                First name<span className="ml-0.5 text-red-500">*</span>
              </span>
              {formState?.errors?.firstName ? (
                <span className="text-xs text-red-500">{formState.errors.firstName[0]}</span>
              ) : null}
            </label>
            <input
              type="text"
              defaultValue={formState?.previousFormData.get('firstName') as string}
              placeholder="Your first name"
              required
              name="firstName"
              id="firstName"
              className={`${formState?.errors?.firstName ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
              onChange={e => setFirstName(e.target.value)}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <UserIcon size={18} className="stroke-neutral-600" />
            </div>
          </div>

          <div className="relative grid gap-1">
            <label htmlFor="lastName" className="flex items-center gap-1">
              <span>
                Last name<span className="ml-0.5 text-red-500">*</span>
              </span>
              {formState?.errors?.lastName ? (
                <span className="text-xs text-red-500">{formState.errors.lastName[0]}</span>
              ) : null}
            </label>
            <input
              type="text"
              defaultValue={formState?.previousFormData.get('lastName') as string}
              placeholder="Your last name"
              required
              name="lastName"
              id="lastName"
              className={`${formState?.errors?.lastName ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
              onChange={e => setLastName(e.target.value)}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <UserIcon size={18} className="stroke-neutral-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="relative grid gap-1">
            <label htmlFor="phoneNumber" className="flex items-center gap-1">
              <span>Phone number</span>
              {formState?.errors?.phoneNumber ? (
                <span className="text-xs text-red-500">{formState.errors.phoneNumber[0]}</span>
              ) : null}
            </label>
            <input
              type="tel"
              defaultValue={formState?.previousFormData.get('phoneNumber') as string}
              placeholder="___ ___ ___"
              minLength={11}
              maxLength={11}
              name="phoneNumber"
              id="phoneNumber"
              className={`${formState?.errors?.phoneNumber ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-11`}
              onChange={event => {
                const input = event.target;
                const raw = input.value.replace(/\D/g, '');

                let value = '';

                for (let i = 0; i < raw.length; i += 3) {
                  if (i > 0) {
                    value += ' ';
                  }

                  value += raw.substring(i, i + 3);
                }

                input.value = value;
              }}
            />
            <span className="absolute bottom-[9px] left-[9px] text-neutral-600">+48</span>
            <div className="absolute right-0.5 bottom-1 p-2">
              <PhoneIcon size={18} className="stroke-neutral-600" />
            </div>
          </div>

          <div className="relative grid gap-1">
            <label htmlFor="PESEL" className="flex items-center gap-1">
              <span>
                PESEL<span className="ml-0.5 text-red-500">*</span>
              </span>
              {formState?.errors?.PESEL ? (
                <span className="text-xs text-red-500">{formState.errors.PESEL[0]}</span>
              ) : null}
            </label>
            <input
              type="text"
              defaultValue={formState?.previousFormData.get('PESEL') as string}
              placeholder="___________"
              required
              minLength={11}
              maxLength={11}
              name="PESEL"
              id="PESEL"
              className={`${formState?.errors?.PESEL ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <FileDigitIcon size={18} className="stroke-neutral-600" />
            </div>
          </div>
        </div>

        <div className="grid gap-1">
          <span>
            Your identifier card photo<span className="ml-0.5 text-red-500">*</span>
          </span>
          {photoSubmitted ? (
            <div className="border-light-300 flex items-center gap-4 rounded-md border px-4 py-2">
              <div className="grid h-16 w-10 place-items-center">
                {photoSource ? (
                  <Image src={photoSource} alt="ID card preview" width={40} height={64} />
                ) : (
                  <div className="size-full animate-pulse bg-neutral-300"></div>
                )}
              </div>
              <div className="relative grid w-full gap-2">
                <span>
                  {photoSubmitted.name}
                  <span
                    className={`${photoProgress < 100 ? 'hidden' : ''} ml-2 text-sm font-medium text-green-500 uppercase`}
                  >
                    uploaded
                  </span>
                </span>
                <span className="bg-light-300 relative h-2 rounded-full">
                  <motion.span
                    className="absolute h-2 rounded-full bg-red-400"
                    style={{ width: `${photoProgress}%` }}
                  ></motion.span>
                </span>
                <motion.span className="text-neutral-600">
                  {bytes(photoSubmitted.size, { unitSeparator: ' ' })} -{' '}
                  {Math.round(photoProgress)}% completed
                </motion.span>
              </div>
              <button type="button" className="cursor-pointer py-2" onClick={cancelPhoto}>
                <XIcon size={24} className="stroke-neutral-600" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="border-light-300 bg-light-100 flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed py-4 transition duration-300 hover:brightness-95"
              onClick={pickPhoto}
              onDragEnter={event => {
                event.stopPropagation();
                event.preventDefault();
              }}
              onDragOver={event => {
                event.stopPropagation();
                event.preventDefault();
              }}
              onDrop={dropFile}
            >
              <div className="mb-2 grid place-items-center rounded-full bg-red-100 p-2">
                <UploadIcon size={24} className="stroke-red-500" />
              </div>
              <span className="mb-1">
                Drag & Drop or <span className="text-red-500">Choose file</span> to upload
              </span>
              <span className="text-xs text-neutral-600">
                PNG, JPEG, WEBP (Maximum size: 5MB)
              </span>
            </button>
          )}
        </div>

        <div className="relative grid gap-1">
          <label htmlFor="bankAccountNumber" className="flex items-center gap-1">
            <span>
              Bank account number<span className="ml-0.5 text-red-500">*</span>
            </span>
            {formState?.errors?.bankAccountNumber ? (
              <span className="text-xs text-red-500">
                {formState.errors.bankAccountNumber[0]}
              </span>
            ) : null}
          </label>
          <input
            type="text"
            defaultValue={formState?.previousFormData.get('bankAccountNumber') as string}
            placeholder="__ ____ ____ ____ ____ ____ ____"
            required
            minLength={32}
            maxLength={32}
            name="bankAccountNumber"
            id="bankAccountNumber"
            className={`${formState?.errors?.bankAccountNumber ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-8`}
            onChange={event => {
              const input = event.target;
              const raw = input.value.replace(/\D/g, '');

              let value = raw.length >= 2 ? raw.substring(0, 2) : raw;

              for (let i = 2; i < raw.length; i += 4) {
                if (i > 0) {
                  value += ' ';
                }

                value += raw.substring(i, i + 4);
              }

              input.value = value;
            }}
          />
          <span className="absolute bottom-[9px] left-[9px] text-neutral-600">PL</span>
          <div className="absolute right-0.5 bottom-1 p-2">
            <LandmarkIcon size={18} className="stroke-neutral-600" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="relative grid gap-1">
            <label htmlFor="email" className="flex items-center gap-1">
              <span>
                Email<span className="ml-0.5 text-red-500">*</span>
              </span>
              {formState?.errors?.email ? (
                <span className="text-xs text-red-500">{formState.errors.email[0]}</span>
              ) : null}
            </label>
            <input
              type="email"
              defaultValue={formState?.previousFormData.get('email') as string}
              placeholder="Enter your email"
              required
              name="email"
              id="email"
              className={`${formState?.errors?.email ? 'animate-shake border-red-500' : ''} border-light-300 rounded-md border p-2 pl-3`}
            />
            <div className="absolute right-0.5 bottom-1 p-2">
              <MailIcon size={18} className="stroke-neutral-600" />
            </div>
          </div>

          <div className="relative grid gap-1">
            <label htmlFor="password" className="flex items-center gap-1">
              <span>
                Password<span className="ml-0.5 text-red-500">*</span>
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
                <EyeOffIcon size={22} className="stroke-neutral-600" />
              ) : (
                <EyeIcon size={22} className="stroke-neutral-600" />
              )}
            </button>
          </div>
        </div>

        <button
          disabled={formPending}
          type="submit"
          className="w-full cursor-pointer rounded-md bg-red-400 py-3 font-medium text-white shadow-xs transition hover:brightness-125"
        >
          Sign up
        </button>
      </form>
      <span className="mt-6">
        Already have an account?
        <span
          className="ml-1 cursor-pointer underline"
          onClick={() => setCurrentPage('signIn')}
        >
          Sign in
        </span>
      </span>
    </motion.div>
  );
}

export default function SignIn() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('signIn');

  return (
    <>
      <div className="fixed inset-0 bg-[#000000bc] backdrop-blur-sm"></div>
      <div className="animate-expand fixed top-1/2 left-1/2 -translate-1/2 shadow-2xl">
        <motion.div layout className="rounded-xl bg-white">
          <SignInPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <SignUpPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </motion.div>
      </div>
    </>
  );
}
