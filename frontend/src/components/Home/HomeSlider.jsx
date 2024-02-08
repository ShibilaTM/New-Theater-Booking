
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css';
import axios from 'axios';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const HomeSlider = () => {
  const [banners, setBanners] = useState([]);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:4000/page/poster')
      .then((res) => {
        if (Array.isArray(res.data.movies)) {
          setBanners(res.data.movies);
        } else {
          console.error("Data is not an array:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Adjust the delay as needed
        speed={5000} // Adjust the speed as needed
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner.potraitImgUrl} alt={`slide image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeSlider;