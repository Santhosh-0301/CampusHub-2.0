import { useState, useEffect } from 'react';

/**
 * AssignmentForm – Form for adding or editing assignments.
 * Uses controlled inputs with useState and client-side validation.
 *
 * Props:
 *   onSubmit  – callback that receives the assignment data
 *   editData  – if provided, form enters "edit mode" with pre-filled values
 *   onCancel  – callback to cancel edit mode
 */
const AssignmentForm = ({ onSubmit, editData = null, onCancel }) => {
  // Form field states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  // Validation error states
  const [errors, setErrors] = useState({});

  // When editData changes, populate the form fields (useEffect with dependency)
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || '');
      setSubject(editData.subject || '');
      setDueDate(editData.dueDate || '');
      setStatus(editData.status || 'Pending');
      setErrors({});
    }
  }, [editData]);

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Assignment name is required.';
    }
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }
    if (!status) {
      newErrors.status = 'Status is required.';
    }

    setErrors(newErrors);
    // Return true if no errors (valid form)
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const assignmentData = {
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      status,
    };

    onSubmit(assignmentData);

    // Clear form after adding (not editing — edit clears on parent)
    if (!editData) {
      setTitle('');
      setSubject('');
      setDueDate('');
      setStatus('Pending');
    }
    setErrors({});
  };

  return (
    <div className="card assignment-form-card">
      <h3 className="section-title">
        {editData ? 'Edit Assignment' : 'Add New Assignment'}
      </h3>
      <form className="assignment-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="assign-title">Assignment Name</label>
          <input
            type="text"
            id="assign-title"
            placeholder="Enter assignment name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="assign-subject">Subject</label>
          <input
            type="text"
            id="assign-subject"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          {errors.subject && <span className="error-msg">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="assign-due">Due Date</label>
          <input
            type="date"
            id="assign-due"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errors.dueDate && <span className="error-msg">{errors.dueDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="assign-status">Status</label>
          <select
            id="assign-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <span className="error-msg">{errors.status}</span>}
        </div>

        <div className="assignment-form-actions">
          <button type="submit" className="btn btn-primary">
            {editData ? 'Save Changes' : 'Add Assignment'}
          </button>
          {editData && (
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssignmentForm;
