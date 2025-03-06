
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




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// //import "../pagesCSS/AdminMeetings.css";
// import Footer from "../Components/Footer";

// const AdminMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");
//     const adminEmail = "yasaswikopparapu624@gmail.com"; // This should be the admin email from your database or config

//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admins can view this page.");
//       navigate("/"); // Redirect to home page or login page
//       return;
//     }

//     fetch("https://virtual-backend-4.onrender.com/AdminMeetings")
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
//               {/* //<strong>Room ID:</strong> {meeting.roomId} <br /> */}
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
import Footer from "../Components/Footer";
import "../pagesCSS/AdminMeeting.css"
const AdminMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin Email

    if (userEmail !== adminEmail) {
      alert("Access Denied! Only Admins can view this page.");
      navigate("/"); // Redirect to home page or login page
      return;
    }

    fetch("https://virtual-backend-4.onrender.com/AdminMeetings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Meetings Data:", data); // Debugging log

        if (Array.isArray(data)) {
          setMeetings(data);
        } else {
          console.error("Expected an array but received:", data);
          setMeetings([]);
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
          {meetings.map((meeting, index) => (
            <li key={meeting.meetingLink || index}>
              <strong>Date:</strong> {meeting.date || "📅 Not Available"} <br />
              <strong>Start Time:</strong> {meeting.startTime || "⏳ Not Set"} <br />
              <strong>End Time:</strong> {meeting.endTime || "⏳ Not Set"} <br />
              <strong>Booked By:</strong> {meeting.bookedBy || "Unknown"} <br />

              {meeting.meetingLink ? (
                <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                  🔗 Join Meeting
                </a>
              ) : (
                <p style={{ color: "red" }}>❌ Meeting link unavailable</p>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};  

export default AdminMeetings;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Components/Footer";

// const AdminMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");
//     const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin Email

//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admins can view this page.");
//       navigate("/"); // Redirect to home page or login page
//       return;
//     }

//     fetch("https://virtual-backend-4.onrender.com/AdminMeetings")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Meetings Data:", data); // Debugging log

//         if (Array.isArray(data)) {
//           setMeetings(data);
//         } else {
//           console.error("Expected an array but received:", data);
//           setMeetings([]);
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
//           {meetings.map((meeting, index) => (
//             <li key={meeting.roomId || index}>
//               <strong>Date:</strong> {meeting.date || "📅 Not Available"} <br />
//               <strong>Start Time:</strong> {meeting.startTime || "⏳ Not Set"} <br />
//               <strong>End Time:</strong> {meeting.endTime || "⏳ Not Set"} <br />
//               <strong>Booked By:</strong> {meeting.bookedBy || "Unknown"} <br />

//               {meeting.roomId ? (
//                 <a href={`/room/${meeting.roomId}`} target="_blank" rel="noopener noreferrer">
//                   🔗 Join Meeting
//                 </a>
//               ) : (
//                 <p style={{ color: "red" }}>❌ Room link unavailable</p>
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default AdminMeetings;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Components/Footer";

// const AdminMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");
//     const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin Email

//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admins can view this page.");
//       navigate("/"); // Redirect to home page or login page
//       return;
//     }

//     fetch("https://virtual-backend-4.onrender.com/AdminMeetings")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Meetings Data:", data); // Debugging log

//         if (Array.isArray(data)) {
//           setMeetings(data);
//         } else {
//           console.error("Expected an array but received:", data);
//           setMeetings([]);
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
//           {meetings.map((meeting, index) => (
//             <li key={meeting.roomId || index}>
//               <strong>Date:</strong> {meeting.slotDate || "📅 Not Available"} <br />
//               <strong>Start Time:</strong> {meeting.slotStartTime || "⏳ Not Set"} <br />
//               <strong>End Time:</strong> {meeting.slotEndTime || "⏳ Not Set"} <br />
//               <strong>Booked By:</strong> {meeting.bookedBy || "Unknown"} <br />
//               <strong>Room ID:</strong> {meeting.roomId ? meeting.roomId : "🚫 Missing"} <br />

//               {meeting.roomId ? (
//                 <a href={`/room/${meeting.roomId}`} target="_blank" rel="noopener noreferrer">
//                   🔗 Join Meeting
//                 </a>
//               ) : (
//                 <p style={{ color: "red" }}>❌ Room link unavailable</p>
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default AdminMeetings;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Components/Footer";

// const AdminMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");
//     const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin Email

//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admins can view this page.");
//       navigate("/"); // Redirect to home page or login page
//       return;
//     }

//     fetch("https://virtual-backend-4.onrender.com/AdminMeetings")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Meetings Data:", data); // Debugging log

//         // Ensure the response is an array before setting state
//         if (Array.isArray(data)) {
//           setMeetings(data);
//         } else {
//           console.error("Expected an array but received:", data);
//           setMeetings([]); // Avoid breaking UI if data is invalid
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
//           {meetings.map((meeting, index) => (
//             <li key={meeting.roomId || index}>
//               <strong>Date:</strong> {meeting.date || "N/A"} <br />
//               <strong>Time:</strong> {meeting.time ? meeting.time : "Time not available"} <br />
//               <strong>Booked By:</strong> {meeting.bookedBy || "Unknown"} <br />
//               <strong>Room ID:</strong> {meeting.roomId ? meeting.roomId : "Room ID not available"} <br />
//               {meeting.roomId ? (
//                 <a href={`/room/${meeting.roomId}`} target="_blank" rel="noopener noreferrer">
//                   Join Meeting
//                 </a>
//               ) : (
//                 <p>Room link not available</p>
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default AdminMeetings;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "../Components/Footer";

// const AdminMeetings = () => {
//   const [meetings, setMeetings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");
//     const adminEmail = "yasaswikopparapu624@gmail.com"; // Admin Email

//     if (userEmail !== adminEmail) {
//       alert("Access Denied! Only Admins can view this page.");
//       navigate("/"); // Redirect to home page or login page
//       return;
//     }

//     fetch("https://virtual-backend-4.onrender.com/AdminMeetings")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Meetings Data:", data); // Debugging log

//         if (Array.isArray(data)) {
//           setMeetings(data);
//         } else {
//           console.error("Expected an array but received:", data);
//           setMeetings([]);
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
//           {meetings.map((meeting, index) => (
//             <li key={meeting.roomId || index}>
//               <strong>Date:</strong> {meeting.date || "N/A"} <br />
//               <strong>Time:</strong> {meeting.time ? meeting.time : "⏳ Time not set"} <br />
//               <strong>Booked By:</strong> {meeting.bookedBy || "Unknown"} <br />
//               <strong>Room ID:</strong> {meeting.roomId ? meeting.roomId : "🚫 Room ID missing"} <br />
              
//               {meeting.roomId ? (
//                 <a href={`/room/${meeting.roomId}`} target="_blank" rel="noopener noreferrer">
//                   🔗 Join Meeting
//                 </a>
//               ) : (
//                 <p style={{ color: "red" }}>❌ Room link unavailable</p>
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default AdminMeetings;
