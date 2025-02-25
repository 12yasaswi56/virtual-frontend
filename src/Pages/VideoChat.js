
// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import { Mic, MicOff, Video, VideoOff, Monitor, MonitorOff, MessageCircle, Users, LogOut } from "lucide-react"; // ✅ Import Icons
// import "../pagesCSS/VideoChat.css"; // ✅ Import CSS

// const socket = io("http://localhost:5000");

// const VideoChat = ({ roomID }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [screenSharing, setScreenSharing] = useState(false);
//   const [stream, setStream] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//     });

//     socket.emit("join-room", roomID);

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((userStream) => {
//         localVideoRef.current.srcObject = userStream;
//         setStream(userStream);
//         userStream.getTracks().forEach(track => pc.addTrack(track, userStream));
//       })
//       .catch(err => console.error("Error accessing media devices:", err));

//     socket.on("user-joined", async () => {
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       socket.emit("offer", { offer, room: roomID });
//     });

//     socket.on("offer", async ({ offer }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit("answer", { answer, room: roomID });
//     });

//     socket.on("answer", async ({ answer }) => {
//       await pc.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     socket.on("ice-candidate", async (candidate) => {
//       await pc.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, room: roomID });
//       }
//     };

//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     socket.on("chat-message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       pc.close();
//       socket.off("user-joined");
//       socket.off("offer");
//       socket.off("answer");
//       socket.off("ice-candidate");
//       socket.off("chat-message");
//     };
//   }, [roomID]);

//   // 📌 Toggle Mute
//   const toggleMute = () => {
//     if (stream) {
//       const audioTrack = stream.getAudioTracks()[0];
//       audioTrack.enabled = !audioTrack.enabled;
//       setIsMuted(!audioTrack.enabled);
//     }
//   };

//   // 📌 Toggle Camera
//   const toggleCamera = () => {
//     if (stream) {
//       const videoTrack = stream.getVideoTracks()[0];
//       videoTrack.enabled = !videoTrack.enabled;
//       setIsCameraOn(videoTrack.enabled);
//     }
//   };

//   // 📌 Toggle Screen Sharing
//   const toggleScreenShare = async () => {
//     if (!screenSharing) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         const sender = stream.getTracks().find(track => track.kind === "video");
//         sender.replaceTrack(screenStream.getVideoTracks()[0]);
//         setScreenSharing(true);
//       } catch (err) {
//         console.error("Error sharing screen:", err);
//       }
//     } else {
//       const userStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       const sender = stream.getTracks().find(track => track.kind === "video");
//       sender.replaceTrack(userStream.getVideoTracks()[0]);
//       setScreenSharing(false);
//     }
//   };

//   // 📌 Send Chat Message
//   const sendMessage = () => {
//     if (newMessage.trim()) {
//       socket.emit("chat-message", newMessage);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="video-chat-container">
//       <div className="video-section">
//         <video ref={localVideoRef} autoPlay playsInline muted className="video-box" />
//         <video ref={remoteVideoRef} autoPlay playsInline className="video-box" />
//         <div className="controls">
//           <button onClick={toggleMute}>
//             {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
//           </button>
//           <button onClick={toggleCamera}>
//             {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
//           </button>
//           <button onClick={toggleScreenShare}>
//             {screenSharing ? <MonitorOff size={24} /> : <Monitor size={24} />}
//           </button>
//         </div>
//       </div>
      
//       {/* 📌 Right Sidebar with Meeting Info */}
//       <div className="side-panel">
//         <h3>Meeting Room</h3>
//         <p>Room ID: {roomID}</p>
//         <h4><Users size={20} /> Participants</h4>
//         <ul>
//           <li>You</li>
//           <li>Guest</li>
//         </ul>

//         <h4><MessageCircle size={20} /> Chat</h4>
//         <div className="chat-box">
//           {messages.map((msg, index) => (
//             <p key={index}>{msg}</p>
//           ))}
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>

//         <button className="leave-button">
//           <LogOut size={20} /> Leave Meeting
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoChat;


// import React, { useState, useRef, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5000"); // Change to your backend server URL

// const VideoChat = () => {
//   const [roomId, setRoomId] = useState("");
//   const [joinedRoom, setJoinedRoom] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);

//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnectionRef = useRef(null);
//   const localStreamRef = useRef(null);

//   useEffect(() => {
//     // Getting user media (camera & mic)
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localStreamRef.current = stream;
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//       })
//       .catch((error) => console.error("Error accessing media devices:", error));

//     return () => {
//       // Clean up media stream when component unmounts
//       if (localStreamRef.current) {
//         localStreamRef.current.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const handleJoinRoom = () => {
//     if (roomId.trim() === "") {
//       alert("Enter a valid Room ID");
//       return;
//     }
//     socket.emit("join-room", roomId);
//     setJoinedRoom(true);
//   };

//   const handleCreateRoom = () => {
//     const newRoomId = Math.random().toString(36).substring(2, 10); // Generate random ID
//     setRoomId(newRoomId);
//     socket.emit("create-room", newRoomId);
//     setJoinedRoom(true);
//   };

//   const toggleMute = () => {
//     if (localStreamRef.current) {
//       localStreamRef.current.getAudioTracks()[0].enabled = isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const toggleCamera = () => {
//     if (localStreamRef.current) {
//       localStreamRef.current.getVideoTracks()[0].enabled = !isCameraOn;
//       setIsCameraOn(!isCameraOn);
//     }
//   };

//   const startScreenShare = async () => {
//     if (!isScreenSharing) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         const sender = peerConnectionRef.current
//           ?.getSenders()
//           .find((s) => s.track.kind === "video");
//         if (sender) sender.replaceTrack(screenStream.getVideoTracks()[0]);
//         setIsScreenSharing(true);
//       } catch (error) {
//         console.error("Error sharing screen:", error);
//       }
//     } else {
//       const sender = peerConnectionRef.current
//         ?.getSenders()
//         .find((s) => s.track.kind === "video");
//       if (sender) sender.replaceTrack(localStreamRef.current.getVideoTracks()[0]);
//       setIsScreenSharing(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#121212", color: "#fff" }}>
//       <h2>Virtual Incubator - Video Chat</h2>

//       {!joinedRoom ? (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Room ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             style={{ padding: "10px", marginRight: "10px" }}
//           />
//           <button onClick={handleJoinRoom} style={{ padding: "10px" }}>Join Meeting</button>
//           <button onClick={handleCreateRoom} style={{ padding: "10px", marginLeft: "10px" }}>
//             Start New Meeting
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h3>Meeting Room</h3>
//           <p>Room ID: {roomId}</p>

//           <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
//             <video ref={localVideoRef} autoPlay muted playsInline style={{ width: "300px", borderRadius: "10px" }} />
//             <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px", borderRadius: "10px" }} />
//           </div>

//           <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//             <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
//             <button onClick={toggleCamera}>{isCameraOn ? "Turn Camera Off" : "Turn Camera On"}</button>
//             <button onClick={startScreenShare}>{isScreenSharing ? "Stop Sharing" : "Share Screen"}</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoChat;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const VideoChat = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      alert("Enter a valid Room ID");
      return;
    }
    navigate(`/room/${roomId}`);
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10); // Generate random Room ID
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#121212", color: "#fff" }}>
      <h2 style={{ color: "white" }}>Virtual Incubator - Video Chat</h2>



      <div>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button onClick={handleJoinRoom} style={{ padding: "10px" }}>Join Meeting</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleCreateRoom} style={{ padding: "10px" }}>
          Start New Meeting
        </button>
      </div>
      
    </div>
  );
};

export default VideoChat;
