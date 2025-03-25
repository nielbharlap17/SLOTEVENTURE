"use client"; // Ensure client-side rendering

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

// Sponsor images with URLs
const sponsors = [
  { image: "/assets/images/sp6.png", url: "https://www.jio.com" },
  { image: "/assets/images/sp1.png", url: "https://www.redbull.com/in" },
  { image: "/assets/images/sp2.jpg", url: "https://www.heromotocorp.com/" },
  { image: "/assets/images/sp3.png", url: "https://www.britannia.co.in/" },
  { image: "/assets/images/sp4.png", url: "https://www.haldiram.com/" },
  { image: "/assets/images/sp5.png", url: "https://amul.com/" },
];

const SponsorSlider = () => {
  return (
    <section 
      id="sponsor-section" 
      className="sponsor-slider bg-blue-100 py-12"
    >
      <div className="wrapper">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Connected Sponsors
        </h2>

        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 2 }, // Small tablets
            768: { slidesPerView: 3 }, // Tablets
            1024: { slidesPerView: 4 }, // Desktop
          }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="px-6"
        >
          {sponsors.map((sponsor, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center py-4">
              <a 
                href={sponsor.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105 duration-300"
              >
                <Image 
                  src={sponsor.image} 
                  alt={`Sponsor ${index + 1}`} 
                  width={180} 
                  height={100} 
                  className="object-contain"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SponsorSlider;
