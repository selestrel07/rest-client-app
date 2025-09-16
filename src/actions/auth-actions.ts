'use server';

import {
  loginWithEmailAndPassword,
  registerUserWithEmailAndPassword,
} from '../services/firebase.service';
import { cookies } from 'next/headers';
import { User } from '@firebase/auth';
import { UserAuth } from '@types';
import { getToken } from '@utils/getAuthToken';

export async function loginUser({ email, password }: UserAuth) {
  return await processUserAuth(() =>
    loginWithEmailAndPassword(email, password)
  );
}

export async function registerUser({ email, password }: UserAuth) {
  return await processUserAuth(() =>
    registerUserWithEmailAndPassword(email, password)
  );
}

export async function processUserAuth(func: () => Promise<User | undefined>) {
  try {
    const user = await func();
    if (user) {
      await addAuthCookie(user);
    }
    return { success: true };
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, errorMessage };
  }
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('authToken');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return getToken(cookieStore) !== undefined;
}

async function addAuthCookie(user: User) {
  const cookieStore = await cookies();
  user.getIdToken(false).then((idToken) => {
    cookieStore.set('authToken', idToken, {
      httpOnly: true,
      maxAge: 3600,
    });
  });
}
