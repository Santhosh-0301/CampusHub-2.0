import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

/**
 * Sidebar – Fixed left navigation panel.
 *
 * Features:
 *   - CampusHub brand header
 *   - NavLink items that highlight the active route
 *   - Theme toggle button
 *   - Logout button that clears localStorage and redirects to login
 *   - Mobile drawer support (controlled by sidebarOpen prop)
 *
 * Props:
 *   darkMode       – boolean, current theme
 *   onThemeToggle  – function, called to toggle theme
 *   sidebarOpen    – boolean, whether sidebar is open on mobile
 *   onCloseSidebar – function, called to close mobile sidebar
 */
const Sidebar = ({ darkMode, onThemeToggle, sidebarOpen, onCloseSidebar }) => {
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { label: 'Dashboard',   path: '/dashboard',   icon: '▣' },
    { label: 'Courses',     path: '/courses',     icon: '📚' },
    { label: 'Attendance',  path: '/attendance',  icon: '📋' },
    { label: 'Assignments', path: '/assignments', icon: '📝' },
    { label: 'Profile',     path: '/profile',     icon: '👤' },
  ];

  // Handle logout: clear auth data and navigate to login
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('campushub-name');
      localStorage.removeItem('campushub-reg');
      navigate('/login');
    }
  };

  return (
    <>
      {/* Overlay – covers main content on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="mobile-nav-overlay visible"
          onClick={onCloseSidebar}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">🎓 CampusHub</div>

        {/* Navigation links */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(({ label, path, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={onCloseSidebar}
            >
              <span className="nav-icon" aria-hidden="true">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer: theme toggle + logout */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="nav-link"
            onClick={onThemeToggle}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="nav-icon" aria-hidden="true">
              {darkMode ? '☀️' : '🌙'}
            </span>
            Theme
          </button>
          <button
            type="button"
            className="nav-link logout-btn"
            onClick={handleLogout}
          >
            <span className="nav-icon" aria-hidden="true">➜</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
