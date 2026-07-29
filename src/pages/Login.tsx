import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginWithEmail, loginWithGoogle } from '../services/authService';
import { isValidEmail } from '../utils/validations';
import ErrorMessage from '../components/ErrorMessage';

export const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate('/tasks', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
      navigate('/tasks');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Por favor, intenta más tarde.');
      } else {
        setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      navigate('/tasks');
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Ocurrió un error al iniciar sesión con Google.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return null; 
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar Sesión</h2>
        <p className="auth-subtitle">Gestiona tus tareas de forma estratégica</p>
        
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        <div className="auth-divider">
          <span>O</span>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className="btn-google" 
          disabled={isSubmitting}
        >
          <span className="google-icon">G</span> Iniciar con Google
        </button>

        <p className="auth-redirect">
          ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
