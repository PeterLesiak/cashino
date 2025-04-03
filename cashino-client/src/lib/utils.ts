import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function capitalize(input: string): string {
  return input[0].toUpperCase() + input.slice(1);
}

export function formatPhoneNumber(input: string): string {
  const raw = input.replace(/\D/g, '');

  let output = '';

  for (let i = 0; i < raw.length; i += 3) {
    if (i > 0) {
      output += ' ';
    }

    output += raw.substring(i, i + 3);
  }

  return output;
}

export function formatBankAccountNumber(input: string): string {
  const raw = input.replace(/\D/g, '');

  let output = raw.length >= 2 ? raw.substring(0, 2) : raw;

  for (let i = 2; i < raw.length; i += 4) {
    if (i > 0) {
      output += ' ';
    }

    output += raw.substring(i, i + 4);
  }

  return output;
}

export function hashStringToHue(input: string): number {
  let hash = 0;

  for (let i = 0; i < input.length; ++i) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }

  return (Math.abs(hash) + 11) % (365 + 1);
}
