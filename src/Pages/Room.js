// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import io from "socket.io-client";
// import "../pagesCSS/Room.css";

// const socket = io("http://localhost:5000");

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const videoRef = useRef(null);
//   const localStream = useRef(null);
//   const [remoteStreams, setRemoteStreams] = useState([]);

//   useEffect(() => {
//     // Get user media (local stream)
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localStream.current = stream;
//         videoRef.current.srcObject = stream;

//         // Emit to the server that the user has joined the room
//         socket.emit("join-room", roomId);

//         // Listen for remote streams
//         socket.on("user-joined", (userId) => {
//           // When a new user joins, create a peer connection and add their stream
//           handleNewUser(userId);
//         });

//         socket.on("receive-message", (message) => {
//           setMessages((prev) => [...prev, message]);
//         });

//         return () => {
//           socket.disconnect();
//         };
//       });

//     return () => {
//       if (localStream.current) {
//         localStream.current.getTracks().forEach((track) => track.stop()); // Stop all media tracks
//       }
//     };
//   }, [roomId]);

//   const handleNewUser = (userId) => {
//     // Create a new peer connection for the new user
//     const peerConnection = new RTCPeerConnection();

//     // Add the local stream to the peer connection
//     localStream.current.getTracks().forEach((track) => {
//       peerConnection.addTrack(track, localStream.current);
//     });

//     peerConnection.ontrack = (event) => {
//       // When a remote stream is added, update the state
//       const remoteStream = event.streams[0];
//       setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);
//     };

//     // Emit a signal to the server to send an offer to the new user (not shown here for brevity)
//     socket.emit("new-user", userId);
//   };

//   const sendMessage = () => {
//     if (newMessage.trim() === "") return;
//     socket.emit("send-message", { roomId, message: newMessage });
//     setMessages([...messages, { text: newMessage, sender: "You" }]);
//     setNewMessage("");
//   };

//   const toggleMute = () => {
//     const audioTracks = localStream.current.getAudioTracks();
//     audioTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsMuted(!isMuted);
//   };

//   const toggleCamera = () => {
//     const videoTracks = localStream.current.getVideoTracks();
//     videoTracks.forEach((track) => (track.enabled = !track.enabled));
//     setIsCameraOn(!isCameraOn);
//   };


// const toggleScreenShare = async () => {
//     try {
//       if (!isScreenSharing) {
//         const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         videoRef.current.srcObject = stream;
//         setIsScreenSharing(true);
//       } else {
//         videoRef.current.srcObject = localStream.current;
//         setIsScreenSharing(false);
//       }
//     } catch (err) {
//       if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
//         console.error("Screen sharing permission denied by the user.");
//         // Handle the error gracefully (e.g., show a message or do nothing)
//         alert("You need to allow screen sharing to share your screen.");
//       } else {
//         console.error("Error accessing screen sharing:", err);
//       }
//     }
//   };
  

//   const handleLeaveMeeting = () => {
//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => track.stop());
//     }
//     socket.emit("leave-room", roomId);
//     navigate("/");
//   };

//   return (
//     <div className="room-container">
//       {/* Video Section */}
//       <div className="video-section">
//         <div className="video-grid">
//           <div className="video-box">
//             <video ref={videoRef} autoPlay playsInline></video>
//           </div>
//           {remoteStreams.map((stream, index) => (
//             <div className="video-box" key={index}>
//               <video autoPlay playsInline srcObject={stream}></video>
//             </div>
//           ))}
//         </div>
//         {/* Control Buttons */}
//         <div className="controls">
//           <button className="control-btn" onClick={toggleMute}>
//             {isMuted ? "Unmute" : "Mute"}
//           </button>
//           <button className="control-btn" onClick={toggleCamera}>
//             {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
//           </button>
//           <button className="control-btn" onClick={toggleScreenShare}>
//             {isScreenSharing ? "Stop Sharing" : "Share Screen"}
//           </button>
//           <button className="control-btn leave-btn" onClick={handleLeaveMeeting}>
//             Leave Meeting
//           </button>
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="chat-section">
//         <div className="chat-box">
//           {messages.map((msg, index) => (
//             <p key={index}>
//               <strong>{msg.sender}:</strong> {msg.text}
//             </p>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Room;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import "../pagesCSS/Room.css";
import Footer from "../Components/Footer";

const socket = io("https://virtual-backend-4.onrender.com");

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [handRaised, setHandRaised] = useState(false);
  const videoRef = useRef(null);
  const localStream = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState({});

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream.current = stream;
        videoRef.current.srcObject = stream;

        socket.emit("join-room", { roomId, userId: socket.id });

        socket.on("user-joined", (userId) => {
          setParticipants((prev) => [...prev, userId]);
          handleNewUser(userId);
        });

        socket.on("receive-message", (message) => {
          setMessages((prev) => [...prev, message]);
        });

        socket.on("hand-raised", (userId) => {
          alert(`${userId} raised their hand`);
          setParticipants((prev) =>
            prev.map((p) => (p === userId ? `${p} ✋` : p))
          );
        });

        socket.on("user-left", (userId) => {
          setParticipants((prev) => prev.filter((p) => p !== userId));
          setRemoteStreams((prev) => {
            const newStreams = { ...prev };
            delete newStreams[userId];
            return newStreams;
          });
        });

        return () => {
          socket.disconnect();
        };
      });

    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomId]);

  const handleNewUser = (userId) => {
    const peerConnection = new RTCPeerConnection();

    localStream.current.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream.current);
    });

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      setRemoteStreams((prev) => ({ ...prev, [userId]: remoteStream }));
    };

    socket.emit("new-user", userId);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    socket.emit("send-message", { roomId, message: newMessage });
    setMessages([...messages, { text: newMessage, sender: "You" }]);
    setNewMessage("");
  };

  const toggleMute = () => {
    const audioTracks = localStream.current.getAudioTracks();
    audioTracks.forEach((track) => (track.enabled = !track.enabled));
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    const videoTracks = localStream.current.getVideoTracks();
    videoTracks.forEach((track) => (track.enabled = !track.enabled));
    setIsCameraOn(!isCameraOn);
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        setIsScreenSharing(true);
      } else {
        videoRef.current.srcObject = localStream.current;
        setIsScreenSharing(false);
      }
    } catch (err) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        alert("You need to allow screen sharing.");
      }
    }
  };

  const handleHandRaise = () => {
    setHandRaised(!handRaised);
    socket.emit("raise-hand", { roomId, userId: socket.id });
  };

  const handleLeaveMeeting = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    socket.emit("leave-room", { roomId, userId: socket.id });
    navigate("/");
  };

  return (
    <div className="room-container">
      {/* Video Section */}
      <div className="video-section">
        <div className="video-grid">
          <div className="video-box">
            <video ref={videoRef} autoPlay playsInline></video>
            {handRaised && <span className="hand-raised">✋</span>}
          </div>
          {Object.entries(remoteStreams).map(([userId, stream]) => (
            <div className="video-box" key={userId}>
              <video autoPlay playsInline srcObject={stream}></video>
            </div>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="controls">
          <button className="control-btn" onClick={toggleMute}>
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button className="control-btn" onClick={toggleCamera}>
            {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
          </button>
          <button className="control-btn" onClick={toggleScreenShare}>
            {isScreenSharing ? "Stop Sharing" : "Share Screen"}
          </button>
          <button className="control-btn hand-btn" onClick={handleHandRaise}>
            {handRaised ? "Lower Hand" : "Raise Hand"}
          </button>
          <button className="control-btn leave-btn" onClick={handleLeaveMeeting}>
            Leave Meeting
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Participants List */}
      <div className="participants-list">
        <h3>Participants</h3>
        <ul>
          {participants.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default Room;

