import { useState } from 'react';
import { TICKET_TYPES } from '../utils/constants';
import { improveTicketWithAI } from '../services/openai.service';
import { createTicket, createBatchTickets } from '../services/jira.service';
import { parseImprovedTicket } from '../utils/ai-parser';

/**
 * Custom hook for managing tickets
 * @param {Object} settings - The application settings (API keys, etc.)
 * @param {Function} setStatus - Function to update status message
 * @returns {Object} Ticket-related state and functions
 */
export const useTickets = (settings, setStatus) => {
  const [tickets, setTickets] = useState([]);

  /**
   * Add a new empty ticket
   */
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

  /**
   * Update a ticket's field
   * @param {string} id - The ticket ID
   * @param {string} field - The field to update
   * @param {string} value - The new value
   */
  const updateTicket = (id, field, value) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  /**
   * Review and improve a ticket with AI
   * @param {string} id - The ticket ID
   */
  const reviewWithGPT = async (id) => {
    setStatus('Reviewing with GPT-4.1...');
    const ticket = tickets.find((t) => t.id === id);

    if (!ticket || !settings.openAIApiKey) {
      setStatus('Missing OpenAI API key or ticket data.');
      return;
    }

    try {
      const response = await improveTicketWithAI(ticket, settings.openAIApiKey);

      if (
        response.choices &&
        response.choices[0] &&
        response.choices[0].message &&
        response.choices[0].message.content
      ) {
        const improved = response.choices[0].message.content;
        const parsed = parseImprovedTicket(improved);

        if (parsed) {
          setTickets(
            tickets.map((t) =>
              t.id === id
                ? { ...t, title: parsed.title, description: parsed.description }
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
    } catch (error) {
      setStatus('Error contacting OpenAI API.');
    }
  };

  /**
   * Create all tickets in Jira
   */
  const createAllTickets = async () => {
    setStatus('Creating tickets in Jira...');

    if (!settings.jiraApiKey || !settings.jiraEndpoint) {
      setStatus('Missing Jira API key or endpoint.');
      return;
    }

    try {
      const { success, fail } = await createBatchTickets(
        tickets,
        settings.jiraApiKey,
        settings.jiraEndpoint
      );

      setStatus(`Created: ${success}, Failed: ${fail}`);
    } catch (error) {
      setStatus('Error creating tickets in Jira.');
    }
  };

  return {
    tickets,
    setTickets,
    addTicket,
    updateTicket,
    reviewWithGPT,
    createAllTickets
  };
};
