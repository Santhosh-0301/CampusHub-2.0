import { Link } from 'react-router-dom';

/**
 * NotFound – Simple 404 page for unknown routes.
 * Provides a link back to the dashboard.
 */
const NotFound = () => {
  return (
    <div className="not-found-page page-fade-in">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/dashboard" className="btn btn-primary">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
