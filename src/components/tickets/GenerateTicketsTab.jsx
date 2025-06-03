import TicketCard from './TicketCard';

/**
 * Generate Tickets tab component for AI-generated tickets
 * @param {Object} props - Component props
 * @param {Array} props.generatedTickets - The generated tickets data
 * @param {string} props.generationInput - The input for ticket generation
 * @param {Function} props.setGenerationInput - Function to update generation input
 * @param {Function} props.updateGeneratedTicket - Function to update a generated ticket
 * @param {Function} props.generateTickets - Function to generate tickets with AI
 * @param {Function} props.improveGeneratedTicket - Function to improve a ticket with AI
 * @param {Function} props.createTicketInJira - Function to create a single ticket in Jira
 * @param {Function} props.createAllGeneratedTickets - Function to create all tickets in Jira
 * @param {Function} props.clearGeneratedTickets - Function to clear all generated tickets
 * @returns {JSX.Element} Generate Tickets tab component
 */
const GenerateTicketsTab = ({
  generatedTickets,
  generationInput,
  setGenerationInput,
  updateGeneratedTicket,
  generateTickets,
  improveGeneratedTicket,
  createTicketInJira,
  createAllGeneratedTickets,
  clearGeneratedTickets
}) => {
  return (
    <>
      <div className="card">
        <h2 className="card-title">Generate Scrum Tickets</h2>
        <p style={{ marginBottom: '1rem' }}>
          Enter a project description, problem statement, or bullet points to
          generate well-structured Scrum tickets.
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
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onUpdate={updateGeneratedTicket}
                onReview={improveGeneratedTicket}
                onCreate={createTicketInJira}
                hasReviewButton={true}
                hasCreateButton={true}
                isGenerated={true}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              className="btn btn-success"
              onClick={createAllGeneratedTickets}
            >
              Batch Create All
            </button>
            <button className="btn btn-primary" onClick={clearGeneratedTickets}>
              Clear All
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default GenerateTicketsTab;
