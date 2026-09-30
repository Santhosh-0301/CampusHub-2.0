import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard.jsx';
import { courses, attendanceData, activities, initialAssignments } from '../data/mockData.js';

/**
 * Dashboard – Main landing page after login.
 *
 * Displays:
 *   1. Four summary stat cards (attendance, courses, pending, completed)
 *   2. Recent Assignments (top 3 from stored data)
 *   3. Recent Activity feed
 *   4. Enrolled Courses preview (first 3 courses)
 *   5. Attendance Overview (first 3 subjects)
 *
 * Uses:
 *   useState   – assignments state
 *   useEffect  – load from localStorage on mount
 *   map()      – render lists dynamically
 *   filter()   – count pending/completed
 *   reduce()   – calculate average attendance
 */
const Dashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  // Load assignments from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('campushub-assignments');
    if (stored) {
      try {
        setAssignments(JSON.parse(stored));
      } catch {
        setAssignments(initialAssignments);
      }
    } else {
      setAssignments(initialAssignments);
    }
  }, []);

  // Dynamically calculated stats
  const avgAttendance = Math.round(
    attendanceData.reduce((sum, item) => sum + item.percent, 0) /
      attendanceData.length
  );
  const pendingCount   = assignments.filter((a) => a.status === 'Pending').length;
  const completedCount = assignments.filter((a) => a.status === 'Completed').length;

  // Most recent 3 assignments for the dashboard preview
  const recentAssignments = [...assignments].slice(0, 3);

  // Format ISO date (YYYY-MM-DD) → "30 Aug 2026"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="page-fade-in">

      {/* ---- Summary Cards ---- */}
      <div className="summary-cards">
        <StatCard icon="📋" label="Attendance"          value={`${avgAttendance}%`} />
        <StatCard icon="📚" label="Courses"             value={courses.length}      />
        <StatCard icon="⚠"  label="Pending Assignments" value={pendingCount}        />
        <StatCard icon="✓"  label="Completed"           value={completedCount}      />
      </div>

      {/* ---- Two-column grid for dashboard sections ---- */}
      <div className="dashboard-grid">

        {/* Left column */}
        <div className="dashboard-col">

          {/* Recent Assignments */}
          <section className="card section-card">
            <div className="section-header">
              <h3 className="section-title">Recent Assignments</h3>
              <button
                type="button"
                className="btn-link"
                onClick={() => navigate('/assignments')}
              >
                View all
              </button>
            </div>
            {recentAssignments.length > 0 ? (
              <ul className="recent-list">
                {recentAssignments.map((item) => (
                  <li key={item.id}>
                    <div className="recent-item-info">
                      <span className="recent-item-name">{item.title}</span>
                      <span className="recent-item-due">
                        {item.status === 'Completed'
                          ? 'Completed'
                          : `Due: ${formatDate(item.dueDate)}`}
                      </span>
                    </div>
                    <span
                      className={`status-badge ${
                        item.status === 'Completed'
                          ? 'status-completed'
                          : 'status-pending'
                      }`}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No recent assignments.</p>
            )}
          </section>

          {/* Recent Activity */}
          <section className="card section-card">
            <h3 className="section-title">Recent Activity</h3>
            <ul className="activity-list">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column */}
        <div className="dashboard-col">

          {/* Enrolled Courses Preview */}
          <section className="card section-card">
            <div className="section-header">
              <h3 className="section-title">Enrolled Courses</h3>
              <button
                type="button"
                className="btn-link"
                onClick={() => navigate('/courses')}
              >
                View all
              </button>
            </div>
            <ul className="dashboard-courses-list">
              {courses.slice(0, 4).map((course) => (
                <li key={course.id} className="dashboard-course-item">
                  <div className="dashboard-course-info">
                    <span className="dashboard-course-code">{course.code}</span>
                    <span className="dashboard-course-name">{course.name}</span>
                  </div>
                  <span className="status-badge status-active">{course.status}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Attendance Overview */}
          <section className="card section-card">
            <div className="section-header">
              <h3 className="section-title">Attendance Overview</h3>
              <button
                type="button"
                className="btn-link"
                onClick={() => navigate('/attendance')}
              >
                View all
              </button>
            </div>
            <div className="attendance-preview-list">
              {attendanceData.slice(0, 3).map((item) => (
                <div key={item.id} className="attendance-preview-item">
                  <div className="attendance-preview-info">
                    <span className="attendance-preview-name">{item.subject}</span>
                    <span
                      className={`attendance-preview-percent ${
                        item.percent < 75 ? 'attendance-low' : 'attendance-ok'
                      }`}
                    >
                      {item.percent}%
                    </span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${item.percent}%`, transition: 'none' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
