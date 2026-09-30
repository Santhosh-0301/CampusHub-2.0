import { useState, useEffect } from 'react';
import AssignmentCard from '../components/AssignmentCard.jsx';
import AssignmentForm from '../components/AssignmentForm.jsx';
import { initialAssignments } from '../data/mockData.js';

/**
 * Assignments – The main interactive CRUD page.
 * Supports Add, Edit, Delete, Search, and Filter operations.
 * Persists assignment data to localStorage using useEffect.
 */
const Assignments = () => {
  // ---- State: Assignment data ----
  const [assignments, setAssignments] = useState([]);

  // ---- State: Search and filter ----
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // ---- State: Edit mode ----
  const [editingAssignment, setEditingAssignment] = useState(null);

  // ---- State: Delete confirmation ----
  const [deleteId, setDeleteId] = useState(null);

  // Load assignments from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('campushub-assignments');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAssignments(parsed);
      } catch {
        // If stored data is corrupt, fall back to mock data
        setAssignments(initialAssignments);
      }
    } else {
      // First time — use initial mock data
      setAssignments(initialAssignments);
    }
  }, []);

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    // Only save if assignments have been loaded (avoid saving empty on mount)
    if (assignments.length > 0 || localStorage.getItem('campushub-assignments')) {
      localStorage.setItem('campushub-assignments', JSON.stringify(assignments));
    }
  }, [assignments]);

  // ---- ADD: Create a new assignment ----
  const handleAdd = (data) => {
    const newAssignment = {
      ...data,
      id: Date.now(), // Simple unique ID using timestamp
    };
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  // ---- EDIT: Start editing ----
  const handleEditStart = (assignment) => {
    setEditingAssignment(assignment);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---- EDIT: Save changes ----
  const handleEditSave = (data) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === editingAssignment.id ? { ...a, ...data } : a
      )
    );
    setEditingAssignment(null);
  };

  // ---- EDIT: Cancel ----
  const handleEditCancel = () => {
    setEditingAssignment(null);
  };

  // ---- DELETE: Request confirmation ----
  const handleDeleteRequest = (id) => {
    setDeleteId(id);
  };

  // ---- DELETE: Confirm and remove ----
  const handleDeleteConfirm = () => {
    setAssignments((prev) => prev.filter((a) => a.id !== deleteId));
    setDeleteId(null);
  };

  // ---- DELETE: Cancel ----
  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  // ---- FILTER + SEARCH: Apply both together ----
  const filteredAssignments = assignments.filter((assignment) => {
    // Check filter status
    const matchesFilter =
      filterStatus === 'all' || assignment.status === filterStatus;

    // Check search term (search by title and subject)
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      assignment.title.toLowerCase().includes(query) ||
      assignment.subject.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="page-fade-in">
      {/* Add / Edit Form */}
      <AssignmentForm
        onSubmit={editingAssignment ? handleEditSave : handleAdd}
        editData={editingAssignment}
        onCancel={handleEditCancel}
      />

      {/* Toolbar: Search + Filter */}
      <div className="assignments-toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search assignments"
        />
        <div className="filter-group">
          {['all', 'Pending', 'Completed'].map((status) => (
            <button
              key={status}
              type="button"
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment List */}
      <div className="assignments-list">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onEdit={handleEditStart}
              onDelete={handleDeleteRequest}
            />
          ))
        ) : (
          <p className="empty-state">No assignments found.</p>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteId !== null && (
        <div className="confirm-overlay">
          <div className="card confirm-dialog">
            <h3>Delete Assignment</h3>
            <p>Are you sure you want to delete this assignment? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
