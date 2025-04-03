'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createSession } from '@/lib/session';
import { capitalize } from '@/lib/utils';

const SignUpFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Must be at least 2 chars long' })
    .max(255, { message: 'Must be at most 255 chars long' }),

  lastName: z
    .string()
    .min(2, { message: 'Must be at least 2 chars long' })
    .max(255, { message: 'Must be at most 255 chars long' }),

  phoneNumber: z
    .union([z.literal(''), z.string().length(9, { message: 'Must be 9 digits long' })])
    .optional(),

  PESEL: z.string().length(11, { message: 'Must be 11 digits long' }),

  bankAccountNumber: z.string().length(26, { message: 'Must be 26 digits long' }),

  email: z.string().email({ message: 'Must be a valid email address' }).trim(),

  password: z
    .string()
    .min(8, { message: 'Must be at least 8 chars long' })
    .max(255, { message: 'Must be at most 255 chars long' })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Must contain at least one special char.',
    }),
});

export type SignUpFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        phoneNumber?: string[];
        PESEL?: string[];
        bankAccountNumber?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignUpResponse =
  | { success: true; userId: number }
  | { success: false; errorField: string; errorMessage: string };

export async function signUp(state: SignUpFormState, formData: FormData) {
  const firstNameRaw = formData.get('firstName') as string | null;
  const firstNameFormatted = firstNameRaw !== null ? capitalize(firstNameRaw.trim()) : null;

  const lastNameRaw = formData.get('lastName') as string | null;
  const lastNameFormatted = lastNameRaw !== null ? capitalize(lastNameRaw.trim()) : null;

  const phoneNumberRaw = formData.get('phoneNumber') as string | null;
  const phoneNumberFormatted = phoneNumberRaw?.replace(/\s+/g, '') ?? null;

  const PESELRaw = formData.get('PESEL') as string | null;
  const PESELFormatted = PESELRaw?.replace(/\s+/g, '') ?? null;

  const bankAccountNumberRaw = formData.get('bankAccountNumber') as string | null;
  const bankAccountNumberFormatted = bankAccountNumberRaw?.replace(/\s+/g, '') ?? null;

  const emailRaw = formData.get('email') as string | null;
  const emailFormatted = emailRaw?.trim() ?? null;

  const passwordRaw = formData.get('password') as string | null;
  const passwordFormatted = passwordRaw?.trim() ?? null;

  const validatedFields = SignUpFormSchema.safeParse({
    firstName: firstNameFormatted,
    lastName: lastNameFormatted,
    phoneNumber: phoneNumberFormatted,
    PESEL: PESELFormatted,
    bankAccountNumber: bankAccountNumberFormatted,
    email: emailFormatted,
    password: passwordFormatted,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, previousFormData: formData };
  }

  const userData = validatedFields.data;

  const response = await fetch('http://localhost/cashino-server/api/sign-up.php', {
    method: 'post',
    body: JSON.stringify(userData),
  });

  const responseBody: SignUpResponse = await response.json();

  if (!responseBody.success) {
    return {
      errors: { [responseBody.errorField]: [responseBody.errorMessage] },
      previousFormData: formData,
    };
  }

  await createSession(responseBody.userId);

  redirect('/');
}
