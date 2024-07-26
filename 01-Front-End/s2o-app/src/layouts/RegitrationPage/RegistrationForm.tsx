// src/components/RegistrationForm.jsx
import React, { useState } from 'react';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    membershipType: 'basic',
    interests: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});



  
  return (
    <div className="container mt-5">
      <header className="text-center mb-4">
        <img src={require('./../../Images/logo.png')} alt="Club Logo" className="img-fluid" style={{ maxWidth: '150px' }} />
        <h1 className="my-3">Join Our Club</h1>
      </header>
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"

          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
          />
          
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="form-control"
            
          />
         
        </div>

        <div className="form-group">
          <label htmlFor="membershipType">Membership Type:</label>
          <select
            id="membershipType"
            name="membershipType"
            className="form-control"
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="family">Family</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interests">Interests:</label>
          <textarea
            id="interests"
            name="interests"
            rows={4}
            className="form-control"
            
          ></textarea>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="form-check-input"
              
            />
            <label htmlFor="agree" className="form-check-label">
              I agree to the club's policies.
            </label>
          </div>
          
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
