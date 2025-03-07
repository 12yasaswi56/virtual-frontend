import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../pagesCSS/Home.css";
import mentorshipLogo from "../assets/4.webp";
import networkingLogo from "../assets/1.webp";
import consultancyLogo from "../assets/2.webp";
import brandingLogo from "../assets/3.webp";

import h2CalLogo from "../assets/WhatsApp Image 2025-02-20 at 16.14.13_b0332154.jpg";
import enertransitionLogo from "../assets/1.png"; 
import * as THREE from "three"; // Import Three.js
const Home = () => {
  const navigate = useNavigate();
  const sections = useRef([]);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
    

  }, []);
  useEffect(() => {
    if (!backgroundRef.current) return;
  
    // Create Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
  
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    backgroundRef.current.appendChild(renderer.domElement);
  
    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
  
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
  
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,  // Makes particles glow
    });
    
  
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);
  
    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      particleMesh.rotation.y += 0.001;
      particleMesh.rotation.x += 0.001; // Rotate slightly on x-axis
      renderer.render(scene, camera);
    };
    
  
    animate();
  
    // Handle Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
  
    window.addEventListener("resize", onResize);
  
    // Cleanup
    return () => {
      if (backgroundRef.current) {
        while (backgroundRef.current.firstChild) {
          backgroundRef.current.removeChild(backgroundRef.current.firstChild);
        }
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);
  
  return (
    <div className="home-container">
     <div ref={backgroundRef} className="background-animation"></div>
      <div ref={(el) => (sections.current[0] = el)} className="hero-section reveal-section">
      <h1 className="hero-title">
  Welcome to H<span style={{ verticalAlign: "sub", fontSize: "smaller" }}>2</span>Vis Incubators
</h1>

        <p className="hero-subtitle">Nurturing Ideas into Reality</p>
        <div className="button-group">
        <button className="btn-secondary" onClick={() => navigate("/AdminMeetings")}>Upcoming Meetings</button>
          <button className="btn-primary" onClick={() => navigate("/login")}>Join Now</button>
          
          <button className="btn-secondary" onClick={() => navigate("/AdminMentorStatusPage")}>Mentor Status</button>
        </div>
      </div>

      <div ref={(el) => (sections.current[1] = el)} className="about-section reveal-section">
      <button className="about-btn">About Us</button>
      <p className="section-description">
          At <strong>H<sub>2</sub>Vis Incubators</strong>, we are committed to transforming innovative ideas into thriving startups 
          by providing founders with expert mentorship, essential resources, and access to industry networks.<br /><br />
  
          Our collaborative ecosystem brings together entrepreneurs, seasoned mentors, and industry leaders 
          to foster innovation, accelerate growth, and navigate challenges. Whether you are developing cutting-edge technology, 
          disruptive business models, or solutions with deep social impact, we guide you every step of the way.<br /><br />
  
          From initial ideation to market entry, we ensure every visionary entrepreneur has the support, 
          infrastructure, and funding opportunities needed to succeed in today’s dynamic business landscape.
      </p>
  </div>
  

      <div ref={(el) => (sections.current[2] = el)} className="services-section reveal-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-list">
          <div className="service-item" onClick={() => navigate("/mentorapplication")}>
            <img src={mentorshipLogo} alt="Mentorship Logo" className="service-logo" />
            <h3 className="service-title">Mentorship</h3>
            <p className="service-description">
              Connect with experienced mentors to guide you through your startup journey.
            </p>
          </div>
          <div className="service-item" onClick={() => navigate("/videochat")}>
            <img src={networkingLogo} alt="Networking Logo" className="service-logo" />
            <h3 className="service-title">Networking</h3>
            <p className="service-description">
              Join a community of like-minded entrepreneurs and industry experts.
            </p>
          </div>
          <div className="service-item" onClick={() => navigate("/expertise")}>
            <img src={consultancyLogo} alt="Consultancy Logo" className="service-logo" />
            <h3 className="service-title">Consultancy</h3>
            <p className="service-description">
              Get expert advice to navigate the challenges of your business.
            </p>
          </div>
          <div className="service-item" onClick={() => navigate("/contact")}>
            <img src={brandingLogo} alt="Branding Logo" className="service-logo" />
            <h3 className="service-title">Branding</h3>
            <p className="service-description">
              Build a strong brand identity that resonates with your target audience.
            </p>
          </div>
        </div>
      </div>

      <div ref={(el) => (sections.current[3] = el)} className="testimonials-section reveal-section">
        <h2 className="section-title">Testimonials</h2>
        <div className="testimonials-list">
          <a href="https://h2visionsolution.com/" target="_blank" rel="noopener noreferrer" className="testimonial-item">
            <img src={h2CalLogo} alt="H2Cal Logo" className="testimonial-logo" />
            <p className="testimonial-name">H<sub>2</sub>Cal</p>
          </a>

          <a href="https://preprint-frontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="testimonial-item">
            <img src={enertransitionLogo} alt="Enertransition Logo" className="testimonial-logo" />
            <p className="testimonial-name">Enertransition</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
