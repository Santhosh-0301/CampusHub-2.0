/* ==========================================================
   CampusHub – mockData.js
   Centralized academic data used across the application.
   Import from this file only — do not scatter data across
   individual components.
   ========================================================== */

/**
 * Enrolled courses
 * Each course has: id, code, name, faculty, credits, status
 */
export const courses = [
  { id: 1, code: 'CS6001', name: 'Full Stack Web Development',      faculty: 'Dr. P. Hariharan', credits: 4, status: 'Active' },
  { id: 2, code: 'CS6002', name: 'Database Management Systems',     faculty: 'Prof. S. Kumar',    credits: 3, status: 'Active' },
  { id: 3, code: 'CS6003', name: 'Data Structures',                 faculty: 'Dr. P. Latha',     credits: 3, status: 'Active' },
  { id: 4, code: 'CS6004', name: 'Computer Networks',               faculty: 'Prof. K. Rajan',   credits: 4, status: 'Active' },
  { id: 5, code: 'CS6005', name: 'Operating Systems',               faculty: 'Dr. V. Priya',     credits: 3, status: 'Active' },
  { id: 6, code: 'CS6006', name: 'Software Engineering',            faculty: 'Prof. M. Anand',   credits: 3, status: 'Active' },
];

/**
 * Subject-wise attendance records.
 * percent is calculated as Math.round((attended / conducted) * 100).
 * Stored explicitly so the UI can display conducted/attended counts.
 */
export const attendanceData = [
  { id: 1, code: 'CS6001', subject: 'Full Stack Web Development',  conducted: 40, attended: 36, percent: 90 },
  { id: 2, code: 'CS6002', subject: 'Database Management Systems', conducted: 36, attended: 30, percent: 84 },
  { id: 3, code: 'CS6003', subject: 'Data Structures',             conducted: 32, attended: 28, percent: 88 },
  { id: 4, code: 'CS6004', subject: 'Computer Networks',           conducted: 38, attended: 30, percent: 79 },
  { id: 5, code: 'CS6005', subject: 'Operating Systems',           conducted: 28, attended: 24, percent: 86 },
  { id: 6, code: 'CS6006', subject: 'Software Engineering',        conducted: 30, attended: 26, percent: 87 },
];

/**
 * Initial assignment data.
 * Used when localStorage has no saved assignments (first visit).
 * After that, data is persisted in localStorage key: campushub-assignments
 */
export const initialAssignments = [
  { id: 1,  title: 'Full Stack Mini Project',        subject: 'Full Stack Web Development',  dueDate: '2026-10-30', status: 'Pending'   },
  { id: 2,  title: 'ER Diagram Design',              subject: 'Database Management Systems', dueDate: '2026-10-10', status: 'Pending'   },
  { id: 3,  title: 'Socket Programming Lab',         subject: 'Computer Networks',           dueDate: '2026-10-15', status: 'Pending'   },
  { id: 4,  title: 'Linked List Implementation',     subject: 'Data Structures',             dueDate: '2026-08-20', status: 'Completed' },
  { id: 5,  title: 'Normalization Exercise',         subject: 'Database Management Systems', dueDate: '2026-08-15', status: 'Completed' },
  { id: 6,  title: 'TCP/IP Model Report',            subject: 'Computer Networks',           dueDate: '2026-08-10', status: 'Completed' },
  { id: 7,  title: 'Process Scheduling Simulation',  subject: 'Operating Systems',           dueDate: '2026-08-08', status: 'Completed' },
  { id: 8,  title: 'SRS Document',                  subject: 'Software Engineering',        dueDate: '2026-08-05', status: 'Completed' },
  { id: 9,  title: 'Stack using Array',              subject: 'Data Structures',             dueDate: '2026-08-01', status: 'Completed' },
  { id: 10, title: 'Relational Algebra Worksheet',   subject: 'Database Management Systems', dueDate: '2026-07-28', status: 'Completed' },
  { id: 11, title: 'Subnetting Practice',            subject: 'Computer Networks',           dueDate: '2026-07-25', status: 'Completed' },
  { id: 12, title: 'Page Replacement Algorithms',    subject: 'Operating Systems',           dueDate: '2026-07-22', status: 'Completed' },
  { id: 13, title: 'Agile Methodology Essay',        subject: 'Software Engineering',        dueDate: '2026-07-18', status: 'Completed' },
  { id: 14, title: 'Binary Tree Traversal',          subject: 'Data Structures',             dueDate: '2026-07-15', status: 'Completed' },
  { id: 15, title: 'SQL Queries Assignment',         subject: 'Database Management Systems', dueDate: '2026-07-10', status: 'Completed' },
];

/**
 * Recent activity feed – displayed on the Dashboard page.
 */
export const activities = [
  'Submitted DBMS assignment — ER Diagram Design',
  'Attended Full Stack Web Development class',
  'Updated student profile information',
  'Completed Data Structures lab session',
  'Enrolled in Software Engineering course',
];
