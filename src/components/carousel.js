import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

const Carousel = () => {
  const [slideTexts, setSlideTexts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get("https://mindsupport-production.up.railway.app/api/v1/themes/")
      .then(response => {
        const extractedSlideTexts = response.data.map(item => item.name);
        setSlideTexts(extractedSlideTexts);
        setLoading(false); // Update loading state once data is fetched
      })
      .catch(error => {
        console.error("Error fetching slide texts:", error);
        setLoading(false); // Update loading state in case of error
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Tablet landscape
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Desktop
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // Large desktop
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-h-500">
      {loading ? ( // Show loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
        <Slider {...settings}>
          {slideTexts.map((text, index) => (
            <div className="px-8" key={index}>
              <div
                className="rounded border border-gray-400 h-[300px] w-full flex justify-center items-center"
                style={{
                  backgroundImage: "linear-gradient(to right, #e21b5a, #E9477A)",
                }}
              >
                <p className="font-primaryBold text-white font-bold xl:text-3xl lg:text-5xl md:text-4xl sm:text-4xl">{text}</p>
              </div> 
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
