import { useState, useEffect } from 'react';
import './App.css';

// Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import GenerateTicketsTab from './components/tickets/GenerateTicketsTab';
import SettingsTab from './components/tickets/SettingsTab';

// Hooks
import { useGeneratedTickets } from './hooks/useGeneratedTickets';

// Context
import { SettingsProvider, useSettings } from './context/SettingsContext';

// Constants
import { TABS } from './utils/constants';

// Icons as SVG components
const SettingsIcon = () => (
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
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
  </svg>
);

const GenerateIcon = () => (
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
    <path d="M12 2v20M2 12h20" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

const JiraLogo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5 0H11.5C11.5 3 14 5.5 17 5.5H18.75V7.25C18.75 10.25 21.25 12.75 24.25 12.75V1.75C24.25 0.75 23.5 0 23.5 0Z"
      fill="#2684FF"
    />
    <path
      d="M17.5 6H5.5C5.5 9 8 11.5 11 11.5H12.75V13.25C12.75 16.25 15.25 18.75 18.25 18.75V7.75C18.25 6.75 17.5 6 17.5 6Z"
      fill="#2684FF"
    />
    <path
      d="M11.5 12H0C0 15 2.5 17.5 5.5 17.5H7.25V19.25C7.25 22.25 9.75 24.75 12.75 24.75V13.75C12.75 12.75 12 12 11.5 12Z"
      fill="#2684FF"
    />
  </svg>
);

/**
 * Main application component
 * @returns {JSX.Element} Application component
 */
function AppContent() {
  const [activeTab, setActiveTab] = useState(TABS.GENERATE);
  const [status, setStatus] = useState('');
  const { settings, updateSetting } = useSettings();

  // Get current username
  const username = 'User';

  // Set document title
  useEffect(() => {
    document.title = 'Generate Tickets';
  }, []);

  // Initialize hooks
  const {
    generatedTickets,
    generationInput,
    setGenerationInput,
    updateGeneratedTicket,
    generateTickets,
    improveGeneratedTicket,
    createTicketInJira,
    createAllGeneratedTickets,
    clearGeneratedTickets
  } = useGeneratedTickets(settings, setStatus);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="main-content">
        <Header username={username} status={status} />

        {activeTab === TABS.GENERATE && (
          <GenerateTicketsTab
            generatedTickets={generatedTickets}
            generationInput={generationInput}
            setGenerationInput={setGenerationInput}
            updateGeneratedTicket={updateGeneratedTicket}
            generateTickets={generateTickets}
            improveGeneratedTicket={improveGeneratedTicket}
            createTicketInJira={createTicketInJira}
            createAllGeneratedTickets={createAllGeneratedTickets}
            clearGeneratedTickets={clearGeneratedTickets}
          />
        )}

        {activeTab === TABS.SETTINGS && (
          <SettingsTab settings={settings} updateSetting={updateSetting} />
        )}
      </div>
    </div>
  );
}

/**
 * Application wrapper with providers
 * @returns {JSX.Element} App component with providers
 */
function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
