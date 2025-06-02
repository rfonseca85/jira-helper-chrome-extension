# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Jira Helper Chrome Extension

A Chrome extension to batch create and review Jira tickets with GPT-4.1, built with Vite, React, and crxjs.

## Features
- Batch ticket creation (title, description, type, etc.)
- Review ticket content with GPT-4.1
- Create all tickets via Jira API
- Settings for Jira and OpenAI API keys
- Hot reload during development

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Start development server with hot reload:**
   ```bash
   npm run dev
   ```
3. **Load the extension in Chrome:**
   - Build the extension: `npm run build`
   - Go to `chrome://extensions/`, enable Developer Mode
   - Click "Load unpacked" and select the `dist` folder

## Project Structure
- `src/` - React SPA for options page
- `manifest.config.ts` - Chrome extension manifest config
- `vite.config.ts` - Vite + crxjs config

## Storage
- Uses Chrome local storage for config and drafts

## API Keys
- Set your Jira and OpenAI API keys in the Settings section of the options page
