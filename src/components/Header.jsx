import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

// Map route paths to human-readable page titles
const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/courses': 'Courses',
  '/attendance': 'Attendance',
  '/assignments': 'Assignments',
  '/profile': 'Profile',
};

/**
 * Header – Top bar shown above the main content area on authenticated pages.
 * Displays:
 *   - Mobile hamburger button (triggers sidebar drawer)
 *   - CampusHub branding (mobile only)
 *   - Welcome message with student name
 *   - Theme toggle button
 *   - User info badge (name + register number)
 *
 * Props:
 *   darkMode      – boolean, current theme state
 *   onThemeToggle – function, called when theme toggle is clicked
 *   onOpenSidebar – function, called when hamburger is clicked
 *   studentName   – string, current student name from localStorage (reactive)
 */
const Header = ({ darkMode, onThemeToggle, onOpenSidebar, studentName }) => {
  const location = useLocation();
  const registerNumber = localStorage.getItem('campushub-reg') || '';

  // Determine page title from current route
  const pageTitle = PAGE_TITLES[location.pathname] || 'Dashboard';

  return (
    <>
      {/* Mobile header – visible only on small screens (≤640px) */}
      <header className="mobile-header">
        <button
          type="button"
          className="hamburger"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
        <span className="mobile-brand">🎓 CampusHub</span>
        <ThemeToggle darkMode={darkMode} onToggle={onThemeToggle} />
      </header>

      {/* Desktop top bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <h2 className="welcome-text">
            Welcome back, {studentName} 👋
          </h2>
          <p className="welcome-sub">Here&apos;s your academic overview.</p>
        </div>
        <div className="top-bar-right">
          <span className="page-title-badge">{pageTitle}</span>
          <ThemeToggle darkMode={darkMode} onToggle={onThemeToggle} />
          <div className="user-badge">
            <span className="user-badge-name">{studentName}</span>
            <span className="user-badge-reg">{registerNumber}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
