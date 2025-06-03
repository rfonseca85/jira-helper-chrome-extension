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
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a Scrum expert that creates well-structured Jira tickets. Generate 3-7 tickets based on the input, following best practices for task creation (clear title, actionable description, concise wording). Format each ticket as "Ticket 1\nTitle: <title>\nDescription: <description>\nType: <type>", where type is one of: Task, Bug, Story, Epic. Choose the most appropriate type for each ticket.'
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
        model: 'gpt-4o',
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
