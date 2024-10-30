// src/components/RegistrationForm.tsx
import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    membershipType: "basic",
    interests: "",
    agree: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form validation and error handling logic here
  };

  return (
    <div className="form-container mt-5 p-4 shadow-lg rounded bg-form-background">
      <header className="form-header text-center mb-4">
        <img
          src={require("./../../Images/logo.png")}
          alt="Club Logo"
          className="form-logo mx-auto"
        />
        <h1 className="form-title my-3">Join Our Club</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-input rounded-pill shadow-sm"
            placeholder="Enter your full name"
            onChange={handleInputChange}
            value={formData.fullName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input rounded-pill shadow-sm"
            placeholder="Enter your email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input rounded-pill shadow-sm"
            placeholder="Enter your phone number"
            onChange={handleInputChange}
            value={formData.phone}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="form-input rounded-pill shadow-sm"
            onChange={handleInputChange}
            value={formData.dob}
          />
        </div>

        <div className="form-group">
          <label htmlFor="membershipType" className="form-label">
            Membership Type:
          </label>
          <select
            id="membershipType"
            name="membershipType"
            className="form-input rounded-pill shadow-sm"
            onChange={handleInputChange}
            value={formData.membershipType}
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="family">Family</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interests" className="form-label">
            Interests:
          </label>
          <textarea
            id="interests"
            name="interests"
            rows={4}
            className="form-textarea shadow-sm"
            placeholder="Tell us about your interests"
            onChange={handleInputChange}
            value={formData.interests}
          ></textarea>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="form-check-input"
              onChange={handleInputChange}
              checked={formData.agree}
            />
            <label htmlFor="agree" className="form-check-label">
              I agree to the club's policies.
            </label>
          </div>
        </div>

        <button type="submit" className="form-submit-btn rounded-pill shadow">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
