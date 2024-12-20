import React, { useState } from "react";

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
    <div className="max-w-4xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
      <header className="text-center mb-6">
        <img
          src={require("./../../Images/logo.png")}
          alt="Club Logo"
          className="mx-auto mb-4 h-16"
        />
        <h1 className="text-3xl font-extrabold text-gray-800">Join Our Club</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              onChange={handleInputChange}
              value={formData.fullName}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              onChange={handleInputChange}
              value={formData.phone}
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob" className="block text-lg font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              value={formData.dob}
            />
          </div>

          {/* Membership Type */}
          <div className="form-group">
            <label htmlFor="membershipType" className="block text-lg font-medium text-gray-700">
              Membership Type:
            </label>
            <select
              id="membershipType"
              name="membershipType"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
              value={formData.membershipType}
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="family">Family</option>
            </select>
          </div>

          {/* Interests */}
          <div className="form-group">
            <label htmlFor="interests" className="block text-lg font-medium text-gray-700">
              Interests:
            </label>
            <textarea
              id="interests"
              name="interests"
              rows={4}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about your interests"
              onChange={handleInputChange}
              value={formData.interests}
            ></textarea>
          </div>

          {/* Terms & Conditions */}
          <div className="form-group flex items-center">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="mr-2"
              onChange={handleInputChange}
              checked={formData.agree}
            />
            <label htmlFor="agree" className="text-lg text-gray-700">
              I agree to the club's policies.
            </label>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;