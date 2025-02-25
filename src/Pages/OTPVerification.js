import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after OTP verification
import Footer from "../Components/Footer";
const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve email from localStorage (set in Register page)
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            setMessage("Error: No email found for verification.");
        }
    }, []);

    const verifyOTP = async () => {
        if (!otp.trim()) {
            setMessage("Please enter the OTP.");
            return;
        }

        try {
            const response = await fetch("https://virtual-backend-4.onrender.com/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                alert("OTP Verified! Redirecting...");
                navigate("/login"); // Redirect on success
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setMessage("Verification failed. Try again.");
        }
    };

    return (
        <div className="otp-container">
            <h2>OTP Verification</h2>
            <p>Enter the OTP sent to <b>{email}</b></p>

            <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="Enter OTP" 
                className="otp-input"
            />
            <button onClick={verifyOTP} className="otp-button">Verify OTP</button>
            {message && <p className="otp-message">{message}</p>}

           
        </div>
    );
};

export default OTPVerification;
