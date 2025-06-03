import { SETTINGS_KEYS } from '../../utils/constants';

/**
 * Settings tab component for managing API settings
 * @param {Object} props - Component props
 * @param {Object} props.settings - The current settings
 * @param {Function} props.updateSetting - Function to update a setting
 * @returns {JSX.Element} Settings tab component
 */
const SettingsTab = ({ settings, updateSetting }) => {
  return (
    <div className="card">
      <h2 className="card-title">API Configuration</h2>

      <div className="form-group">
        <label className="form-label">Jira API Key</label>
        <input
          className="form-input"
          type="text"
          value={settings[SETTINGS_KEYS.JIRA_API_KEY]}
          onChange={(e) =>
            updateSetting(SETTINGS_KEYS.JIRA_API_KEY, e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label className="form-label">Jira Endpoint</label>
        <input
          className="form-input"
          type="text"
          value={settings[SETTINGS_KEYS.JIRA_ENDPOINT]}
          onChange={(e) =>
            updateSetting(SETTINGS_KEYS.JIRA_ENDPOINT, e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label className="form-label">OpenAI API Key</label>
        <input
          className="form-input"
          type="text"
          value={settings[SETTINGS_KEYS.OPENAI_API_KEY]}
          onChange={(e) =>
            updateSetting(SETTINGS_KEYS.OPENAI_API_KEY, e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default SettingsTab;
