import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Status alert component that displays messages until replaced
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display
 * @param {string} props.type - The type of alert (success, error, info, warning)
 * @param {Function} props.onDismiss - Function called when alert is dismissed
 * @returns {JSX.Element|null} Status alert component
 */
const StatusAlert = ({ message, type = 'info', onDismiss = () => {} }) => {
  const [visible, setVisible] = useState(!!message);
  const [exit, setExit] = useState(false);

  // Show alert when message changes
  useEffect(() => {
    if (message) {
      setVisible(true);
      setExit(false);
    } else {
      setVisible(false);
    }
  }, [message]);

  if (!visible || !message) return null;

  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'error':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 'warning':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default: // info
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  return (
    <div className={`status-alert ${type} ${exit ? 'exit' : ''}`}>
      <div className="status-alert-icon">{getIcon()}</div>
      <div className="status-alert-content">{message}</div>
      <button
        className="status-alert-close"
        onClick={() => {
          setExit(true);
          setTimeout(() => {
            setVisible(false);
            onDismiss();
          }, 300);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

StatusAlert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  onDismiss: PropTypes.func
};

export default StatusAlert;
