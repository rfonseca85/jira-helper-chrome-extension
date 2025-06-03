import { PlusIcon } from '../ui/Icons';
import TicketCard from './TicketCard';

/**
 * Tickets tab component for managing manual tickets
 * @param {Object} props - Component props
 * @param {Array} props.tickets - The tickets data
 * @param {Function} props.addTicket - Function to add a new ticket
 * @param {Function} props.updateTicket - Function to update a ticket
 * @param {Function} props.reviewWithGPT - Function to review a ticket with AI
 * @param {Function} props.createAllTickets - Function to create all tickets in Jira
 * @returns {JSX.Element} Tickets tab component
 */
const TicketsTab = ({
  tickets,
  addTicket,
  updateTicket,
  reviewWithGPT,
  createAllTickets
}) => {
  return (
    <>
      <button className="add-ticket-btn" onClick={addTicket}>
        <PlusIcon /> Add Ticket
      </button>

      <div className="tickets-list">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onUpdate={updateTicket}
            onReview={reviewWithGPT}
          />
        ))}
      </div>

      {tickets.length > 0 && (
        <button className="btn btn-success" onClick={createAllTickets}>
          Create All
        </button>
      )}
    </>
  );
};

export default TicketsTab;
