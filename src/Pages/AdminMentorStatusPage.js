// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminMentorStatusPage = () => {
//   const [mentors, setMentors] = useState([]);
//   const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin email
//   const userEmail = localStorage.getItem("userEmail"); // Get the logged-in user's email
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the logged-in user is an admin
//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admin can change mentor status.");
//       navigate("/"); // Redirect to home page
//       return;
//     }

//     // Fetch mentor applications
//     fetch("http://localhost:5000/mentor-applications")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setMentors(data);
//         } else {
//           console.error("Expected an array but received:", data);
//         }
//       })
//       .catch((err) => console.error("Error fetching mentors:", err));
//   }, [userEmail, adminEmail, navigate]);

//   const handleStatusChange = async (email, status) => {
//     try {
//       const response = await fetch("http://localhost:5000/update-status", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, status }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Status updated successfully");
//         setMentors((prevMentors) =>
//           prevMentors.map((mentor) =>
//             mentor.email === email ? { ...mentor, status } : mentor
//           )
//         );
//       } else {
//         alert(data.message || "Failed to update status");
//       }
//     } catch (err) {
//       console.error("Error updating mentor status:", err);
//       alert("Error updating status.");
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Mentor Applications</h2>
//       {mentors.length === 0 ? (
//         <p>No mentor applications available.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mentors.map((mentor) => (
//               <tr key={mentor.email}>
//                 <td>{mentor.email}</td>
//                 <td>{mentor.status}</td>
//                 <td>
//                   {mentor.status === "Pending" ? (
//                     <>
//                       <button onClick={() => handleStatusChange(mentor.email, "Approved")}>Approve</button>
//                       <button onClick={() => handleStatusChange(mentor.email, "Rejected")}>Reject</button>
//                     </>
//                   ) : (
//                     <span>{mentor.status}</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminMentorStatusPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Components/Footer";

// const AdminMentorStatusPage = () => {
//   const [mentors, setMentors] = useState([]);
//   const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin email
//   const userEmail = localStorage.getItem("userEmail"); // Get the logged-in user's email
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the logged-in user is an admin
//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admin can change mentor status.");
//       navigate("/"); // Redirect to home page
//       return;
//     }

//     // Fetch mentor applications
//     fetch("https://virtual-backend-4.onrender.com/mentor-applications")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setMentors(data);
//         } else {
//           console.error("Expected an array but received:", data);
//         }
//       })
//       .catch((err) => console.error("Error fetching mentors:", err));
//   }, [userEmail, adminEmail, navigate]);

//   // ✅ Handle Approve/Reject actions
//   const handleStatusChange = async (email, status) => {
//     try {
//       const response = await fetch("https://virtual-backend-4.onrender.com/update-status", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, status }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Status updated successfully");

//         setMentors((prevMentors) =>
//           prevMentors.map((mentor) =>
//             mentor.email === email
//               ? { ...mentor, status, isAvailable: status === "Approved" } // Set availability on approval
//               : mentor
//           )
//         );
//       } else {
//         alert(data.message || "Failed to update status");
//       }
//     } catch (err) {
//       console.error("Error updating mentor status:", err);
//       alert("Error updating status.");
//     }
//   };

//   // ✅ Handle Availability Toggle (for Approved mentors)
//   const toggleAvailability = async (email, currentAvailability) => {
//     try {
//       const response = await fetch("https://virtual-backend-4.onrender.com/update-availability", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, isAvailable: !currentAvailability }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Availability updated successfully");

//         setMentors((prevMentors) =>
//           prevMentors.map((mentor) =>
//             mentor.email === email ? { ...mentor, isAvailable: !currentAvailability } : mentor
//           )
//         );
//       } else {
//         alert(data.message || "Failed to update availability");
//       }
//     } catch (err) {
//       console.error("Error updating availability:", err);
//       alert("Error updating availability.");
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Mentor Applications</h2>
//       {mentors.length === 0 ? (
//         <p>No mentor applications available.</p>
//       ) : (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Action</th>
//               <th>Availability</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mentors.map((mentor) => (
//               <tr key={mentor.email}>
//                 <td>{mentor.email}</td>
//                 <td>{mentor.status}</td>
//                 <td>
//                   {mentor.status === "Pending" ? (
//                     <>
//                       <button onClick={() => handleStatusChange(mentor.email, "Approved")}>
//                         Approve
//                       </button>
//                       <button onClick={() => handleStatusChange(mentor.email, "Rejected")}>
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     <span>{mentor.status}</span>
//                   )}
//                 </td>
//                 <td>
//                   {mentor.status === "Approved" ? (
//                     <button onClick={() => toggleAvailability(mentor.email, mentor.isAvailable)}>
//                       {mentor.isAvailable ? "Set Unavailable" : "Set Available"}
//                     </button>
//                   ) : (
//                     <span>Not Available</span> // Rejected mentors cannot become available
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
  
//     </div>
//   );
// };

// export default AdminMentorStatusPage;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const AdminMentorStatusPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin email
  const userEmail = localStorage.getItem("userEmail"); // Get logged-in user's email
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail !== adminEmail) {
      navigate("/"); // Redirect non-admin users immediately
      return;
    }

    // Fetch mentor applications
    fetch("https://virtual-backend-4.onrender.com/mentor-applications")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMentors(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((err) => console.error("Error fetching mentors:", err))
      .finally(() => setLoading(false)); // Stop loading
  }, [userEmail, navigate]);

  // ✅ Handle Approve/Reject actions
  const handleStatusChange = async (email, status) => {
    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setMentors((prevMentors) =>
        prevMentors.map((mentor) =>
          mentor.email === email ? { ...mentor, status, isAvailable: status === "Approved" } : mentor
        )
      );

      alert(`Mentor status updated to "${status}"`);
    } catch (err) {
      console.error("Error updating mentor status:", err);
      alert(err.message);
    }
  };

  // ✅ Handle Availability Toggle (for Approved mentors)
  const toggleAvailability = async (email, currentAvailability) => {
    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/update-availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isAvailable: !currentAvailability }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update availability");
      }

      setMentors((prevMentors) =>
        prevMentors.map((mentor) =>
          mentor.email === email ? { ...mentor, isAvailable: !currentAvailability } : mentor
        )
      );

      alert("Availability updated successfully");
    } catch (err) {
      console.error("Error updating availability:", err);
      alert(err.message);
    }
  };

  if (userEmail !== adminEmail) {
    return null; // Prevent rendering before redirection
  }

  return (
    <div>
      <h2>Manage Mentor Applications</h2>
      {loading ? (
        <p>Loading mentor applications...</p>
      ) : mentors.length === 0 ? (
        <p>No mentor applications available.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((mentor) => (
              <tr key={mentor.email}>
                <td>{mentor.email}</td>
                <td>{mentor.status}</td>
                <td>
                  {mentor.status === "Pending" ? (
                    <>
                      <button onClick={() => handleStatusChange(mentor.email, "Approved")}>Approve</button>
                      <button onClick={() => handleStatusChange(mentor.email, "Rejected")}>Reject</button>
                    </>
                  ) : (
                    <span>{mentor.status}</span>
                  )}
                </td>
                <td>
                  {mentor.status === "Approved" ? (
                    <button onClick={() => toggleAvailability(mentor.email, mentor.isAvailable)}>
                      {mentor.isAvailable ? "Set Unavailable" : "Set Available"}
                    </button>
                  ) : (
                    <span>Not Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminMentorStatusPage;
