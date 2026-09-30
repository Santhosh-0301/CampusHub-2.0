import { useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import { courses } from '../data/mockData.js';

/**
 * Courses – Displays enrolled courses in a searchable card grid.
 *
 * Search works against: course name, faculty name, and course code.
 *
 * Uses:
 *   useState – for search term state
 *   filter() – to dynamically narrow the courses list
 *   map()    – to render each CourseCard
 */
const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses based on search term (case-insensitive)
  const filteredCourses = courses.filter((course) => {
    const query = searchTerm.toLowerCase().trim();
    return (
      course.name.toLowerCase().includes(query) ||
      course.faculty.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query)
    );
  });

  return (
    <div className="page-fade-in">

      {/* Page header with title and search */}
      <div className="page-header">
        <h3 className="section-title">
          Enrolled Courses
          <span className="course-count-badge">{courses.length} Courses</span>
        </h3>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, faculty, or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search courses"
        />
      </div>

      {/* Courses grid or empty state */}
      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="empty-state-box">
          <p className="empty-state">No courses match your search.</p>
          <p className="empty-state-hint">
            Try searching by course name, faculty, or course code.
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses;
