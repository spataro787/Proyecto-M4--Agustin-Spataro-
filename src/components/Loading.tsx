import React from 'react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Cargando...', 
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? 'loading-container fullscreen' 
    : 'loading-container';

  return (
    <div className={containerClass}>
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <div className="spinner-glow"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
