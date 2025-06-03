/**
 * Header component with greeting and status message
 * @param {Object} props - Component props
 * @param {string} props.username - The username to display in greeting
 * @param {string} props.status - Status message to display
 * @returns {JSX.Element} Header component
 */
const Header = ({ username, status }) => {
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

      {status && (
        <div className="card" style={{ marginBottom: '1em' }}>
          {status}
        </div>
      )}
    </>
  );
};

export default Header;
