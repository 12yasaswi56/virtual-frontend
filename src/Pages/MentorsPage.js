import React, { useState, useEffect } from "react";
import "../pagesCSS/MentorsPage.css"
const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all mentors
    fetch("https://virtual-backend-4.onrender.com/mentor-applications")
      .then((res) => res.json())
      .then((data) => {
        // Filter only "Approved" mentors
        const approvedMentors = data.filter(mentor => mentor.status === "Approved");
        setMentors(approvedMentors);
      })
      .catch((err) => console.error("Error fetching mentors:", err))
      .finally(() => setLoading(false)); // Stop loading
  }, []);

  return (
    <div>
      <h2>Approved Mentors</h2>
      {loading ? (
        <p>Loading mentors...</p>
      ) : mentors.length === 0 ? (
        <p>No approved mentors available.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Expertise</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((mentor) => (
              <tr key={mentor.email}>
                <td>{mentor.name}</td>
                <td>{mentor.email}</td>
                <td>{mentor.expertise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MentorsPage;
