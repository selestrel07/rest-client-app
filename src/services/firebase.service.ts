import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { handleFirebaseError } from './firebase-error-handler';

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGE_SENDER_ID,
  appId: process.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const registerUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      email,
      authProvider: 'local',
    });
    return user;
  } catch (error) {
    handleFirebaseError(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    handleFirebaseError(error);
  }
};
