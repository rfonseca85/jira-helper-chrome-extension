# JIRA Helper 

<div align="center">

![JIRA Helper Logo](public/icon-128.png)

**AI-Powered JIRA Ticket Generator & Manager**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-8A2BE2)](https://openai.com/)
[![Vite](https://img.shields.io/badge/Vite-2.9-yellow.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## 🚀 Overview

JIRA Helper is a powerful Chrome extension that leverages AI to streamline your JIRA workflow. Generate well-structured tickets from simple descriptions, improve ticket quality with AI, and seamlessly create them in your JIRA instance—all from a clean, intuitive interface.

![Screenshot](public/screenshot.png)

## ✨ Key Features

- **AI-Powered Ticket Generation**: Convert descriptions or bullet points into properly formatted JIRA tickets
- **Smart Ticket Improvement**: Enhance ticket titles and descriptions with AI suggestions
- **Multiple AI Models**: Choose between GPT-3.5 Turbo, GPT-4o, or GPT-4 Turbo
- **Visual Improvement Tracking**: Green borders highlight AI-improved fields
- **Status Alerts**: Clean, informative status messages keep you informed
- **Batch Creation**: Generate and create multiple tickets at once
- **Responsive Design**: Works beautifully on various screen sizes
- **Organized Settings**: Separate AI and JIRA configuration sections

## 🔧 Installation

### For Development

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/yourusername/jira-helper.git
   cd jira-helper
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Load the extension in Chrome**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder in your project directory

### For Users

1. **Build the extension**
   ```bash
   npm run build
   ```

2. **Install in Chrome**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder in your project directory

## 🔑 Configuration

1. **Open the extension** by clicking its icon in your browser
2. **Navigate to Settings** and configure:
   - **AI Settings**: Add your OpenAI API key and select your preferred model
   - **JIRA Settings**: Configure your JIRA API key, endpoint, username, and project key

## 💻 Usage

### Generating Tickets
1. Navigate to the "Generate" tab
2. Enter your project description or bullet points
3. Click "Generate Tickets"
4. Edit the generated tickets as needed
5. Use "Improve Title & Description" to enhance specific tickets
6. Create tickets individually or click "Batch Create All" to create all tickets in JIRA

## 🏗️ Project Structure

```
jira-helper/
├── public/            # Static assets
├── src/
│   ├── components/    # React components
│   │   ├── layout/    # Layout components
│   │   ├── tickets/   # Ticket-related components
│   │   └── ui/        # UI components
│   ├── context/       # React context
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   └── utils/         # Utility functions
├── manifest.config.js # Extension manifest
└── vite.config.js     # Vite configuration
```

## 🔄 Development Workflow

- **Hot Reload**: Changes to your code will automatically reload the extension
- **Component-Based**: Modular structure for easy maintenance and extension
- **Context API**: Uses React Context for state management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.

---

<div align="center">
  Made with ❤️ for more productive JIRA workflows
</div>
