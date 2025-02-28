<<<<<<< HEAD

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Footer from "../Components/Footer";

// const MentorApplication = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [expertise, setExpertise] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const navigate = useNavigate(); // Initialize navigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !expertise) {
//       setError("Please fill in all the fields!");
//       return;
//     }

//     try {
//       const response = await fetch("https://virtual-backend-4.onrender.com/mentor-apply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, expertise }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Your application has been submitted successfully!");
//         setName("");
//         setEmail("");
//         setExpertise("");
//         setError("");

//         // Redirect to home page after 2 seconds
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } else {
//         setError(data.message || "Failed to submit application.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
//       <h2 style={{ color: "white" }}>Become a Mentor</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Area of Expertise"
//           value={expertise}
//           onChange={(e) => setExpertise(e.target.value)}
//           required
//         />
//         <button type="submit">Apply to Become Mentor</button>
//       </form>
      
//     </div>
//   );
// };

// export default MentorApplication;


// Frontend: Mentor Application Form (MentorApplication.js)
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
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MentorApplication = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null); // New state for resume file
>>>>>>> 7180250 (Your commit message)
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
=======
  const navigate = useNavigate();

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]); // Only taking one file
>>>>>>> 7180250 (Your commit message)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (Object.values(formData).some((field) => !field)) {
      setError("Please fill in all required fields!");
      return;
    }
    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/mentor-apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
=======

    if (!name || !email || !expertise || !experience || !resume) {
      setError("Please fill in all fields and upload your resume!");
      return;
    }

    if (isNaN(experience) || parseInt(experience) < 1) {
      setError("Please enter valid experience (at least 1 year).");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("expertise", expertise);
    formData.append("experience", experience);
    formData.append("resume", resume); // Append the resume file

    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/mentor-apply", {
        method: "POST",
        body: formData, // Send FormData instead of JSON
>>>>>>> 7180250 (Your commit message)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Your application has been submitted successfully!");
<<<<<<< HEAD
        setFormData({ name: "", email: "", phone: "", expertise: "", experience: "", bio: "", linkedin: "", resume: "" });
        setError("");
        setTimeout(() => navigate("/"), 2000);
=======
        setName("");
        setEmail("");
        setExpertise("");
        setExperience("");
        setResume(null);
        setError("");

        setTimeout(() => {
          navigate("/");
        }, 2000);
>>>>>>> 7180250 (Your commit message)
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
<<<<<<< HEAD
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="expertise" placeholder="Expertise" value={formData.expertise} onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required />
        <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required />
        <input type="url" name="linkedin" placeholder="LinkedIn Profile (Optional)" value={formData.linkedin} onChange={handleChange} />
        <input type="text" name="resume" placeholder="Resume Link" value={formData.resume} onChange={handleChange} required />
        <button type="submit">Apply to Become a Mentor</button>
=======
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
        <input
          type="number"
          placeholder="Years of Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeChange}
          required
        />
        <button type="submit">Apply to Become Mentor</button>
>>>>>>> 7180250 (Your commit message)
      </form>
    </div>
  );
};

export default MentorApplication;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Components/Footer";

// const MentorApplication = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     expertise: "",
//     experience: "",
//     bio: "",
//     linkedin: "",
//     resume: "",
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Ensure experience is stored as a number
//     if (name === "experience") {
//       setFormData({ ...formData, [name]: value.replace(/\D/, "") }); // Only allows numbers
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Convert experience to number before sending
//     const updatedData = { ...formData, experience: Number(formData.experience) };

//     if (Object.values(updatedData).some((field) => !field)) {
//       setError("Please fill in all required fields!");
//       return;
//     }

//     try {
//       const response = await fetch("https://virtual-backend-4.onrender.com/mentor-apply", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Your application has been submitted successfully!");
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           expertise: "",
//           experience: "",
//           bio: "",
//           linkedin: "",
//           resume: "",
//         });
//         setError("");

//         setTimeout(() => navigate("/"), 2000);
//       } else {
//         setError(data.message || "Failed to submit application.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
//       <h2 style={{ color: "white" }}>Become a Mentor</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
//         <input type="text" name="expertise" placeholder="Expertise" value={formData.expertise} onChange={handleChange} required />
//         <input 
//           type="text" 
//           name="experience" 
//           placeholder="Years of Experience" 
//           value={formData.experience} 
//           onChange={handleChange} 
//           required 
//         />
//         <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} required />
//         <input type="url" name="linkedin" placeholder="LinkedIn Profile (Optional)" value={formData.linkedin} onChange={handleChange} />
//         <input type="text" name="resume" placeholder="Resume Link" value={formData.resume} onChange={handleChange} required />
//         <button type="submit">Apply to Become a Mentor</button>
//       </form>
//     </div>
//   );
// };

// export default MentorApplication;
