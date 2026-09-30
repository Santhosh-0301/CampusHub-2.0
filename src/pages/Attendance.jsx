import { useEffect, useRef } from 'react';
import { attendanceData } from '../data/mockData.js';

/**
 * Attendance – Displays subject-wise attendance with animated progress bars.
 *
 * For each subject it shows:
 *   - Course code
 *   - Subject name
 *   - Classes conducted / classes attended
 *   - Calculated attendance percentage
 *   - Animated progress bar
 *
 * Formula: percent = Math.round((attended / conducted) * 100)
 *
 * Uses:
 *   useEffect  – to animate progress bars after mount
 *   useRef     – to hold references to bar DOM elements
 *   map()      – to render each attendance record dynamically
 */
const Attendance = () => {
  const barsRef = useRef([]);

  // Animate progress bars from 0% to target width after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      barsRef.current.forEach((bar) => {
        if (bar) {
          const target = bar.getAttribute('data-percent');
          bar.style.width = `${target}%`;
        }
      });
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  // Calculate overall average attendance
  const avgPercent = Math.round(
    attendanceData.reduce((sum, item) => sum + item.percent, 0) /
      attendanceData.length
  );

  return (
    <div className="page-fade-in">
      {/* Page header */}
      <div className="page-header">
        <h3 className="section-title">Subject-wise Attendance</h3>
        <div className="attendance-summary-badge">
          Overall Average:{' '}
          <strong
            className={
              avgPercent >= 75 ? 'attendance-ok' : 'attendance-low'
            }
          >
            {avgPercent}%
          </strong>
        </div>
      </div>

      {/* Attendance records */}
      <div className="attendance-list">
        {attendanceData.map((item, index) => {
          // Dynamically calculate percentage for accuracy
          const calculated = Math.round(
            (item.attended / item.conducted) * 100
          );
          const isLow = calculated < 75;

          return (
            <div className="attendance-item" key={item.id}>
              {/* Subject header row */}
              <div className="attendance-subject">
                <div className="attendance-subject-info">
                  <span className="attendance-code">{item.code}</span>
                  <span className="attendance-subject-name">
                    {item.subject}
                  </span>
                </div>
                <span
                  className={`attendance-percent ${
                    isLow ? 'attendance-percent-low' : ''
                  }`}
                >
                  {calculated}%
                </span>
              </div>

              {/* Classes conducted / attended */}
              <div className="attendance-counts">
                <span>
                  Conducted:{' '}
                  <strong>{item.conducted}</strong>
                </span>
                <span>
                  Attended:{' '}
                  <strong>{item.attended}</strong>
                </span>
                {isLow && (
                  <span className="attendance-warning">
                    ⚠ Below 75%
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="bar-track">
                <div
                  className={`bar-fill ${isLow ? 'bar-fill-low' : ''}`}
                  ref={(el) => (barsRef.current[index] = el)}
                  data-percent={calculated}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Attendance key */}
      <p className="attendance-note">
        * Minimum required attendance: 75% per subject
      </p>
    </div>
  );
};

export default Attendance;
