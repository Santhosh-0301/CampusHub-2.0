/**
 * CourseCard – Displays individual course information in a card.
 * Shows: course code, course name, faculty, credits, and enrolment status.
 *
 * Props:
 *   course – object with { id, code, name, faculty, credits, status }
 */
const CourseCard = ({ course }) => {
  const { code, name, faculty, credits, status } = course;

  return (
    <div className="card course-card">
      <div className="course-card-header">
        <span className="course-code-badge">{code}</span>
        <span className="status-badge status-active">{status}</span>
      </div>
      <h3 className="course-card-name">{name}</h3>
      <p className="course-card-detail">
        Faculty: <span>{faculty}</span>
      </p>
      <div className="course-card-footer">
        <span className="course-card-credits">
          {credits} Credit{credits !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
