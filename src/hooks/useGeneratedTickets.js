import { useState } from 'react';
import {
  generateTicketsWithAI,
  improveTicketWithAI
} from '../services/openai.service';
import { createTicket, createBatchTickets } from '../services/jira.service';
import { parseGeneratedTickets, parseImprovedTicket } from '../utils/ai-parser';

/**
 * Custom hook for managing generated tickets
 * @param {Object} settings - The application settings (API keys, etc.)
 * @param {Function} setStatus - Function to update status message
 * @returns {Object} Generated ticket-related state and functions
 */
export const useGeneratedTickets = (settings, setStatus) => {
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [generationInput, setGenerationInput] = useState('');

  /**
   * Update a generated ticket's field
   * @param {string} id - The ticket ID
   * @param {string} field - The field to update
   * @param {string} value - The new value
   */
  const updateGeneratedTicket = (id, field, value) => {
    setGeneratedTickets(
      generatedTickets.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  /**
   * Generate tickets from input text
   */
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
      const response = await generateTicketsWithAI(
        generationInput,
        settings.openAIApiKey
      );

      if (
        response.choices &&
        response.choices[0] &&
        response.choices[0].message &&
        response.choices[0].message.content
      ) {
        const content = response.choices[0].message.content;
        const newTickets = parseGeneratedTickets(content);

        setGeneratedTickets(newTickets);
        setStatus(`Generated ${newTickets.length} tickets!`);
      } else {
        setStatus('No response from GPT-4.1.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error contacting OpenAI API.');
    }
  };

  /**
   * Improve a generated ticket with AI
   * @param {string} id - The ticket ID
   */
  const improveGeneratedTicket = async (id) => {
    setStatus('Improving ticket with GPT-4.1...');
    const ticket = generatedTickets.find((t) => t.id === id);

    if (!ticket || !settings.openAIApiKey) {
      setStatus('Missing OpenAI API key or ticket data.');
      return;
    }

    try {
      const response = await improveTicketWithAI(
        ticket,
        settings.openAIApiKey,
        true
      );

      if (
        response.choices &&
        response.choices[0] &&
        response.choices[0].message &&
        response.choices[0].message.content
      ) {
        const improved = response.choices[0].message.content;
        const parsed = parseImprovedTicket(improved);

        if (parsed) {
          setGeneratedTickets(
            generatedTickets.map((t) =>
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
   * Create a single ticket in Jira
   * @param {Object} ticket - The ticket to create
   */
  const createTicketInJira = async (ticket) => {
    setStatus('Creating ticket in Jira...');

    if (!settings.jiraApiKey || !settings.jiraEndpoint) {
      setStatus('Missing Jira API key or endpoint.');
      return;
    }

    try {
      const response = await createTicket(
        ticket,
        settings.jiraApiKey,
        settings.jiraEndpoint
      );

      if (response.ok) {
        setStatus('Ticket created successfully!');
      } else {
        setStatus('Failed to create ticket in Jira.');
      }
    } catch (error) {
      setStatus('Error contacting Jira API.');
    }
  };

  /**
   * Create all generated tickets in Jira
   */
  const createAllGeneratedTickets = async () => {
    setStatus('Creating tickets in Jira...');

    if (!settings.jiraApiKey || !settings.jiraEndpoint) {
      setStatus('Missing Jira API key or endpoint.');
      return;
    }

    try {
      const { success, fail } = await createBatchTickets(
        generatedTickets,
        settings.jiraApiKey,
        settings.jiraEndpoint
      );

      setStatus(`Created: ${success}, Failed: ${fail}`);
    } catch (error) {
      setStatus('Error creating tickets in Jira.');
    }
  };

  /**
   * Clear all generated tickets
   */
  const clearGeneratedTickets = () => {
    setGeneratedTickets([]);
    setStatus('All generated tickets cleared.');
  };

  return {
    generatedTickets,
    setGeneratedTickets,
    generationInput,
    setGenerationInput,
    updateGeneratedTicket,
    generateTickets,
    improveGeneratedTicket,
    createTicketInJira,
    createAllGeneratedTickets,
    clearGeneratedTickets
  };
};
