import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message-container" role="alert">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <p className="error-text">{message}</p>
      </div>
      {onClose && (
        <button type="button" className="error-close-btn" onClick={onClose} aria-label="Cerrar error">
          &times;
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
