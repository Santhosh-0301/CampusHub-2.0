import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute – Wraps child routes and redirects to /login
 * if the user is not logged in (checked via localStorage).
 * This is client-side route protection for the academic project.
 */
const ProtectedRoute = ({ children }) => {
  const studentName = localStorage.getItem('campushub-name');
  const registerNumber = localStorage.getItem('campushub-reg');

  // If login info is missing, redirect to login page
  if (!studentName || !registerNumber) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
