import { useState, useEffect } from 'react';
import './App.css';

const TICKET_TYPES = ['Task', 'Bug', 'Story', 'Epic'];

// Icons as SVG components
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const GenerateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M2 12h20" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

const JiraLogo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.5 0H11.5C11.5 3 14 5.5 17 5.5H18.75V7.25C18.75 10.25 21.25 12.75 24.25 12.75V1.75C24.25 0.75 23.5 0 23.5 0Z"
      fill="#2684FF"
    />
    <path
      d="M17.5 6H5.5C5.5 9 8 11.5 11 11.5H12.75V13.25C12.75 16.25 15.25 18.75 18.25 18.75V7.75C18.25 6.75 17.5 6 17.5 6Z"
      fill="#2684FF"
    />
    <path
      d="M11.5 12H0C0 15 2.5 17.5 5.5 17.5H7.25V19.25C7.25 22.25 9.75 24.75 12.75 24.75V13.75C12.75 12.75 12 12 11.5 12Z"
      fill="#2684FF"
    />
  </svg>
);

function App() {
  const [tickets, setTickets] = useState([]);
  const [settings, setSettings] = useState({
    jiraApiKey: '',
    jiraEndpoint: '',
    openAIApiKey: ''
  });
  const [activeTab, setActiveTab] = useState('generate');
  const [status, setStatus] = useState('');
  const [generationInput, setGenerationInput] = useState('');
  const [generatedTickets, setGeneratedTickets] = useState([]);

  // Get current username
  const username = 'User';

  // Set document title
  useEffect(() => {
    document.title = 'Generate Tickets';
  }, []);

  // Load settings from chrome.storage.local on mount
  useEffect(() => {
    if (window.chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(
        ['jiraApiKey', 'jiraEndpoint', 'openAIApiKey'],
        (result) => {
          setSettings({
            jiraApiKey: result.jiraApiKey || '',
            jiraEndpoint: result.jiraEndpoint || '',
            openAIApiKey: result.openAIApiKey || ''
          });
        }
      );
    }
  }, []);

  // Save settings to chrome.storage.local on change
  useEffect(() => {
    if (window.chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(settings);
    }
  }, [settings]);

  const addTicket = () => {
    setTickets([
      ...tickets,
      {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        type: TICKET_TYPES[0]
      }
    ]);
  };

  const updateTicket = (id, field, value) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const updateGeneratedTicket = (id, field, value) => {
    setGeneratedTickets(
      generatedTickets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  // Call OpenAI API to improve ticket
  const reviewWithGPT = async (id) => {
    setStatus('Reviewing with GPT-4.1...');
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket || !settings.openAIApiKey) {
      setStatus('Missing OpenAI API key or ticket data.');
      return;
    }
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.openAIApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that improves Jira ticket titles and descriptions.'
            },
            {
              role: 'user',
              content: `Title: ${ticket.title}\nDescription: ${ticket.description}\nImprove both for clarity and conciseness.`
            }
          ],
          max_tokens: 400
        })
      });
      const data = await res.json();
      if (
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        // Expecting: Title: ...\nDescription: ...
        const improved = data.choices[0].message.content;
        const match = improved.match(/Title:(.*)\nDescription:(.*)/s);
        if (match) {
          setTickets(
            tickets.map((t) =>
              t.id === id
                ? { ...t, title: match[1].trim(), description: match[2].trim() }
                : t
            )
          );
          setStatus('Improved with GPT-4.1!');
        } else {
          setStatus('Could not parse GPT-4.1 response.');
        }
      } else {
        setStatus('No response from GPT-4.1.');
      }
    } catch (e) {
      setStatus('Error contacting OpenAI API.');
    }
  };

  // Call OpenAI API to improve generated ticket
  const improveGeneratedTicket = async (id) => {
    setStatus('Improving ticket with GPT-4.1...');
    const ticket = generatedTickets.find((t) => t.id === id);
    if (!ticket || !settings.openAIApiKey) {
      setStatus('Missing OpenAI API key or ticket data.');
      return;
    }
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.openAIApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that improves Jira ticket titles and descriptions to follow the best Scrum practices.'
            },
            {
              role: 'user',
              content: `Title: ${ticket.title}\nDescription: ${ticket.description}\nImprove both for clarity, conciseness, and following the best Scrum practices.`
            }
          ],
          max_tokens: 400
        })
      });
      const data = await res.json();
      if (
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        // Expecting: Title: ...\nDescription: ...
        const improved = data.choices[0].message.content;
        const match = improved.match(/Title:(.*)\nDescription:(.*)/s);
        if (match) {
          setGeneratedTickets(
            generatedTickets.map((t) =>
              t.id === id
                ? { ...t, title: match[1].trim(), description: match[2].trim() }
                : t
            )
          );
          setStatus('Improved with GPT-4.1!');
        } else {
          setStatus('Could not parse GPT-4.1 response.');
        }
      } else {
        setStatus('No response from GPT-4.1.');
      }
    } catch (e) {
      setStatus('Error contacting OpenAI API.');
    }
  };

  // Generate tickets from input text
  const generateTickets = async () => {
    if (!generationInput.trim()) {
      setStatus(
        'Please enter a description or bullet points to generate tickets from.'
      );
      return;
    }

    if (!settings.openAIApiKey) {
      setStatus('Missing OpenAI API key. Please configure it in Settings.');
      return;
    }

    setStatus('Generating tickets with GPT-4.1...');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.openAIApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are a Scrum expert that creates well-structured Jira tickets. Generate 3-7 tickets based on the input, following best practices for task creation (clear title, actionable description, concise wording). Format each ticket as "Ticket 1\nTitle: <title>\nDescription: <description>\nType: <type>", where type is one of: Task, Bug, Story, Epic. Choose the most appropriate type for each ticket.'
            },
            {
              role: 'user',
              content: `Generate well-structured Scrum tickets based on this input:\n\n${generationInput}`
            }
          ],
          max_tokens: 1500
        })
      });

      const data = await res.json();

      if (
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        const content = data.choices[0].message.content;

        // Parse the response to extract tickets
        const ticketBlocks = content
          .split(/Ticket \d+/)
          .filter((block) => block.trim());

        const newTickets = ticketBlocks.map((block) => {
          const titleMatch = block.match(/Title:\s*(.*?)(?:\n|$)/);
          const descriptionMatch = block.match(
            /Description:\s*([\s\S]*?)(?:\nType:|$)/
          );
          const typeMatch = block.match(/Type:\s*(.*?)(?:\n|$)/);

          return {
            id: crypto.randomUUID(),
            title: titleMatch ? titleMatch[1].trim() : '',
            description: descriptionMatch ? descriptionMatch[1].trim() : '',
            type:
              typeMatch && TICKET_TYPES.includes(typeMatch[1].trim())
                ? typeMatch[1].trim()
                : TICKET_TYPES[0]
          };
        });

        setGeneratedTickets(newTickets);
        setStatus(`Generated ${newTickets.length} tickets!`);
      } else {
        setStatus('No response from GPT-4.1.');
      }
    } catch (e) {
      console.error(e);
      setStatus('Error contacting OpenAI API.');
    }
  };

  // Create a single ticket in Jira
  const createTicketInJira = async (ticket) => {
    setStatus('Creating ticket in Jira...');
    if (!settings.jiraApiKey || !settings.jiraEndpoint) {
      setStatus('Missing Jira API key or endpoint.');
      return;
    }

    try {
      const res = await fetch(settings.jiraEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${settings.jiraApiKey}`
        },
        body: JSON.stringify({
          fields: {
            summary: ticket.title,
            description: ticket.description,
            issuetype: { name: ticket.type },
            project: { key: 'PROJECT' } // TODO: let user configure project key
          }
        })
      });

      if (res.ok) {
        setStatus('Ticket created successfully!');
      } else {
        setStatus('Failed to create ticket in Jira.');
      }
    } catch (e) {
      setStatus('Error contacting Jira API.');
    }
  };

  // Create all tickets in Jira
  const createAllTickets = async () => {
    setStatus('Creating tickets in Jira...');
    if (!settings.jiraApiKey || !settings.jiraEndpoint) {
      setStatus('Missing Jira API key or endpoint.');
      return;
    }
    let success = 0;
    let fail = 0;
    for (const ticket of tickets) {
      try {
        const res = await fetch(settings.jiraEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${settings.jiraApiKey}`
          },
          body: JSON.stringify({
            fields: {
              summary: ticket.title,
              description: ticket.description,
              issuetype: { name: ticket.type },
              project: { key: 'PROJECT' } // TODO: let user configure project key
            }
          })
        });
        if (res.ok) {
          success++;
        } else {
          fail++;
        }
      } catch (e) {
        fail++;
      }
    }
    setStatus(`Created: ${success}, Failed: ${fail}`);
  };

  // Create all generated tickets in Jira
  const createAllGeneratedTickets = async () => {
    setStatus('Creating tickets in Jira...');
    if (!settings.jiraApiKey || !settings.jiraEndpoint) {
      setStatus('Missing Jira API key or endpoint.');
      return;
    }
    let success = 0;
    let fail = 0;
    for (const ticket of generatedTickets) {
      try {
        const res = await fetch(settings.jiraEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${settings.jiraApiKey}`
          },
          body: JSON.stringify({
            fields: {
              summary: ticket.title,
              description: ticket.description,
              issuetype: { name: ticket.type },
              project: { key: 'PROJECT' } // TODO: let user configure project key
            }
          })
        });
        if (res.ok) {
          success++;
        } else {
          fail++;
        }
      } catch (e) {
        fail++;
      }
    }
    setStatus(`Created: ${success}, Failed: ${fail}`);
  };

  const updateSettings = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Clear all generated tickets
  const clearGeneratedTickets = () => {
    setGeneratedTickets([]);
    setStatus('All generated tickets cleared.');
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <JiraLogo />
          <span style={{ marginLeft: '10px' }}>Jira Helper</span>
        </div>
        <div className="nav-items">
          <div
            className={`nav-item ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveTab('generate')}
          >
            <span className="nav-icon">
              <GenerateIcon />
            </span>
            Generate Tickets
          </div>
          <div
            className={`nav-item ${activeTab === 'tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('tickets')}
          >
            <span className="nav-icon">
              <HomeIcon />
            </span>
            Home
          </div>
          <div
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon">
              <SettingsIcon />
            </span>
            Settings
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="greeting">
            {getGreeting()}, {username}
          </h1>
        </div>

        {status && (
          <div className="card" style={{ marginBottom: '1em' }}>
            {status}
          </div>
        )}

        {activeTab === 'generate' && (
          <>
            <div className="card">
              <h2 className="card-title">Generate Scrum Tickets</h2>
              <p style={{ marginBottom: '1rem' }}>
                Enter a project description, problem statement, or bullet points
                to generate well-structured Scrum tickets.
              </p>

              <div className="form-group">
                <textarea
                  className="form-textarea"
                  placeholder="Paste or write a description of your project, problem, or a list of bullet points..."
                  value={generationInput}
                  onChange={(e) => setGenerationInput(e.target.value)}
                  style={{ minHeight: '150px' }}
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={generateTickets}
                style={{ width: '100%' }}
              >
                Generate Tickets
              </button>
            </div>

            {generatedTickets.length > 0 && (
              <>
                <div className="tickets-list">
                  {generatedTickets.map((ticket) => (
                    <div key={ticket.id} className="ticket-card">
                      <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                          className="form-input"
                          type="text"
                          value={ticket.title}
                          onChange={(e) =>
                            updateGeneratedTicket(
                              ticket.id,
                              'title',
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                          className="form-textarea"
                          value={ticket.description}
                          onChange={(e) =>
                            updateGeneratedTicket(
                              ticket.id,
                              'description',
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Type</label>
                        <select
                          className="form-select"
                          value={ticket.type}
                          onChange={(e) =>
                            updateGeneratedTicket(
                              ticket.id,
                              'type',
                              e.target.value
                            )
                          }
                        >
                          {TICKET_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          marginTop: '10px'
                        }}
                      >
                        <button
                          className="btn btn-primary"
                          onClick={() => createTicketInJira(ticket)}
                          style={{ flex: 1 }}
                        >
                          Create on Jira
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => improveGeneratedTicket(ticket.id)}
                          style={{ flex: 1 }}
                        >
                          Improve Title & Description
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{ display: 'flex', gap: '10px', marginTop: '20px' }}
                >
                  <button
                    className="btn btn-success"
                    onClick={createAllGeneratedTickets}
                  >
                    Batch Create All
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={clearGeneratedTickets}
                  >
                    Clear All
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'tickets' && (
          <>
            <button className="add-ticket-btn" onClick={addTicket}>
              <PlusIcon /> Add Ticket
            </button>

            <div className="tickets-list">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Ticket title"
                      value={ticket.title}
                      onChange={(e) =>
                        updateTicket(ticket.id, 'title', e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Ticket description"
                      value={ticket.description}
                      onChange={(e) =>
                        updateTicket(ticket.id, 'description', e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      value={ticket.type}
                      onChange={(e) =>
                        updateTicket(ticket.id, 'type', e.target.value)
                      }
                    >
                      {TICKET_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => reviewWithGPT(ticket.id)}
                  >
                    Review with GPT-4.1
                  </button>
                </div>
              ))}
            </div>

            {tickets.length > 0 && (
              <button className="btn btn-success" onClick={createAllTickets}>
                Create All
              </button>
            )}
          </>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h2 className="card-title">API Configuration</h2>

            <div className="form-group">
              <label className="form-label">Jira API Key</label>
              <input
                className="form-input"
                type="text"
                value={settings.jiraApiKey}
                onChange={(e) => updateSettings('jiraApiKey', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Jira Endpoint</label>
              <input
                className="form-input"
                type="text"
                value={settings.jiraEndpoint}
                onChange={(e) => updateSettings('jiraEndpoint', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">OpenAI API Key</label>
              <input
                className="form-input"
                type="text"
                value={settings.openAIApiKey}
                onChange={(e) => updateSettings('openAIApiKey', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
