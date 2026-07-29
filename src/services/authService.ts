import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import type { UserProfile } from '../types/auth';

/**
 * Maps a Firebase User object to our clean client-side UserProfile interface.
 */
export function mapFirebaseUser(user: FirebaseUser): UserProfile {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

/**
 * Registers a new user with email, password, and displayName.
 */
export async function registerWithEmail(email: string, password: string, displayName: string): Promise<UserProfile> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Set the displayName on the Firebase Auth user object
  await updateProfile(userCredential.user, { displayName });
  
  // Reload user to sync updated profile
  await userCredential.user.reload();
  const updatedUser = auth.currentUser;
  
  if (!updatedUser) {
    throw new Error('No se pudo recuperar el perfil del usuario después del registro.');
  }
  
  return mapFirebaseUser(updatedUser);
}

/**
 * Logs in an existing user with email and password.
 */
export async function loginWithEmail(email: string, password: string): Promise<UserProfile> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(userCredential.user);
}

/**
 * Authenticates a user using Firebase Google Auth popup.
 */
export async function loginWithGoogle(): Promise<UserProfile> {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return mapFirebaseUser(userCredential.user);
}

/**
 * Logs out the currently active user session.
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}
