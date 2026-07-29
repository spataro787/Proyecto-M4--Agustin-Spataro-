import { useContext } from 'react';
import { AuthContext } from '../features/auth/AuthContext';
import type { AuthContextType } from '../features/auth/AuthContext';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
}
export default useAuth;
