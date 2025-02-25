import { useState } from "react";
import Footer from "../Components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link.");
      }

      setMessage("Reset link sent to your email!");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>FORGOT PASSWORD</h2>
      <p style={styles.subText}>
        No worries! Enter your email address below and we will send you a reset link.
      </p>

      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button style={styles.sendButton} onClick={handleReset}>
        Send Reset Link
      </button>

      
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    background: "#fff",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  subText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ff6a3d",
    borderRadius: "5px",
    fontSize: "16px",
  },
  sendButton: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(to right, #FF6A3D, #FF3C3C)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  successMessage: {
    color: "green",
    fontSize: "14px",
    marginBottom: "10px",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default ForgotPassword;
