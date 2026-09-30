import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Components
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import Attendance from './pages/Attendance.jsx';
import Assignments from './pages/Assignments.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * App – Root component.
 * Manages global theme state and the main routing structure.
 * Uses HashRouter (configured in main.jsx) for GitHub Pages compatibility.
 */
const App = () => {
  // ---- Theme State ----
  // Read saved theme preference from localStorage on initial load
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('campushub-theme');
    return saved === 'dark';
  });

  // ---- Mobile Sidebar State ----
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ---- Student Name State (used to re-render Header when profile updates) ----
  const [studentName, setStudentName] = useState(
    () => localStorage.getItem('campushub-name') || 'Student'
  );

  const location = useLocation();

  // Apply or remove the "dark" class on the body element whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    // Save theme preference to localStorage
    localStorage.setItem('campushub-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Close mobile sidebar when the route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Refresh student name whenever the location changes (covers profile edits)
  useEffect(() => {
    const name = localStorage.getItem('campushub-name') || 'Student';
    setStudentName(name);
  }, [location.pathname]);

  // Toggle theme handler – passed down to Sidebar and Header
  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  // Determine if we are on the login/root page
  const isLoginPage =
    location.pathname === '/login' || location.pathname === '/';

  // Check if user is currently logged in (both fields required)
  const isLoggedIn = Boolean(
    localStorage.getItem('campushub-name') &&
    localStorage.getItem('campushub-reg')
  );

  return (
    <>
      {/* ---- Authenticated Layout (Sidebar + Header + Content) ---- */}
      {!isLoginPage && isLoggedIn ? (
        <div className="app-layout">
          <Sidebar
            darkMode={darkMode}
            onThemeToggle={handleThemeToggle}
            sidebarOpen={sidebarOpen}
            onCloseSidebar={() => setSidebarOpen(false)}
          />
          <main className="main-content">
            <Header
              darkMode={darkMode}
              onThemeToggle={handleThemeToggle}
              onOpenSidebar={() => setSidebarOpen(true)}
              studentName={studentName}
            />
            <div className="page-content">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <ProtectedRoute>
                      <Courses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance"
                  element={
                    <ProtectedRoute>
                      <Attendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assignments"
                  element={
                    <ProtectedRoute>
                      <Assignments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      ) : (
        /* ---- Unauthenticated Routes (Login only) ---- */
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          {/* Any other route when not logged in → redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;
