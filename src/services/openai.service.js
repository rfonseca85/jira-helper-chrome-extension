/**
 * Service for handling OpenAI API requests
 */

/**
 * Generates tickets based on input text
 * @param {string} input - The input description or bullet points
 * @param {string} apiKey - The OpenAI API key
 * @returns {Promise<Object>} The response from OpenAI
 */
export const generateTicketsWithAI = async (input, apiKey) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a Scrum expert that creates well-structured Jira tickets.\n' +
              'Generate all tickets based on the input, following best practices for task creation:\n' +
              '- Clear and concise titles\n' +
              '- Actionable descriptions\n' +
              '- Specific acceptance criteria\n' +
              '- If you receive a list of bullet points, generate a ticket for each bullet point\n' +
              '- If you recieve a list of tasks, one ticket for each task\n' +
              '- If you receive a list, one per line, one ticket for each line\n' +
              '- Appropriate level of detail\n\n' +
              'Format each ticket as:\n' +
              'Ticket 1\n' +
              'Title: <title>\n' +
              'Description: <description>'
          },
          {
            role: 'user',
            content: `Generate well-structured Scrum tickets based on this input:\n\n${input}`
          }
        ],
        max_tokens: 1500
      })
    });

    return await response.json();
  } catch (error) {
    console.error('Error contacting OpenAI API:', error);
    throw error;
  }
};

/**
 * Improves a ticket's title and description
 * @param {Object} ticket - The ticket to improve
 * @param {string} apiKey - The OpenAI API key
 * @param {boolean} isScrum - Whether to follow Scrum practices
 * @returns {Promise<Object>} The response from OpenAI
 */
export const improveTicketWithAI = async (ticket, apiKey, isScrum = false) => {
  try {
    const systemContent = isScrum
      ? 'You are a helpful assistant that improves Jira ticket titles and descriptions to follow the best Scrum practices.'
      : 'You are a helpful assistant that improves Jira ticket titles and descriptions.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemContent
          },
          {
            role: 'user',
            content: `Title: ${ticket.title}\nDescription: ${
              ticket.description
            }\nImprove both for clarity${
              isScrum
                ? ', conciseness, and following the best Scrum practices'
                : ' and conciseness'
            }.`
          }
        ],
        max_tokens: 400
      })
    });

    return await response.json();
  } catch (error) {
    console.error('Error contacting OpenAI API:', error);
    throw error;
  }
};
