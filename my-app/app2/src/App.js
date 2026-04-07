import { useState } from 'react';
import './App.css';

const initialState = {
  firstName: '', lastName: '', email: '',
  phone: '', dob: '', gender: '', address: ''
};

function App() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' }); // clear error on typing
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim())  newErrors.lastName  = 'Last name is required';
    if (!form.phone.trim())     newErrors.phone     = 'Phone number is required';
    if (!form.dob)              newErrors.dob       = 'Date of birth is required';
    if (!form.gender)           newErrors.gender    = 'Please select a gender';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address (e.g. john@example.com)';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmitted(true);
      setForm(initialState);
      setErrors({});
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="form-container">
      <h2>Individual Profile Form</h2>

      {submitted && (
        <div className="success-message">
          ✅ Form submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              className={errors.firstName ? 'input-error' : form.firstName ? 'input-success' : ''}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={errors.lastName ? 'input-error' : form.lastName ? 'input-success' : ''}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={errors.email ? 'input-error' : form.email ? 'input-success' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 9999999999"
              className={errors.phone ? 'input-error' : form.phone ? 'input-success' : ''}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className={errors.dob ? 'input-error' : form.dob ? 'input-success' : ''}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={errors.gender ? 'input-error' : form.gender ? 'input-success' : ''}
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123, Street, City, State"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default App;