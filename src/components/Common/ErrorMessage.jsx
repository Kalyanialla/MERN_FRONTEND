// src/components/Common/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-banner">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
      {onClose && (
        <button className="error-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;