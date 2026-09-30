import { useState, useEffect } from 'react';

/**
 * Profile – Displays and allows editing of student profile information.
 * Name and Register Number come from localStorage.
 * Other fields (department, year, section, email) are also stored in localStorage.
 */
const Profile = () => {
  // Profile data state
  const [profile, setProfile] = useState({
    name: '',
    regNumber: '',
    department: 'Computer Science & Engineering',
    year: 'III',
    section: 'CSE – A',
    email: '',
  });

  // Edit mode toggle
  const [isEditing, setIsEditing] = useState(false);

  // Form data for editing (separate from display data)
  const [formData, setFormData] = useState({});

  // Validation errors
  const [errors, setErrors] = useState({});

  // Load profile from localStorage on mount
  useEffect(() => {
    const name = localStorage.getItem('campushub-name') || 'Student';
    const regNumber = localStorage.getItem('campushub-reg') || 'REG000';
    const savedProfile = localStorage.getItem('campushub-profile');

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile({
          name,
          regNumber,
          department: parsed.department || 'Computer Science & Engineering',
          year: parsed.year || 'III',
          section: parsed.section || 'CSE – A',
          email: parsed.email || `${regNumber.toLowerCase()}@university.edu`,
        });
      } catch {
        setProfile((prev) => ({
          ...prev,
          name,
          regNumber,
          email: `${regNumber.toLowerCase()}@university.edu`,
        }));
      }
    } else {
      setProfile((prev) => ({
        ...prev,
        name,
        regNumber,
        email: `${regNumber.toLowerCase()}@university.edu`,
      }));
    }
  }, []);

  // Start editing – copy current profile into form data
  const handleEditStart = () => {
    setFormData({
      name: profile.name,
      department: profile.department,
      section: profile.section,
      email: profile.email,
    });
    setErrors({});
    setIsEditing(true);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!formData.department?.trim()) {
      newErrors.department = 'Department is required.';
    }

    if (!formData.section?.trim()) {
      newErrors.section = 'Section is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile changes
  const handleSave = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const updatedProfile = {
      ...profile,
      name: formData.name.trim(),
      department: formData.department.trim(),
      section: formData.section.trim(),
      email: formData.email.trim(),
    };

    setProfile(updatedProfile);

    // Update name in localStorage (used by Header and other components)
    localStorage.setItem('campushub-name', updatedProfile.name);

    // Save extended profile data
    localStorage.setItem(
      'campushub-profile',
      JSON.stringify({
        department: updatedProfile.department,
        year: updatedProfile.year,
        section: updatedProfile.section,
        email: updatedProfile.email,
      })
    );

    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  // Get the first character for the avatar
  const avatarLetter = profile.name?.charAt(0).toUpperCase() || 'S';

  return (
    <div className="page-fade-in">
      <h3 className="section-title">Student Profile</h3>

      <div className="card profile-card">
        <div className="profile-avatar">{avatarLetter}</div>

        {isEditing ? (
          /* ---- Edit Mode ---- */
          <form className="profile-edit-form" onSubmit={handleSave} noValidate>
            <div className="form-group">
              <label htmlFor="profile-name">Name</label>
              <input
                type="text"
                id="profile-name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">Email</label>
              <input
                type="email"
                id="profile-email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="profile-dept">Department</label>
              <input
                type="text"
                id="profile-dept"
                name="department"
                value={formData.department || ''}
                onChange={handleChange}
                placeholder="Enter department"
              />
              {errors.department && (
                <span className="error-msg">{errors.department}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="profile-section">Section</label>
              <input
                type="text"
                id="profile-section"
                name="section"
                value={formData.section || ''}
                onChange={handleChange}
                placeholder="Enter section"
              />
              {errors.section && (
                <span className="error-msg">{errors.section}</span>
              )}
            </div>

            <div className="profile-edit-actions">
              <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* ---- View Mode ---- */
          <>
            <div className="profile-details">
              <div className="profile-row">
                <span className="profile-label">Name</span>
                <span className="profile-value">{profile.name}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Register Number</span>
                <span className="profile-value">{profile.regNumber}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Department</span>
                <span className="profile-value">{profile.department}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Year</span>
                <span className="profile-value">{profile.year}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Section</span>
                <span className="profile-value">{profile.section}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Email</span>
                <span className="profile-value">{profile.email}</span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleEditStart}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
