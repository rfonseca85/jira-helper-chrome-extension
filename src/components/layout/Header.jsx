/**
 * Header component with greeting and status message
 * @param {Object} props - Component props
 * @param {string} props.username - The username to display in greeting
 * @param {string|Object} props.status - Status message or status object with text and type
 * @returns {JSX.Element} Header component
 */
import { useState, useEffect } from 'react';
import StatusAlert from '../ui/StatusAlert';

const Header = ({ username, status }) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('info');

  // Update status message when status prop changes
  useEffect(() => {
    if (!status) {
      setStatusMessage('');
      return;
    }

    // Handle both string status and object status formats
    if (typeof status === 'object' && status.text) {
      setStatusMessage(status.text);
      setStatusType(status.type || 'info');
    } else if (typeof status === 'string') {
      setStatusMessage(status);

      // Legacy type detection for string status
      let type = 'info';
      const lowerStatus = status.toLowerCase();
      if (
        lowerStatus.includes('success') ||
        lowerStatus.includes('created') ||
        lowerStatus.includes('generated')
      ) {
        type = 'success';
      } else if (
        lowerStatus.includes('error') ||
        lowerStatus.includes('failed')
      ) {
        type = 'error';
      } else if (lowerStatus.includes('warning')) {
        type = 'warning';
      }

      setStatusType(type);
    }
  }, [status]);

  /**
   * Get appropriate greeting based on time of day
   * @returns {string} Time-based greeting
   */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <>
      <div className="header">
        <h1 className="greeting">
          {getGreeting()}, {username}
        </h1>
      </div>

      <StatusAlert
        message={statusMessage}
        type={statusType}
        onDismiss={() => {}}
      />
    </>
  );
};

export default Header;
