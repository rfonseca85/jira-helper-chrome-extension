import { TICKET_TYPES } from '../../utils/constants';

/**
 * Ticket card component for displaying and editing ticket information
 * @param {Object} props - Component props
 * @param {Object} props.ticket - The ticket data
 * @param {Function} props.onUpdate - Function to call when ticket is updated
 * @param {Function} props.onReview - Function to call for AI review
 * @param {Function} props.onCreate - Optional function to call for creating on Jira
 * @param {boolean} props.hasReviewButton - Whether to show the Review button
 * @param {boolean} props.hasCreateButton - Whether to show the Create button
 * @param {boolean} props.isGenerated - Whether this is a generated ticket
 * @returns {JSX.Element} Ticket card component
 */
const TicketCard = ({
  ticket,
  onUpdate,
  onReview,
  onCreate,
  hasReviewButton = true,
  hasCreateButton = false,
  isGenerated = false
}) => {
  // Determine if fields have been improved
  const isTitleImproved = ticket.improved && ticket.improved.title;
  const isDescriptionImproved = ticket.improved && ticket.improved.description;

  // CSS styles for improved fields
  const improvedStyle = {
    borderColor: '#22c55e', // green border
    boxShadow: '0 0 0 1px #22c55e'
  };

  return (
    <div className="ticket-card">
      <div className="form-group">
        <label className="form-label">
          Title
          {isTitleImproved && (
            <span className="improved-indicator"> (Improved)</span>
          )}
        </label>
        <input
          className="form-input"
          type="text"
          placeholder="Ticket title"
          value={ticket.title}
          onChange={(e) => onUpdate(ticket.id, 'title', e.target.value)}
          style={isTitleImproved ? improvedStyle : {}}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Description
          {isDescriptionImproved && (
            <span className="improved-indicator"> (Improved)</span>
          )}
        </label>
        <textarea
          className="form-textarea"
          placeholder="Ticket description"
          value={ticket.description}
          onChange={(e) => onUpdate(ticket.id, 'description', e.target.value)}
          style={isDescriptionImproved ? improvedStyle : {}}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={ticket.type}
          onChange={(e) => onUpdate(ticket.id, 'type', e.target.value)}
        >
          {TICKET_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {hasReviewButton && hasCreateButton ? (
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            className="btn btn-primary"
            onClick={() => onCreate(ticket)}
            style={{ flex: 1 }}
          >
            Create on Jira
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onReview(ticket.id)}
            style={{ flex: 1 }}
          >
            {isGenerated
              ? 'Improve Title & Description'
              : 'Review with GPT-4.1'}
          </button>
        </div>
      ) : (
        <>
          {hasReviewButton && (
            <button
              className="btn btn-primary"
              onClick={() => onReview(ticket.id)}
            >
              Review with GPT-4.1
            </button>
          )}

          {hasCreateButton && (
            <button
              className="btn btn-primary"
              onClick={() => onCreate(ticket)}
            >
              Create on Jira
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TicketCard;
