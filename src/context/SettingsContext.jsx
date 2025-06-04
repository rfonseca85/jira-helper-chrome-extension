import { createContext, useState, useContext, useEffect } from 'react';
import { getSettings, saveSettings } from '../services/storage.service';
import { SETTINGS_KEYS, DEFAULT_MODEL } from '../utils/constants';

// Create context
const SettingsContext = createContext();

/**
 * Provider component for settings context
 * @param {Object} props - Component props
 * @returns {JSX.Element} Settings provider component
 */
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    // Jira Settings
    [SETTINGS_KEYS.JIRA_API_KEY]: '',
    [SETTINGS_KEYS.JIRA_ENDPOINT]: '',
    [SETTINGS_KEYS.JIRA_PROJECT_KEY]: '',
    [SETTINGS_KEYS.JIRA_USERNAME]: '',

    // AI Settings
    [SETTINGS_KEYS.OPENAI_API_KEY]: '',
    [SETTINGS_KEYS.OPENAI_MODEL]: DEFAULT_MODEL
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await getSettings(Object.values(SETTINGS_KEYS));
        setSettings((prev) => ({
          ...prev,
          ...storedSettings
        }));
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings on change
  useEffect(() => {
    if (!isLoading) {
      saveSettings(settings);
    }
  }, [settings, isLoading]);

  /**
   * Update a single setting
   * @param {string} key - The setting key
   * @param {string} value - The new value
   */
  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        isLoading
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Custom hook to use settings context
 * @returns {Object} Settings context value
 */
export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};

export default SettingsContext;
