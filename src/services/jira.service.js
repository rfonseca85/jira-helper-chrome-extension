/**
 * Service for handling Jira API requests
 */

/**
 * Creates a single ticket in Jira
 * @param {Object} ticket - The ticket to create
 * @param {string} apiKey - The Jira API key
 * @param {string} endpoint - The Jira API endpoint
 * @param {string} projectKey - The Jira project key
 * @returns {Promise<Response>} The response from Jira
 */
export const createTicket = async (
  ticket,
  apiKey,
  endpoint,
  projectKey = 'PROJECT'
) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        fields: {
          summary: ticket.title,
          description: ticket.description,
          issuetype: { name: ticket.type },
          project: { key: projectKey }
        }
      })
    });

    return response;
  } catch (error) {
    console.error('Error contacting Jira API:', error);
    throw error;
  }
};

/**
 * Creates multiple tickets in Jira
 * @param {Array} tickets - The tickets to create
 * @param {string} apiKey - The Jira API key
 * @param {string} endpoint - The Jira API endpoint
 * @param {string} projectKey - The Jira project key
 * @returns {Promise<Object>} Object containing success and failure counts
 */
export const createBatchTickets = async (
  tickets,
  apiKey,
  endpoint,
  projectKey = 'PROJECT'
) => {
  let success = 0;
  let fail = 0;

  for (const ticket of tickets) {
    try {
      const response = await createTicket(ticket, apiKey, endpoint, projectKey);

      if (response.ok) {
        success++;
      } else {
        fail++;
      }
    } catch (error) {
      fail++;
    }
  }

  return { success, fail };
};
