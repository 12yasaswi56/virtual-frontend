
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Footer from "../Components/Footer";

const MentorApplication = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [expertise, setExpertise] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !expertise) {
      setError("Please fill in all the fields!");
      return;
    }

    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/mentor-apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, expertise }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Your application has been submitted successfully!");
        setName("");
        setEmail("");
        setExpertise("");
        setError("");

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Area of Expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          required
        />
        <button type="submit">Apply to Become Mentor</button>
      </form>
      
    </div>
  );
};

export default MentorApplication;
