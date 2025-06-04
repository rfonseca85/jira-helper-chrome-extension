const { defineManifest } = require('@crxjs/vite-plugin');

module.exports = defineManifest({
  manifest_version: 3,
  name: 'Jira Helper',
  short_name: 'Jira Helper',
  version: '0.0.1',
  description: 'Batch create and review Jira tickets with GPT-4.1',
  options_ui: {
    page: 'index.html',
    open_in_tab: true
  },
  background: {
    service_worker: 'src/background.js',
    type: 'module'
  },
  permissions: ['storage', 'scripting'],
  host_permissions: ['<all_urls>'],
  action: {
    default_title: 'Open Jira Helper',
    default_icon: {
      16: 'icon-16.png',
      48: 'icon-48.png',
      128: 'icon-128.png'
    }
  },
  icons: {
    16: 'icon-16.png',
    48: 'icon-48.png',
    128: 'icon-128.png'
  }
});
