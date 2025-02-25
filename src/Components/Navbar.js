import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Vizz[1].png"; // Ensure this is the correct path to your logo

const Navbar = () => {
  const location = useLocation(); // Get the current route to highlight active link

  // Define links outside JSX
  const links = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "Video Chat", path: "/videochat" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "StartUp", path: "/startup" },
    { name: "Mentor", path: "/mentorapplication" }, 
    { name: "Expertise", path: "/expertise" }, // Fixed the route
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo & Title */}
        <div style={styles.brand}>
          <img src={logo} alt="H2Vis Logo" style={styles.logo} />
          <h1 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
          H<span style={{ fontSize: '16px', verticalAlign: 'sub' }}>2</span>Vis Incubator
        </h1>
        </div>

        {/* Navigation Links */}
        <ul style={styles.navList}>
          {links.map((link) => (
            <li key={link.name} style={styles.navItem}>
              <Link
                to={link.path}
                style={{
                  ...styles.navLink,
                  color: location.pathname === link.path ? "#32CD32" : "white",
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Styles
const styles = {
  nav: {
    backgroundColor: "#000", // Dark background
    padding: "16px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    marginRight: "12px",
  },
  title: {
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  navList: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    position: "relative",
  },
  navLink: {
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
};

export default Navbar;
