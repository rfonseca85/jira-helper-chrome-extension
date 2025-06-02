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
