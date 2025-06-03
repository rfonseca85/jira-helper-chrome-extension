/**
 * Service for handling browser storage operations
 */

/**
 * Get settings from storage
 * @param {Array} keys - The settings keys to retrieve
 * @returns {Promise<Object>} The retrieved settings
 */
export const getSettings = async (
  keys = ['jiraApiKey', 'jiraEndpoint', 'openAIApiKey']
) => {
  return new Promise((resolve) => {
    if (window.chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(keys, (result) => {
        const settings = {};
        keys.forEach((key) => {
          settings[key] = result[key] || '';
        });
        resolve(settings);
      });
    } else {
      // Fallback to localStorage if chrome.storage is not available
      const settings = {};
      keys.forEach((key) => {
        settings[key] = localStorage.getItem(key) || '';
      });
      resolve(settings);
    }
  });
};

/**
 * Save settings to storage
 * @param {Object} settings - The settings to save
 * @returns {Promise<void>}
 */
export const saveSettings = async (settings) => {
  return new Promise((resolve) => {
    if (window.chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(settings, resolve);
    } else {
      // Fallback to localStorage if chrome.storage is not available
      Object.entries(settings).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      resolve();
    }
  });
};
