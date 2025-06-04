/**
 * Constants used throughout the application
 */

// Ticket types available for selection
export const TICKET_TYPES = ['Task', 'Bug', 'Story', 'Epic'];

// Available AI models
export const AI_MODELS = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'gpt-4o', name: 'GPT-4o (Recommended)' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' }
];

// Default API model to use
export const DEFAULT_MODEL = 'gpt-3.5-turbo';

// Tab names for navigation
export const TABS = {
  GENERATE: 'generate',
  SETTINGS: 'settings'
};

// Settings keys
export const SETTINGS_KEYS = {
  // Jira Settings
  JIRA_API_KEY: 'jiraApiKey',
  JIRA_ENDPOINT: 'jiraEndpoint',
  JIRA_PROJECT_KEY: 'jiraProjectKey',
  JIRA_USERNAME: 'jiraUsername',

  // AI Settings
  OPENAI_API_KEY: 'openAIApiKey',
  OPENAI_MODEL: 'openAIModel'
};
