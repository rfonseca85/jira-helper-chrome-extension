import { SettingsIcon, GenerateIcon, JiraLogo } from '../ui/Icons';
import { TABS } from '../../utils/constants';

/**
 * Sidebar navigation component
 * @param {Object} props - Component props
 * @param {string} props.activeTab - The currently active tab
 * @param {Function} props.setActiveTab - Function to set the active tab
 * @returns {JSX.Element} Sidebar component
 */
const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <JiraLogo />
        <span style={{ marginLeft: '10px' }}>Jira Helper</span>
      </div>
      <div className="nav-items">
        <div
          className={`nav-item ${activeTab === TABS.GENERATE ? 'active' : ''}`}
          onClick={() => setActiveTab(TABS.GENERATE)}
        >
          <span className="nav-icon">
            <GenerateIcon />
          </span>
          Generate Tickets
        </div>
        <div
          className={`nav-item ${activeTab === TABS.SETTINGS ? 'active' : ''}`}
          onClick={() => setActiveTab(TABS.SETTINGS)}
        >
          <span className="nav-icon">
            <SettingsIcon />
          </span>
          Settings
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
