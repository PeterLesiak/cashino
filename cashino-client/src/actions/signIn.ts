'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createSession } from '@/lib/session';

const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }).trim(),
  password: z.string(),
  remember: z.boolean().optional(),
});

export type SignInFormState =
  | {
      errors?: { email?: string[]; password?: string[] };
      message?: string;
    }
  | undefined;

export type SignInResponse =
  | { success: true; userId: number }
  | { success: false; errorField: string; errorMessage: string };

export async function signIn(state: SignInFormState, formData: FormData) {
  const emailRaw = formData.get('email') as string | null;
  const emailFormatted = emailRaw?.trim() ?? null;

  const passwordRaw = formData.get('password') as string | null;
  const passwordFormatted = passwordRaw?.trim() ?? null;

  const validatedFields = SignInFormSchema.safeParse({
    email: emailFormatted,
    password: passwordFormatted,
    remember: formData.get('remember') === 'on',
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, previousFormData: formData };
  }

  const userData = validatedFields.data;

  const response = await fetch('http://localhost/cashino-server/api/sign-in.php', {
    method: 'post',
    body: JSON.stringify(userData),
  });

  const responseBody: SignInResponse = await response.json();

  if (!responseBody.success) {
    return {
      errors: { [responseBody.errorField]: [responseBody.errorMessage] },
      previousFormData: formData,
    };
  }

  await createSession(responseBody.userId, userData.remember ? null : undefined);

  redirect('/');
}
