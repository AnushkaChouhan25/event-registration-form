import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      errors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      errors.guestName = 'Guest Name is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  
  return (
    <div>
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
          {errors.age && <span>{errors.age}</span>}
        </div>
        <div>
          <label>Are you attending with a guest?</label>
          <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {formData.attendingWithGuest === 'Yes' && (
          <div>
            <label>Guest Name:</label>
            <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
            {errors.guestName && <span>{errors.guestName}</span>}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Form Data Submitted</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Age: {formData.age}</p>
          <p>Attending with guest: {formData.attendingWithGuest}</p>
          {formData.attendingWithGuest === 'Yes' && <p>Guest Name: {formData.guestName}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
