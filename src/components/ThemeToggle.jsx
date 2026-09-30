/**
 * ThemeToggle – A simple button that toggles between light and dark themes.
 * Uses the moon/sun emoji to indicate the current theme state.
 */
const ThemeToggle = ({ darkMode, onToggle, className = '' }) => {
  return (
    <button
      type="button"
      className={`theme-toggle-btn ${className}`}
      onClick={onToggle}
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
