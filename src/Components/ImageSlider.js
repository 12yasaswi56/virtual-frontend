import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import img1 from "../assets/IMG_2195.JPG";
import img2 from "../assets/IMG_2194.PNG";
import img3 from "../assets/IMG_2196.JPG";
import img4 from "../assets/IMG_2197.JPG";

const images = [
  { src: img1, caption: "Innovation" },
  { src: img2, caption: "Collaboration" },
  { src: img3, caption: "Networking" },
  { src: img4, caption: "Trust" }
];

const ImageSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    return (
      <div>
        <div className="slider-container">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            className="swiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="slide-content">
                  <img src={image.src} alt={image.caption} className="slider-image" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Caption is now outside, so it remains visible */}
        <p className="caption-container">{images[activeIndex].caption}</p>
      </div>
    );
  };
  


  const styles = {
    swiper: {
      width: "100%", 
      height: "400px", // Adjust based on your requirement
    },
    image: {
      width: "100%", 
      height: "100%", 
      objectFit: "cover", // Ensures the image covers the container properly
      borderRadius: "10px", // Optional: Adds rounded corners
    },
  };
  
  export default ImageSlider; 

