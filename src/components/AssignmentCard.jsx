/**
 * AssignmentCard – Displays a single assignment with Edit/Delete actions.
 * Formats the ISO date string into a readable format (e.g., "30 Aug 2026").
 */
const AssignmentCard = ({ assignment, onEdit, onDelete }) => {
  const { id, title, subject, dueDate, status } = assignment;

  // Format ISO date (YYYY-MM-DD) to readable format (DD Mon YYYY)
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const statusClass = status === 'Completed' ? 'status-completed' : 'status-pending';

  return (
    <div className="assignment-card">
      <div className="assignment-info">
        <span className="assignment-name">{title}</span>
        <span className="assignment-subject">{subject}</span>
      </div>
      <div className="assignment-meta">
        <span className="assignment-due">Due: {formatDate(dueDate)}</span>
        <span className={`status-badge ${statusClass}`}>{status}</span>
        <div className="assignment-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(assignment)}
            aria-label={`Edit ${title}`}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
