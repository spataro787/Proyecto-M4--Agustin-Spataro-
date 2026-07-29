export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}
