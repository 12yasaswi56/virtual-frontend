import React, { useState } from "react";
import "../pagesCSS/Expertise.css"; // Import CSS file

const Mentors = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleMentorClick = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleGoBack = () => {
    setSelectedMentor(null);
  };

  return (
    <div className="mentors-container">
      <header className="mentors-header">
        <div className="container">
          {/* Navbar can be added here if needed */}
        </div>
      </header>

      {/* Mentor List Section */}
      {!selectedMentor ? (
        <section className="mentors-section">
          <div className="container">
            <h2 className="mentors-heading">Our Mentors</h2>
            <div className="mentors-list">
              {mentorsData.map((mentor) => (
                <div key={mentor.id} className="mentor-card">
                  <img
                    src={`/uploads/${mentor.image}`}
                    alt={mentor.name}
                    className="mentor-image"
                  />
                  <h3 className="mentor-name">{mentor.name}</h3>
                  <p className="mentor-role">{mentor.role}</p>
                  <button className="know-more-button" onClick={() => handleMentorClick(mentor)}>
                    Know More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Mentor Details Section */
        <section className="mentor-details-section">
          <div className="container">
            <div className="mentor-details-card">
              <img
                src={`/uploads/${selectedMentor.image}`}
                alt={selectedMentor.name}
                className="mentor-details-image"
              />
              <div className="mentor-details-content">
                <h2 className="mentor-details-name">{selectedMentor.name}</h2>
                <p className="mentor-details-role">{selectedMentor.role}</p>
                <p className="mentor-details-bio">{selectedMentor.bio}</p>
                <div className="social-links">
                  <a href={selectedMentor.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href={selectedMentor.instagram} target="_blank" rel="noopener noreferrer">instagram</a>
                </div>
                <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Mentors Data
const mentorsData = [
 
  {
    id: 1,
    name: "Dr. O Singh",
    role: "Co-founder & Chief Research Officer (CRO)",
    image: "h2-vision-images-320-x-420-px.jpg",
    bio: `Dr. O Singh is a recipient of DST and CSIR projects as an independent researcher and a Senior Scientist at IIT Madras. He has 189 research publications with national and international journals. He has maintained an H-index of 20. He is a world-wide collaborator and is one of the best well wishers and motivators in the STEM fields. His research activities are in hydrogen production, solar photovoltaics, polymer sciences, nanotechnology, CCUS, MFCs, high pressure gases, water treatment and biomaterial composites.`,
    linkedin: "https://linkedin.com/in/osmith",
    instagram: "https://twitter.com/osmith"
  },
  {
    id: 2,
    name: "Mr Harshit Mittal",
    role: "Co-founder & Chief Executive Officer",
    image: "Mr-Harshit-Mittal.jpg",
    bio: `Mr. Harshit Mittal is a distinguished sustainable energy researcher with extensive experience in academia and industry. 
He has served as a scientist at Guru Gobind Singh Indraprastha University, Delhi, IIT Madras, Chennai, and KLE Technological University, Hubli. 
His contributions to the field are reflected in his 21 authored books, published in seven languages worldwide, covering topics such as machine learning, blowers, and hydrogen production methods.

With 10 research publications in renowned national and international journals, Mr. Mittal has actively advanced hydrogen technology. 
He has also filed 15 patents in the domains of hydrogen storage, production processes, and integrated hydrogen systems, reinforcing his role as an innovator in the field.

A recognized thought leader, he has presented his research at prestigious international conferences in the United States, Korea, and Thailand. 
His excellence in research and innovation has earned him the Chancellor Award at the Indo-Korean-Thailand International Conference (INEEBA-2023).

Currently, as the Chief Executive Officer (CEO) of H2Visions Solution, Mr. Mittal leads a 50-member team, driving the commercialization of safe and affordable hydrogen production systems. 
His scholarly contributions and industry leadership continue to shape the future of sustainable energy and technological innovation.`,

    linkedin: "https://www.linkedin.com/in/-harshitmittal",
    instagram: "https://www.instagram.com/harshit._.1503"
  },
  {
    id: 3,
    name: "Mr Vivek Yadav",
    role: "Co-founder & Chief of Management and Industrial Relations",
    image: "Mr-Vivek-Yadav.jpg",
    bio: `Vivek Yadav is an expert in corporate management and industrial networking...`,
    linkedin: "https://linkedin.com/in/vivekyadav",
    instagram: "https://www.instagram.com/vivek._.yadavv"
  }
];

export default Mentors;
