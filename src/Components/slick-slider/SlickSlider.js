import React from "react";
import Slider from "react-slick";

// Slick Slider settings
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true, // Enable auto-sliding
  autoplaySpeed: 3000, // 3 seconds per slide
  dots: true, // Enable dots for navigation

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
const SlickSlider = ({children}) => {
  return <Slider {...settings}>{children}</Slider>;
};

export default SlickSlider;
