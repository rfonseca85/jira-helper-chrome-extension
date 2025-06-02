import { useState, useEffect } from 'react';
import './App.css';

const TICKET_TYPES = ['Task', 'Bug', 'Story', 'Epic'];

function App() {
  const [tickets, setTickets] = useState([]);
  const [settings, setSettings] = useState({
    jiraApiKey: '',
    jiraEndpoint: '',
    openAIApiKey: ''
  });
  const [activeTab, setActiveTab] = useState('tickets');
  const [status, setStatus] = useState('');

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

  const updateSettings = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="jira-helper-root">
      <header>
        <h1>Jira Helper</h1>
        <nav>
          <button
            onClick={() => setActiveTab('tickets')}
            className={activeTab === 'tickets' ? 'active' : ''}
          >
            Tickets
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={activeTab === 'settings' ? 'active' : ''}
          >
            Settings
          </button>
        </nav>
      </header>
      {status && (
        <div style={{ marginBottom: '1em', color: '#646cff' }}>{status}</div>
      )}
      {activeTab === 'tickets' && (
        <section>
          <button onClick={addTicket}>Add Ticket</button>
          <div className="tickets-list">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <input
                  type="text"
                  placeholder="Title"
                  value={ticket.title}
                  onChange={(e) =>
                    updateTicket(ticket.id, 'title', e.target.value)
                  }
                />
                <textarea
                  placeholder="Description"
                  value={ticket.description}
                  onChange={(e) =>
                    updateTicket(ticket.id, 'description', e.target.value)
                  }
                />
                <select
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
                <button onClick={() => reviewWithGPT(ticket.id)}>
                  Review with GPT-4.1
                </button>
              </div>
            ))}
          </div>
          {tickets.length > 0 && (
            <button className="create-all" onClick={createAllTickets}>
              Create All
            </button>
          )}
        </section>
      )}
      {activeTab === 'settings' && (
        <section className="settings-section">
          <h2>Settings</h2>
          <label>
            Jira API Key
            <input
              type="text"
              value={settings.jiraApiKey}
              onChange={(e) => updateSettings('jiraApiKey', e.target.value)}
            />
          </label>
          <label>
            Jira Endpoint
            <input
              type="text"
              value={settings.jiraEndpoint}
              onChange={(e) => updateSettings('jiraEndpoint', e.target.value)}
            />
          </label>
          <label>
            OpenAI API Key
            <input
              type="text"
              value={settings.openAIApiKey}
              onChange={(e) => updateSettings('openAIApiKey', e.target.value)}
            />
          </label>
        </section>
      )}
    </div>
  );
}

export default App;
