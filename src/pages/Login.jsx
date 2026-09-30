import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Login – The first page users see.
 * Contains a centered card with Name and Register Number inputs.
 * Uses controlled inputs (useState), form validation, and localStorage.
 */
const Login = () => {
  // Controlled input states
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');

  // Validation error states
  const [errors, setErrors] = useState({ name: '', regNumber: '' });

  const navigate = useNavigate();

  // Client-side validation
  const validate = () => {
    const newErrors = { name: '', regNumber: '' };
    let isValid = true;

    const trimmedName = name.trim();
    const trimmedReg = regNumber.trim();

    if (!trimmedName) {
      newErrors.name = 'Please enter your name.';
      isValid = false;
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
      isValid = false;
    }

    if (!trimmedReg) {
      newErrors.regNumber = 'Please enter your register number.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Store login info in localStorage
    localStorage.setItem('campushub-name', name.trim());
    localStorage.setItem('campushub-reg', regNumber.trim());

    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1 className="login-logo">🎓 CampusHub</h1>
        <p className="login-subtitle">Student Academic Dashboard</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-name">Name</label>
            <input
              type="text"
              id="login-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <span className="error-msg">{errors.name}</span>
          </div>

          <div className="form-group">
            <label htmlFor="login-reg">Register Number</label>
            <input
              type="text"
              id="login-reg"
              placeholder="Enter your register number"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              autoComplete="off"
            />
            <span className="error-msg">{errors.regNumber}</span>
          </div>

          <button type="submit" className="btn btn-primary full-width">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
