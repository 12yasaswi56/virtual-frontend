// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import "../pagesCSS/Register.css"; 

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     nationality: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
//     if (!formData.nationality) newErrors.nationality = "Please select nationality";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!formData.mobile.trim()) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobile)) {
//       newErrors.mobile = "Enter a valid 10-digit mobile number";
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (!formData.confirmPassword.trim()) {
//       newErrors.confirmPassword = "Confirm Password is required";
//     } else if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("OTP Sent to Email & Mobile!");

//         // ✅ Store email & mobile for OTP verification
//         localStorage.setItem("userEmail", formData.email);
//         localStorage.setItem("userMobile", formData.mobile);

//         // ✅ Redirect to OTP verification
//         navigate("/verify-otp");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//       alert("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     const decoded = jwtDecode(credentialResponse.credential);
//     console.log("Google User", decoded);

//     try {
//       const response = await fetch("http://localhost:5000/google-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: credentialResponse.credential }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem("authToken", data.token);
//         alert("Google Login Successful!");
//         navigate("/");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Google login failed", error);
//       alert("Google login failed. Try again.");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//       <div className="container">
//         <div className="left">
//           <h2>Welcome to <b>Virtual Incubator</b></h2>
//           <p>Innovate. Connect. Thrive.</p>
//           <p>Already have an account? <a href="/login">Login here</a></p>
//           <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Google Login Failed")} />
//         </div>

//         <div className="right">
//           <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="input" />
//           {errors.firstName && <p className="error">{errors.firstName}</p>}

//           <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="input" />
//           {errors.lastName && <p className="error">{errors.lastName}</p>}

//           <select name="nationality" value={formData.nationality} onChange={handleChange} className="input">
//             <option value="">Select your nationality</option>
//             <option value="Indian">Indian</option>
//           </select>
//           {errors.nationality && <p className="error">{errors.nationality}</p>}

//           <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input" />
//           {errors.email && <p className="error">{errors.email}</p>}

//           <div className="mobileContainer">
//             <span className="flag">🇮🇳 +91</span>
//             <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="mobileInput" />
//           </div>
//           {errors.mobile && <p className="error">{errors.mobile}</p>}

//           <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} className="input" />
//           {errors.password && <p className="error">{errors.password}</p>}

//           <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="input" />
//           {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

//           <button onClick={handleRegister} className="otpButton" disabled={loading}>
//             {loading ? "Sending OTP..." : "Generate OTP for Email & Mobile"}
//           </button>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Register;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pagesCSS/Register.css";

import ImageSlider from "../Components/ImageSlider";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.nationality) newErrors.nationality = "Please select nationality";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("OTP Sent to Email & Mobile!");

        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userMobile", formData.mobile);

        navigate("/verify-otp");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
    
      <div className="left">
      <ImageSlider /> {/* Add the image slider here */}
        <h2>Welcome to <b>Virtual Incubator</b></h2>
        <p>Innovate. Connect. Thrive.</p>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>

      <div className="right">
      <h2 className="register-heading">Register Here!!</h2>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="input" />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="input" />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <select name="nationality" value={formData.nationality} onChange={handleChange} className="input">
          <option value="">Select your nationality</option>
          <option value="Indian">Indian</option>
        </select>
        {errors.nationality && <p className="error">{errors.nationality}</p>}

        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input" />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* <div className="mobileContainer"> */}
       
          {/* <span className="flag">🇮🇳 +91</span> */}
          <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="mobileInput" />
        {/* </div> */}
        {errors.mobile && <p className="error">{errors.mobile}</p>}

        <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} className="input" />
        {errors.password && <p className="error">{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="input" />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button onClick={handleRegister} className="otpButton" disabled={loading}>
          {loading ? "Sending OTP..." : "Generate OTP for Email"}
        </button>
      </div>
      
    </div>
  );
};

export default Register;