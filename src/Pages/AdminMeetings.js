
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// //import "../pagesCSS/AdminMeetings.css";
// const AdminMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const navigate = useNavigate();
//   const adminEmail = "yasaswikopparapu624@gmail.com"; // Replace with your admin email

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");

//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admins can view this page.");
//       navigate("/");
//       return;
//     }

//     fetch("http://localhost:5000/AdminMeetings")
//       .then((res) => res.json())
//       .then((data) => {
//         // Ensure the data is an array
//         if (Array.isArray(data)) {
//           setMeetings(data);
//         } else {
//           console.error("Expected an array but received:", data);
//         }
//       })
//       .catch((err) => console.error("Error fetching meetings:", err));
//   }, [navigate]);

//   return (
//     <div>
//       <h2>Scheduled Meetings</h2>
//       {meetings.length === 0 ? (
//         <p>No meetings scheduled.</p>
//       ) : (
//         <ul>
//           {meetings.map((meeting) => (
//             <li key={meeting.roomId}>
//               <strong>Date:</strong> {meeting.date} <br />
//               <strong>Time:</strong> {meeting.time} <br />
//               <strong>Booked By:</strong> {meeting.bookedBy} <br />
//               <strong>Room ID:</strong> {meeting.roomId} <br />
//               <a href={`/room/${meeting.roomId}`}>Join Meeting</a>
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AdminMeetings;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import "../pagesCSS/AdminMeetings.css";
import Footer from "../Components/Footer";

const AdminMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const adminEmail = "yasaswikopparapu624@gmail.com"; // This should be the admin email from your database or config

    if (userEmail !== adminEmail) {
      alert("Access Denied! Only Admins can view this page.");
      navigate("/"); // Redirect to home page or login page
      return;
    }

    fetch("http://localhost:5000/AdminMeetings")
      .then((res) => res.json())
      .then((data) => {
        // Ensure the data is an array
        if (Array.isArray(data)) {
          setMeetings(data);
        } else {
          console.error("Expected an array but received:", data);
        }
      })
      .catch((err) => console.error("Error fetching meetings:", err));
  }, [navigate]);

  return (
    <div>
      <h2>Scheduled Meetings</h2>
      {meetings.length === 0 ? (
        <p>No meetings scheduled.</p>
      ) : (
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.roomId}>
              <strong>Date:</strong> {meeting.date} <br />
              <strong>Time:</strong> {meeting.time} <br />
              <strong>Booked By:</strong> {meeting.bookedBy} <br />
              <strong>Room ID:</strong> {meeting.roomId} <br />
              <a href={`/room/${meeting.roomId}`}>Join Meeting</a>
              <hr />
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
};

export default AdminMeetings;
