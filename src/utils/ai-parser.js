/**
 * Utilities for parsing OpenAI responses
 */
import { TICKET_TYPES } from './constants';

/**
 * Parse the OpenAI response to extract ticket information
 * @param {string} content - The content from OpenAI response
 * @returns {Array} The parsed tickets
 */
export const parseGeneratedTickets = (content) => {
  try {
    // Parse the response to extract tickets
    const ticketBlocks = content
      .split(/Ticket \d+/)
      .filter((block) => block.trim());

    return ticketBlocks.map((block) => {
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
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return [];
  }
};

/**
 * Parse improved ticket data from OpenAI response
 * @param {string} content - The content from OpenAI response
 * @returns {Object|null} The parsed title and description, or null if parsing failed
 */
export const parseImprovedTicket = (content) => {
  try {
    const match = content.match(/Title:(.*)\nDescription:(.*)/s);
    if (match) {
      return {
        title: match[1].trim(),
        description: match[2].trim()
      };
    }
    return null;
  } catch (error) {
    console.error('Error parsing improved ticket data:', error);
    return null;
  }
};
