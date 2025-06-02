const { defineManifest } = require('@crxjs/vite-plugin');

module.exports = defineManifest({
  manifest_version: 3,
  name: 'Jira Helper',
  version: '0.0.1',
  description: 'Batch create and review Jira tickets with GPT-4.1',
  options_ui: {
    page: 'index.html',
    open_in_tab: true
  },
  permissions: ['storage', 'scripting'],
  host_permissions: ['<all_urls>'],
  action: {
    default_title: 'Jira Helper',
    default_popup: 'popup.html'
  }
  // No icons for now
});
