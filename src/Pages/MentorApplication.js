import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MentorApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    expertise: "",
    experience: "",
    bio: "",
    linkedin: "",
    resume: "", // Resume as a link
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Fields
    if (Object.values(formData).some((field) => !field)) {
      setError("Please fill in all required fields!");
      return;
    }

    if (isNaN(formData.experience) || parseInt(formData.experience) < 1) {
      setError("Please enter a valid experience (at least 1 year).");
      return;
    }

    if (!formData.resume.startsWith("http")) {
      setError("Please enter a valid resume link (starting with http/https).");
      return;
    }

    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/mentor-apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

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

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(responseData.message || "Failed to submit application.");
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
        <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required />
        <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required />
        <input type="url" name="linkedin" placeholder="LinkedIn Profile (Optional)" value={formData.linkedin} onChange={handleChange} />
        <input type="url" name="resume" placeholder="Resume Link (Google Drive, etc.)" value={formData.resume} onChange={handleChange} required />
        
        <button type="submit">Apply to Become a Mentor</button>
      </form>
    </div>
  );
};

export default MentorApplication;
