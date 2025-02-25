import React, { useState } from "react";
import axios from "axios";
import "../pagesCSS/StartUp.css"; // Import CSS file for styling
import Footer from "../Components/Footer";

const Startup = () => {
  const [formData, setFormData] = useState({
    startupName: "",
    founderName: "",
    email: "",
    phone: "",
    industry: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/startup", formData);
      
      if (response.status === 201) {
        console.log("Form Submitted:", formData);
        setSubmitted(true);
      } else {
        alert("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Startup Application Form</h2>
      {submitted ? (
        <div className="success-message">
          <h3>Thank you for applying!</h3>
          <p>We will review your application and get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="startup-form">
          <label>Startup Name</label>
          <input type="text" name="startupName" placeholder="Enter your startup name" value={formData.startupName} onChange={handleChange} required />

          <label>Founder Name</label>
          <input type="text" name="founderName" placeholder="Enter founder's name" value={formData.founderName} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />

          <label>Industry</label>
          <select name="industry" value={formData.industry} onChange={handleChange} required>
            <option value="">Select Industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>

          <label>Startup Description</label>
          <textarea name="description" placeholder="Describe your startup idea" value={formData.description} onChange={handleChange} required></textarea>

          <button type="submit">Submit Application</button>
        </form>
      )}
      
    </div>
  );
};

export default Startup;
