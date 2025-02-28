
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithGoogle, logout } from "../firebase";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError("Please enter valid credentials!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);
//       setIsLoggedIn(true);
//       setError("");
//       navigate("/Slots");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const user = await signInWithGoogle();
//       localStorage.setItem("token", user.accessToken);
//       setIsLoggedIn(true);
//       setError("");
//       navigate("/Slots");
//     } catch (err) {
//       setError("Google login failed. Try again.");
//     }
//   };

//   const handleLogout = async () => {
//     await logout();
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>{isLoggedIn ? "Welcome Back!" : "LOGIN"}</h2>

//       {!isLoggedIn ? (
//         <>
//           {error && <p style={styles.error}>{error}</p>}
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <div style={{ position: "relative", width: "100%" }}>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={styles.input}
//               required
//             />
//             <span
//               style={styles.eyeIcon}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>
//           <p style={styles.forgotPassword}>
//             <Link to="/forgot-password" style={{ color: "#333", textDecoration: "none" }}>
//               Forgot password?
//             </Link>
//           </p>
//           <button style={styles.loginButton} onClick={handleLogin}>
//             Login
//           </button>
          
//           <p style={styles.registerText}>
//             Don't have an account? 
//             <Link to="/register" style={{ color: "#FF3C3C", textDecoration: "none", fontWeight: "bold" }}> Register Now</Link>
//           </p>
//           <p style={styles.orText}>
//             <b>Login</b> with others
//           </p>
//           <button style={styles.googleButton} onClick={handleGoogleLogin}>
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google Logo"
//               style={styles.googleIcon}
//             />
//             Login with <b>Google</b>
//           </button>
          
//         </>
//       ) : (
//         <button style={styles.logoutButton} onClick={handleLogout}>
//           Logout
//         </button>
//       )}

//     </div>
  
//   );
// };

// const styles = {
//   container: {
//     width: "400px",
//     margin: "50px auto",
//     padding: "30px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//     fontFamily: "Arial, sans-serif",
//   },
//   title: {
//     fontSize: "28px",
//     fontWeight: "bold",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "12px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     fontSize: "16px",
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: "12px",
//     top: "12px",
//     cursor: "pointer",
//   },
//   forgotPassword: {
//     textAlign: "right",
//     fontSize: "14px",
//     color: "#333",
//     cursor: "pointer",
//   },
//   loginButton: {
//     width: "100%",
//     padding: "12px",
//     background: "linear-gradient(to right, #FF6A3D, #FF3C3C)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "16px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   logoutButton: {
//     width: "100%",
//     padding: "12px",
//     background: "#333",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "16px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//   },
//   orText: {
//     marginTop: "20px",
//     fontSize: "16px",
//   },
//   googleButton: {
//     width: "100%",
//     padding: "12px",
//     background: "#fff",
//     color: "#333",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     fontSize: "16px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   googleIcon: {
//     width: "20px",
//     height: "20px",
//     marginRight: "8px",
//   },
//   registerText: {
//     marginTop: "20px",
//     fontSize: "16px",
//   },
// };

// export default Login;









import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, logout } from "../firebase";
import Footer from "../Components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter valid credentials!");
      return;
    }

    try {
      const response = await fetch("https://virtual-backend-4.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user email in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);  // Store email here
      setIsLoggedIn(true);
      setError("");
      navigate("/Slots");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      // Store token and user email in localStorage
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("userEmail", user.email);  // Store email here
      setIsLoggedIn(true);
      setError("");
      navigate("/Slots");
    } catch (err) {
      setError("Google login failed. Try again.");
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isLoggedIn ? "Welcome Back!" : "LOGIN"}</h2>

      {!isLoggedIn ? (
        <>
          {error && <p style={styles.error}>{error}</p>}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <p style={styles.forgotPassword}>
            <Link to="/forgot-password" style={{ color: "#333", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </p>
          <button style={styles.loginButton} onClick={handleLogin}>
            Login
          </button>

          <p style={styles.registerText}>
            Don't have an account? 
            <Link to="/register" style={{ color: "#FF3C3C", textDecoration: "none", fontWeight: "bold" }}> Register Now</Link>
          </p>
          <p style={styles.orText}>
            <b>Login</b> with others
          </p>
          <button style={styles.googleButton} onClick={handleGoogleLogin}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              style={styles.googleIcon}
            />
            Login with <b>Google</b>
          </button>

        </>
      ) : (
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      )}

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
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#FFFFFF" // or "white"
}
,
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer",
  },
  forgotPassword: {
    textAlign: "right",
    fontSize: "14px",
    color: "white",
    cursor: "pointer",
  },
  loginButton: {
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
  logoutButton: {
    width: "100%",
    padding: "12px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  orText: {
    color:"white",
    marginTop: "20px",
    fontSize: "16px",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    background: "#fff",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: "10px",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
    marginRight: "8px",
  },
  registerText: {
    color:"white",
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default Login;
