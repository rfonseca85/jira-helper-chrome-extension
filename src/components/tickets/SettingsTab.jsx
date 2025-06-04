import { SETTINGS_KEYS, AI_MODELS } from '../../utils/constants';

/**
 * Settings tab component for managing API settings
 * @param {Object} props - Component props
 * @param {Object} props.settings - The current settings
 * @param {Function} props.updateSetting - Function to update a setting
 * @returns {JSX.Element} Settings tab component
 */
const SettingsTab = ({ settings, updateSetting }) => {
  return (
    <>
      {/* AI Settings Section */}
      <div className="card settings-section">
        <h2 className="card-title">AI Configuration</h2>
        <p className="settings-description">
          Configure your OpenAI API settings to generate and improve tickets.
        </p>

        <div className="form-group">
          <label className="form-label">OpenAI API Key</label>
          <input
            className="form-input"
            type="password"
            placeholder="sk-..."
            value={settings[SETTINGS_KEYS.OPENAI_API_KEY]}
            onChange={(e) =>
              updateSetting(SETTINGS_KEYS.OPENAI_API_KEY, e.target.value)
            }
          />
          <small className="form-hint">
            Your OpenAI API key is required to generate and improve tickets. Get
            one at{' '}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Platform
            </a>
            .
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">AI Model</label>
          <select
            className="form-select"
            value={settings[SETTINGS_KEYS.OPENAI_MODEL] || AI_MODELS[0].id}
            onChange={(e) =>
              updateSetting(SETTINGS_KEYS.OPENAI_MODEL, e.target.value)
            }
          >
            {AI_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <small className="form-hint">
            Select the AI model to use. GPT-4 models provide better results but
            may cost more.
          </small>
        </div>
      </div>

      {/* Jira Settings Section */}
      <div className="card settings-section">
        <h2 className="card-title">Jira Configuration</h2>
        <p className="settings-description">
          Configure your Jira API settings to create tickets in your Jira
          instance.
        </p>

        <div className="form-group">
          <label className="form-label">Jira API Key</label>
          <input
            className="form-input"
            type="password"
            placeholder="Your Jira API key or token"
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
            placeholder="https://your-domain.atlassian.net/rest/api/2"
            value={settings[SETTINGS_KEYS.JIRA_ENDPOINT]}
            onChange={(e) =>
              updateSetting(SETTINGS_KEYS.JIRA_ENDPOINT, e.target.value)
            }
          />
          <small className="form-hint">
            The base URL for your Jira REST API.
          </small>
        </div>

        <div className="form-group">
          <label className="form-label">Jira Username/Email</label>
          <input
            className="form-input"
            type="text"
            placeholder="your.email@example.com"
            value={settings[SETTINGS_KEYS.JIRA_USERNAME]}
            onChange={(e) =>
              updateSetting(SETTINGS_KEYS.JIRA_USERNAME, e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Jira Project Key</label>
          <input
            className="form-input"
            type="text"
            placeholder="PROJ"
            value={settings[SETTINGS_KEYS.JIRA_PROJECT_KEY]}
            onChange={(e) =>
              updateSetting(SETTINGS_KEYS.JIRA_PROJECT_KEY, e.target.value)
            }
          />
          <small className="form-hint">
            The project key where tickets will be created (e.g., PROJ, TEST).
          </small>
        </div>
      </div>
    </>
  );
};

export default SettingsTab;
