
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../pagesCSS/Slots.css";

// const Slots = () => {
//   const navigate = useNavigate();
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch available slots from the backend
//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/slots");
//         const data = await response.json();

//         if (response.ok) {
//           console.log("Fetched slots:", data); // Debugging log
//           setSlots(data);
//         } else {
//           setError("Failed to fetch slots");
//         }
//       } catch (error) {
//         console.error("Error fetching slots:", error);
//         setError("Error fetching slots. Try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSlots();
//   }, []);

//   // Function to book a slot
//   const handleBookSlot = async (slotId) => {
//     console.log("Attempting to book slot with ID:", slotId); // Debugging log

//     if (!slotId) {
//       alert("Slot ID is missing. Please try again.");
//       return;
//     }

//     const userEmail = localStorage.getItem("userEmail");
//     if (!userEmail) {
//       alert("User email not found. Please log in again.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/book-slot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ slotId, email: userEmail }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Slot booked successfully!");
//         navigate("/");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error booking slot:", error);
//       alert("Booking failed. Please try again.");
//     }
//   };

//   return (
//     <div className="slots-container">
//       <h2>Available Interview Slots</h2>
//       {loading && <p>Loading slots...</p>}
//       {error && <p className="error">{error}</p>}
//       <div className="slots-grid">
//         {slots.length > 0 ? (
//           slots.map((slot) => (
//             <div key={slot._id} className="slot-card">
//               <span>{slot.date} - {slot.time}</span>
//               <button onClick={() => handleBookSlot(slot._id)}>Book Slot</button>
//             </div>
//           ))
//         ) : (
//           <p>No slots available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Slots;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../pagesCSS/Slots.css";
// import Footer from "../Components/Footer";

// const Slots = () => {
//   const navigate = useNavigate();
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const response = await fetch("https://virtual-backend-4.onrender.com/slots");
//         const data = await response.json();
//         console.log("Fetched slots:", data); // Check if startTime and endTime exist
//         if (response.ok) {
//           setSlots(data);
//         } else {
//           setError("Failed to fetch slots");
//         }
//       } catch (error) {
//         console.error("Error fetching slots:", error);
//         setError("Error fetching slots. Try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchSlots();
//   }, []);
  

//   // Function to book a slot
//   const handleBookSlot = async (slotId) => {
//     console.log("Attempting to book slot with ID:", slotId);

//     if (!slotId) {
//       alert("Slot ID is missing. Please try again.");
//       return;
//     }

//     const userEmail = localStorage.getItem("userEmail");
//     if (!userEmail) {
//       alert("User email not found. Please log in again.");
//       navigate("/login");
//       return;
//     }

//     // Confirm booking action
//     const confirmBooking = window.confirm("Are you sure you want to book this slot?");
//     if (!confirmBooking) return;

//     try {
//       const response = await fetch("https://virtual-backend-4.onrender.com/book-slot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ slotId, email: userEmail }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("✅ Slot booked successfully! Confirmation email has been sent.");
//         navigate("/");
//       } else {
//         alert(`❌ ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error booking slot:", error);
//       alert("⚠️ Booking failed. Please try again.");
//     }
//   };

//   return (
//     <div className="slots-container">
//       <h2>📅 Available Interview Slots</h2>
//       {loading && <p className="loading">Loading slots...</p>}
//       {error && <p className="error">{error}</p>}

//       <div className="slots-grid">
//         {slots.length > 0 ? (
//           slots.map((slot) => (
          

//             <div key={slot._id} className="slot-card">
//   <span>📅 {slot.date} - 🕒 {slot.startTime} - {slot.endTime}</span>
//   <button onClick={() => handleBookSlot(slot._id)}>Book Slot</button>
// </div>

//           ))
//         ) : (
//           <p className="no-slots">No slots available</p>
//         )}
//       </div>
     
//     </div>
//   );
// };

// export default Slots;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pagesCSS/Slots.css";
import Footer from "../Components/Footer";

const Slots = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch("https://virtual-backend-4.onrender.com/slots");
        const data = await response.json();
        
        console.log("Fetched slots:", data); // ✅ Debugging: Check if data contains _id, startTime, endTime

        if (response.ok) {
          if (Array.isArray(data)) {
            setSlots(data);
          } else {
            setError("Unexpected response format from server");
          }
        } else {
          setError("Failed to fetch slots");
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setError("Error fetching slots. Try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchSlots();
  }, []);

  // Function to book a slot
  const handleBookSlot = async (slotId) => {
    console.log("Attempting to book slot with ID:", slotId);

    if (!slotId) {
      alert("⚠️ Slot ID is missing. Please try again.");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("⚠️ User email not found. Please log in again.");
      navigate("/login");
      return;
    }

    // Confirm booking action
    const confirmBooking = window.confirm("Are you sure you want to book this slot?");
    if (!confirmBooking) return;

    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, email: userEmail }),
      });

      const data = await response.json();
      console.log("Booking response:", data); // ✅ Debugging: Check the response

      if (response.ok) {
        alert("✅ Slot booked successfully! Confirmation email has been sent.");
        navigate("/");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("⚠️ Booking failed. Please try again.");
    }
  };

  return (
    <div className="slots-container">
      <h2>📅 Available Interview Slots</h2>
      {loading && <p className="loading">Loading slots...</p>}
      {error && <p className="error">{error}</p>}

      <div className="slots-grid">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <div key={slot?._id} className="slot-card">
              <span>📅 {slot?.date} - 🕒 {slot?.startTime} - {slot?.endTime}</span>
              <button onClick={() => handleBookSlot(slot?._id)}>Book Slot</button>
            </div>
          ))
        ) : (
          <p className="no-slots">No slots available</p>
        )}
      </div>

    </div>
  );
};

export default Slots;
