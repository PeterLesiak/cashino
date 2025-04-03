export type UserRequest = { sessionId: number };

export type UserResponse =
  | { success: true; user: User }
  | { success: false; errorField: string; errorMessage: string };

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  PESEL: string;
  bankAccountNumber: string;
  email: string;
  password: string;
  admin: 0 | 1;
};
