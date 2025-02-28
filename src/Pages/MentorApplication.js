import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const MentorApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    expertise: "",
    experience: "",
    bio: "",
    linkedin: "",
    resume: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure experience is stored as a number
    if (name === "experience") {
      setFormData({ ...formData, [name]: value.replace(/\D/, "") }); // Only allows numbers
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert experience to number before sending
    const updatedData = { ...formData, experience: Number(formData.experience) };

    if (Object.values(updatedData).some((field) => !field)) {
      setError("Please fill in all required fields!");
      return;
    }

    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/mentor-apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Your application has been submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          expertise: "",
          experience: "",
          bio: "",
          linkedin: "",
          resume: "",
        });
        setError("");

        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Failed to submit application.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2 style={{ color: "white" }}>Become a Mentor</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="expertise" placeholder="Expertise" value={formData.expertise} onChange={handleChange} required />
        <input 
          type="text" 
          name="experience" 
          placeholder="Years of Experience" 
          value={formData.experience} 
          onChange={handleChange} 
          required 
        />
        <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required />
        <input type="url" name="linkedin" placeholder="LinkedIn Profile (Optional)" value={formData.linkedin} onChange={handleChange} />
        <input type="text" name="resume" placeholder="Resume Link" value={formData.resume} onChange={handleChange} required />
        <button type="submit">Apply to Become a Mentor</button>
      </form>
    </div>
  );
};

export default MentorApplication;
