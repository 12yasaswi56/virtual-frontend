// expertise.js
import React, { useState } from 'react';
import '../pagesCSS/Expertise.css';

const experts = [
    {
        name: 'Dr. O Singh',
        role: 'Co-founder & Chief Research Officer (CRO)',
        image: './uploads/h2-vision-images-320-x-420-px.jpg',
        description: 'Dr. O Singh is a recipient of DST and CSIR projects as an independent researcher and a Senior Scientist at IIT Madras. He has 189 research publications with national and international journals. He has maintained an H-index of 20. He is a world-wide collaborator and is one of the best well wishers and motivators in the STEM fields. His research activities are in hydrogen production, solar photovoltaics, polymer sciences, nanotechnology, CCUS, MFCs, high pressure gases, water treatment and biomaterial composites.'
    },
    {
        name: 'Mr. Harshit Mittal',
        role: 'Co-founder & Chief Executive Officer',
        image: './uploads/Mr-Harshit-Mittal.jpg',
        description: 'Mr Harshit Mittal, a sustainable energy researcher, has worked as a scientist at Guru Gobind Singh Indraprastha University, Delhi, IIT Madras, Chennai, and KLE Technological University, Hubli. He has written 21 books in 7 languages worldwide on machine learning, blowers and hydrogen production methods. He has 10 research publications in national and international journals. He has filed 15 patents in hydrogen storage, production processes and integrated hydrogen systems. His scholarly work contributes to the advancement of technology and its practical applications. He has presented his work in international conferences in USA, Korea and Thailand and is a chancellor awardee from Indo-korean-thailand international conference (INEEBA-2023). Harshit is currently the CEO of H2Visions Solution managing a team of 50 members and working towards commercializing safe and affordable hydrogen production systems.'
    },
    {
        name: 'Mr. Vivek Yadav',
        role: 'Co-founder & Chief of Management and Industrial Relations',
        image: './uploads/Mr-Vivek-Yadav.jpg',
        description: ''
    },
    // Add more experts as needed
];

const Expertise = () => {
    const [selectedExpert, setSelectedExpert] = useState(null);

    const handleKnowMore = (expert) => {
        setSelectedExpert(expert);
    };

    const handleClose = () => {
        setSelectedExpert(null);
    };

    return (
        <div className="expertise-container">
            <h1 className="page-title">Our Expertise</h1>
            <div className="expert-list">
                {experts.map((expert, index) => (
                    <div key={index} className="expert-card">
                        <img src={expert.image} alt={expert.name} className="expert-image" />
                        <h3 className="expert-name">{expert.name}</h3>
                        <p className="expert-role">{expert.role}</p>
                        <button className="know-more-btn" onClick={() => handleKnowMore(expert)}>Know More</button>
                    </div>
                ))}
            </div>

            {/* Modal for "Know More" */}
            {selectedExpert && (
                <div className="expert-modal">
                    <div className="modal-content">
                        <h2>{selectedExpert.name}</h2>
                        <p className="modal-role">{selectedExpert.role}</p>
                        <p className="modal-description">{selectedExpert.description}</p>
                        <button className="close-btn" onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Expertise;