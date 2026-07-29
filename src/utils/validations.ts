/**
 * Validates whether an email string has a correct format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength rules.
 * Returns an error message if invalid, or null if valid.
 */
export function validatePassword(password: string): string | null {
  if (!password) {
    return 'La contraseña es obligatoria.';
  }
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return null;
}
