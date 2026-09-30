/**
 * StatCard – Reusable summary card for the Dashboard page.
 * Displays an icon, label, and value (e.g., "Attendance — 87%").
 */
const StatCard = ({ icon, label, value }) => {
  return (
    <div className="card stat-card">
      <span className="stat-icon">{icon}</span>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
