import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">Gestor Estratégico</span>
        </div>
        <div className="navbar-user">
          {user.photoURL && (
            <img src={user.photoURL} alt={user.displayName || 'Avatar'} className="user-avatar" />
          )}
          <span className="user-email">{user.displayName || user.email}</span>
          <button onClick={logout} className="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
