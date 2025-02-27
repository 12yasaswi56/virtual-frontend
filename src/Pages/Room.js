
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import io from "socket.io-client";
// import "../pagesCSS/Room.css";
// import Footer from "../Components/Footer";

// const socket = io("https://virtual-backend-4.onrender.com");

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [participants, setParticipants] = useState([]);
//   const [handRaised, setHandRaised] = useState(false);
//   const videoRef = useRef(null);
//   const localStream = useRef(null);
//   const [remoteStreams, setRemoteStreams] = useState({});

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localStream.current = stream;
//         videoRef.current.srcObject = stream;

//         socket.emit("join-room", { roomId, userId: socket.id });

//         socket.on("user-joined", (userId) => {
//           setParticipants((prev) => [...prev, userId]);
//           handleNewUser(userId);
//         });

//         socket.on("receive-message", (message) => {
//           setMessages((prev) => [...prev, message]);
//         });

//         socket.on("hand-raised", (userId) => {
//           alert(`${userId} raised their hand`);
//           setParticipants((prev) =>
//             prev.map((p) => (p === userId ? `${p} ✋` : p))
//           );
//         });

//         socket.on("user-left", (userId) => {
//           setParticipants((prev) => prev.filter((p) => p !== userId));
//           setRemoteStreams((prev) => {
//             const newStreams = { ...prev };
//             delete newStreams[userId];
//             return newStreams;
//           });
//         });

//         return () => {
//           socket.disconnect();
//         };
//       });

//     return () => {
//       if (localStream.current) {
//         localStream.current.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [roomId]);

//   const handleNewUser = (userId) => {
//     const peerConnection = new RTCPeerConnection();

//     localStream.current.getTracks().forEach((track) => {
//       peerConnection.addTrack(track, localStream.current);
//     });

//     peerConnection.ontrack = (event) => {
//       const remoteStream = event.streams[0];
//       setRemoteStreams((prev) => ({ ...prev, [userId]: remoteStream }));
//     };

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

//   const toggleScreenShare = async () => {
//     try {
//       if (!isScreenSharing) {
//         const stream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//         });
//         videoRef.current.srcObject = stream;
//         setIsScreenSharing(true);
//       } else {
//         videoRef.current.srcObject = localStream.current;
//         setIsScreenSharing(false);
//       }
//     } catch (err) {
//       if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
//         alert("You need to allow screen sharing.");
//       }
//     }
//   };

//   const handleHandRaise = () => {
//     setHandRaised(!handRaised);
//     socket.emit("raise-hand", { roomId, userId: socket.id });
//   };

//   const handleLeaveMeeting = () => {
//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => track.stop());
//     }
//     socket.emit("leave-room", { roomId, userId: socket.id });
//     navigate("/");
//   };

//   return (
//     <div className="room-container">
//       {/* Video Section */}
//       <div className="video-section">
//         <div className="video-grid">
//           <div className="video-box">
//             <video ref={videoRef} autoPlay playsInline></video>
//             {handRaised && <span className="hand-raised">✋</span>}
//           </div>
//           {Object.entries(remoteStreams).map(([userId, stream]) => (
//             <div className="video-box" key={userId}>
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
//           <button className="control-btn hand-btn" onClick={handleHandRaise}>
//             {handRaised ? "Lower Hand" : "Raise Hand"}
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

//       {/* Participants List */}
//       <div className="participants-list">
//         <h3>Participants</h3>
//         <ul>
//           {participants.map((p, index) => (
//             <li key={index}>{p}</li>
//           ))}
//         </ul>
//       </div>
      
//     </div>
//   );
// };

// export default Room;





// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import io from "socket.io-client";
// import "../pagesCSS/Room.css";
// import Footer from "../Components/Footer";

// const socket = io("https://virtual-backend-4.onrender.com");

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isMuted, setIsMuted] = useState(false);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [participants, setParticipants] = useState([]);
//   const [handRaised, setHandRaised] = useState(false);
//   const videoRef = useRef(null);
//   const localStream = useRef(null);
//   const peersRef = useRef({});

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localStream.current = stream;
//         videoRef.current.srcObject = stream;
//         socket.emit("join-room", { roomId, userId: socket.id });
//       });

//     socket.on("user-joined", ({ userId }) => {
//       setParticipants((prev) => [...prev, userId]);
//       createPeerConnection(userId);
//     });

//     socket.on("receive-message", ({ sender, message }) => {
//       setMessages((prev) => [...prev, { sender, text: message }]);
//     });

//     socket.on("hand-raised", (userId) => {
//       alert(`${userId} raised their hand`);
//     });

//     socket.on("user-left", (userId) => {
//       setParticipants((prev) => prev.filter((p) => p !== userId));
//       if (peersRef.current[userId]) {
//         peersRef.current[userId].close();
//         delete peersRef.current[userId];
//       }
//     });

//     return () => {
//       socket.disconnect();
//       if (localStream.current) {
//         localStream.current.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [roomId]);

//   const createPeerConnection = (userId) => {
//     const peer = new RTCPeerConnection();
//     peersRef.current[userId] = peer;
//     localStream.current.getTracks().forEach((track) => peer.addTrack(track, localStream.current));
//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("send-candidate", { userId, candidate: event.candidate });
//       }
//     };
//     peer.ontrack = (event) => {
//       // Display remote video/audio
//     };
//     socket.emit("new-user", userId);
//   };

//   const sendMessage = () => {
//     if (newMessage.trim() === "") return;
//     socket.emit("send-message", { roomId, sender: socket.id, message: newMessage });
//     setMessages([...messages, { sender: "You", text: newMessage }]);
//     setNewMessage("");
//   };
  

//   const toggleScreenShare = async () => {
//     try {
//       if (!isScreenSharing) {
//         const stream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//         });
//         videoRef.current.srcObject = stream;
//         setIsScreenSharing(true);
//       } else {
//         videoRef.current.srcObject = localStream.current;
//         setIsScreenSharing(false);
//       }
//     } catch (err) {
//       if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
//         alert("You need to allow screen sharing.");
//       }
//     }
//   };
  
//   const handleHandRaise = () => {
//     setHandRaised(!handRaised);
//     socket.emit("raise-hand", { roomId, userId: socket.id });
//   };


//   const toggleMute = () => {
//     localStream.current.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
//     setIsMuted(!isMuted);
//   };

//   const toggleCamera = () => {
//     localStream.current.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
//     setIsCameraOn(!isCameraOn);
//   };

//   const handleLeaveMeeting = () => {
//     socket.emit("leave-room", { roomId, userId: socket.id });
//     navigate("/");
//   };

//   return (
//     <div className="room-container">
//       <div className="video-section">
//         <video ref={videoRef} autoPlay playsInline></video>
//         {participants.map((p, index) => (
//           <div key={index}>{p}</div>
//         ))}
//       </div>
//       <div className="chat-section">
//         <div className="chat-box">
//           {messages.map((msg, index) => (
//             <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//       <div className="controls">
//         <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
//         <button onClick={toggleCamera}>{isCameraOn ? "Turn Off Camera" : "Turn On Camera"}</button>
//         <button className="control-btn" onClick={toggleScreenShare}>
//             {isScreenSharing ? "Stop Sharing" : "Share Screen"}
//           </button>
//           <button className="control-btn hand-btn" onClick={handleHandRaise}>
//             {handRaised ? "Lower Hand" : "Raise Hand"}
//           </button>
//         <button onClick={handleLeaveMeeting}>Leave Meeting</button>
//       </div>
//     </div>
//   );
// };

// export default Room;

// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import SimplePeer from "simple-peer";

// const socket = io("http://localhost:5000");

// function Room() {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [peers, setPeers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const userVideo = useRef();
//   const peersRef = useRef([]);
//   const userStream = useRef();
//   const screenStreamRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     if (!email) {
//       navigate("/login"); // Redirect if not logged in
//       return;
//     }

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       userVideo.current.srcObject = stream;
//       userStream.current = stream;

//       socket.emit("join-room", { roomId, email });

//       socket.on("all-users", (users) => {
//         const peers = users.map((user) => createPeer(user.userId, stream));
//         setPeers(peers);
//       });

//       socket.on("user-joined", ({ userId, email }) => {
//         const peer = createPeer(userId, stream);
//         peersRef.current.push({ peerID: userId, peer, email });
//         setPeers([...peersRef.current]);
//         setParticipants((prev) => [...prev, { userId, email }]);
//       });

//       socket.on("receive-message", ({ message, email }) => {
//         setMessages((prev) => [...prev, { message, email }]);
//       });

//       socket.on("hand-raised", ({ email }) => {
//         alert(`${email} raised their hand!`);
//       });

//       socket.on("user-left", ({ userId }) => {
//         setPeers((prev) => prev.filter((peer) => peer.peerID !== userId));
//         setParticipants((prev) => prev.filter((p) => p.userId !== userId));
//       });
//     });

//     return () => {
//       socket.emit("leave-room", { roomId, email });
//       socket.disconnect();
//     };
//   }, [email, navigate]);

//   function createPeer(userToSignal, stream) {
//     const peer = new SimplePeer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socket.emit("offer", { target: userToSignal, signal });
//     });

//     peer.on("stream", (remoteStream) => {
//       let video = document.getElementById(`video-${userToSignal}`);
//       if (video) {
//         video.srcObject = remoteStream;
//       }
//     });

//     return { peer, peerID: userToSignal };
//   }

//   const sendMessage = (msg) => {
//     socket.emit("send-message", { roomId, message: msg, email });
//   };

//   const toggleMute = () => {
//     userStream.current.getAudioTracks()[0].enabled = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   const toggleVideo = () => {
//     userStream.current.getVideoTracks()[0].enabled = !isVideoOn;
//     setIsVideoOn(!isVideoOn);
//   };

//   const toggleScreenShare = async () => {
//     if (!isScreenSharing) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         screenStreamRef.current = screenStream;
//         userStream.current.getVideoTracks()[0].stop();
//         userStream.current = screenStream;
//         setIsScreenSharing(true);
//       } catch (error) {
//         console.error("Error sharing screen: ", error);
//       }
//     } else {
//       navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//         screenStreamRef.current.getTracks().forEach((track) => track.stop());
//         userStream.current = stream;
//         setIsScreenSharing(false);
//       });
//     }
//   };

//   const leaveMeeting = () => {
//     socket.emit("leave-room", { roomId, email });
//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Meeting Room: {roomId}</h2>
//       <video ref={userVideo} autoPlay playsInline muted />
      
//       {peers.map(({ peerID }) => (
//         <video key={peerID} id={`video-${peerID}`} autoPlay playsInline />
//       ))}

//       <div>
//         <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
//         <button onClick={toggleVideo}>{isVideoOn ? "Turn Off Camera" : "Turn On Camera"}</button>
//         <button onClick={toggleScreenShare}>{isScreenSharing ? "Stop Sharing" : "Share Screen"}</button>
//         <button onClick={() => socket.emit("hand-raise", { roomId, email })}>Raise Hand</button>
//         <button onClick={leaveMeeting}>Leave Meeting</button>
//       </div>

//       <h3>Participants</h3>
//       <ul>
//         {participants.map((p, i) => (
//           <li key={i}>{p.email}</li>
//         ))}
//       </ul>

//       <h3>Chat</h3>
//       <ul>
//         {messages.map((msg, i) => (
//           <li key={i}><b>{msg.email}:</b> {msg.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Room;


import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const socket = io("http://localhost:5000");

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [peers, setPeers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();
  const screenStreamRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      userStream.current = stream;

      socket.emit("join-room", { roomId, email });

      socket.on("all-users", (users) => {
        const peersArray = users.map((user) => createPeer(user.userId, stream));
        peersRef.current = peersArray;
        setPeers(peersArray);
      });

      socket.on("user-joined", ({ userId, email }) => {
        const peer = createPeer(userId, stream);
        peersRef.current.push({ peerID: userId, peer, email });
        setPeers([...peersRef.current]);
        setParticipants((prev) => [...prev, { userId, email }]);
      });

      socket.on("receive-message", ({ message, email }) => {
        setMessages((prev) => [...prev, { message, email }]);
      });

      socket.on("hand-raised", ({ email }) => {
        alert(`${email} raised their hand!`);
      });

      socket.on("user-left", ({ userId }) => {
        setPeers((prev) => prev.filter((peer) => peer.peerID !== userId));
        setParticipants((prev) => prev.filter((p) => p.userId !== userId));
      });
    });

    return () => {
      socket.emit("leave-room", { roomId, email });
      socket.disconnect();
    };
  }, [email, navigate]);

  function createPeer(userToSignal, stream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("offer", { target: userToSignal, signal });
    });

    peer.on("stream", (remoteStream) => {
      let video = document.getElementById(`video-${userToSignal}`);
      if (video) {
        video.srcObject = remoteStream;
      }
    });

    return { peer, peerID: userToSignal };
  }

  const sendMessage = (msg) => {
    socket.emit("send-message", { roomId, message: msg, email });
  };

  const toggleMute = () => {
    userStream.current.getAudioTracks()[0].enabled = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    userStream.current.getVideoTracks()[0].enabled = !isVideoOn;
    setIsVideoOn(!isVideoOn);
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = screenStream;
        userStream.current.getVideoTracks()[0].stop();
        userStream.current = screenStream;
        setIsScreenSharing(true);
      } catch (error) {
        console.error("Error sharing screen: ", error);
      }
    } else {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
        userStream.current = stream;
        setIsScreenSharing(false);
      });
    }
  };

  const leaveMeeting = () => {
    socket.emit("leave-room", { roomId, email });
    navigate("/");
  };

  return (
    <div>
      <h2>Meeting Room: {roomId}</h2>
      <video ref={userVideo} autoPlay playsInline muted />
      
      {peers.map(({ peerID }) => (
        <video key={peerID} id={`video-${peerID}`} autoPlay playsInline />
      ))}

      <div>
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
        <button onClick={toggleVideo}>{isVideoOn ? "Turn Off Camera" : "Turn On Camera"}</button>
        <button onClick={toggleScreenShare}>{isScreenSharing ? "Stop Sharing" : "Share Screen"}</button>
        <button onClick={() => socket.emit("hand-raise", { roomId, email })}>Raise Hand</button>
        <button onClick={leaveMeeting}>Leave Meeting</button>
      </div>

      <h3>Participants</h3>
      <ul>
        {participants.map((p, i) => (
          <li key={i}>{p.email}</li>
        ))}
      </ul>

      <h3>Chat</h3>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}><b>{msg.email}:</b> {msg.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Room;


// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import SimplePeer from "simple-peer";

// const socket = io("http://localhost:5000");

// function Room() {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [peers, setPeers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const userVideo = useRef();
//   const peersRef = useRef([]);
//   const userStream = useRef();
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const userName = localStorage.getItem("userName");

//   useEffect(() => {
//     if (!userName) {
//       navigate("/login"); // Redirect if not logged in
//       return;
//     }
    
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       userVideo.current.srcObject = stream;
//       userStream.current = stream;

//       socket.emit("join-room", { roomId, userName });

//       socket.on("user-joined", ({ userId, userName }) => {
//         const peer = createPeer(userId, stream);
//         peersRef.current.push({ peerID: userId, peer, userName });
//         setPeers([...peersRef.current]);
//         setParticipants((prev) => [...prev, { userId, userName }]);
//       });

//       socket.on("receive-message", ({ message, userName }) => {
//         setMessages((prev) => [...prev, { message, userName }]);
//       });

//       socket.on("hand-raised", ({ userName }) => {
//         alert(`${userName} raised their hand!`);
//       });
//     });
//   }, [userName, navigate]);

//   function createPeer(userToSignal, stream) {
//     const peer = new SimplePeer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socket.emit("offer", { target: userToSignal, signal });
//     });

//     return peer;
//   }

//   const sendMessage = (msg) => {
//     socket.emit("send-message", { roomId, message: msg, userName });
//   };

//   const toggleMute = () => {
//     const enabled = userStream.current.getAudioTracks()[0].enabled;
//     userStream.current.getAudioTracks()[0].enabled = !enabled;
//     setIsMuted(!enabled);
//   };

//   const toggleVideo = () => {
//     const enabled = userStream.current.getVideoTracks()[0].enabled;
//     userStream.current.getVideoTracks()[0].enabled = !enabled;
//     setIsVideoOn(!enabled);
//   };

//   const leaveMeeting = () => {
//     socket.emit("leave-room", { roomId, userName });
//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Meeting Room: {roomId}</h2>
//       <video ref={userVideo} autoPlay playsInline muted />
//       {peers.map(({ peerID, peer, userName }) => (
//         <div key={peerID}>
//           <p>{userName}</p>
//           <video autoPlay playsInline />
//         </div>
//       ))}
//       <div>
//         <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
//         <button onClick={toggleVideo}>{isVideoOn ? "Turn Off Camera" : "Turn On Camera"}</button>
//         <button onClick={() => socket.emit("hand-raise", { roomId, userName })}>Raise Hand</button>
//         <button onClick={leaveMeeting}>Leave Meeting</button>
//       </div>
//       <h3>Participants</h3>
//       <ul>
//         {participants.map((p, i) => (
//           <li key={i}>{p.userName}</li>
//         ))}
//       </ul>
//       <h3>Chat</h3>
//       <ul>
//         {messages.map((msg, i) => (
//           <li key={i}><b>{msg.userName}:</b> {msg.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Room;

// Frontend (React + Simple-Peer + Socket.io-client)
// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import SimplePeer from "simple-peer";

// const socket = io("http://localhost:5000");

// function Room() {
//   const { roomId } = useParams();
//   const [peers, setPeers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [muted, setMuted] = useState(false);
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const userVideo = useRef();
//   const peersRef = useRef([]);
//   const userStream = useRef();

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       userVideo.current.srcObject = stream;
//       userStream.current = stream;

//       socket.emit("join-room", { roomId, userName: "User" });

//       socket.on("user-joined", ({ userId, userName }) => {
//         const peer = createPeer(userId, stream);
//         peersRef.current.push({ peerID: userId, peer });
//         setPeers([...peersRef.current]);
//         setParticipants((prev) => [...prev, userName]);
//       });

//       socket.on("receive-message", ({ message, userName }) => {
//         setMessages((prev) => [...prev, { message, userName }]);
//       });

//       socket.on("hand-raised", ({ userName }) => {
//         alert(`${userName} raised their hand!`);
//       });

//       socket.on("user-left", ({ userId, userName }) => {
//         setParticipants((prev) => prev.filter((p) => p !== userName));
//         peersRef.current = peersRef.current.filter((p) => p.peerID !== userId);
//         setPeers([...peersRef.current]);
//       });
//     });
//   }, []);

//   function createPeer(userToSignal, stream) {
//     const peer = new SimplePeer({ initiator: true, trickle: false, stream });
//     peer.on("signal", (signal) => {
//       socket.emit("offer", { target: userToSignal, signal });
//     });
//     return peer;
//   }

//   const toggleMute = () => {
//     const enabled = !muted;
//     userStream.current.getAudioTracks()[0].enabled = enabled;
//     setMuted(!muted);
//   };

//   const toggleVideo = () => {
//     const enabled = !videoEnabled;
//     userStream.current.getVideoTracks()[0].enabled = enabled;
//     setVideoEnabled(!videoEnabled);
//   };

//   const sendMessage = (msg) => {
//     socket.emit("send-message", { roomId, message: msg, userName: "User" });
//   };

//   const leaveMeeting = () => {
//     socket.disconnect();
//     window.location.href = "/";
//   };

//   return (
//     <div>
//       <h2>Meeting Room</h2>
//       <video ref={userVideo} autoPlay playsInline muted />
//       {peers.map(({ peerID, peer }) => (
//         <video key={peerID} autoPlay playsInline />
//       ))}
//       <button onClick={toggleMute}>{muted ? "Unmute" : "Mute"}</button>
//       <button onClick={toggleVideo}>{videoEnabled ? "Turn Off Camera" : "Turn On Camera"}</button>
//       <button onClick={() => socket.emit("hand-raise", { roomId, userName: "User" })}>Raise Hand</button>
//       <button onClick={leaveMeeting}>Leave Meeting</button>
//       <ul>
//         {messages.map((msg, i) => (
//           <li key={i}>{msg.userName}: {msg.message}</li>
//         ))}
//       </ul>
//       <h3>Participants:</h3>
//       <ul>
//         {participants.map((p, i) => (
//           <li key={i}>{p}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Room;
