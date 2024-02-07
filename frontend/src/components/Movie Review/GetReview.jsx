
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import './GetReviewCard.css';
import { useParams } from 'react-router-dom';
import GetReviewCard from './GetReviewCard';

const GetReview = () => {
    const [getReviews, setgetReviews] = useState([]);
    const {title} = useParams()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const decodedTitle = decodeURIComponent(title);
            const response = await axios.get(`http://127.0.0.1:4000/page/reviews/${decodedTitle}`);
            console.log('Received data from backend:', response.data);
        
            // Ensure response.data.reviews is an array
            if (Array.isArray(response.data.reviews)) {
              setgetReviews(response.data.reviews);
            } else {
              console.error('Invalid data format:', response.data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        fetchData();
      }, []);
      
      

  return (
     <div className='reviewcard-container'>
      <h1 className='reviewcard-title'><b>Top Reviews</b></h1>
      <div className='sliderout'>
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            750: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 3,
            },
          }}
          modules={[Pagination]}
          className='mySwiper'
        >
                {Array.isArray(getReviews) && getReviews.map((review) => (
                    <SwiperSlide key={review._id}>
                    <GetReviewCard {...review} />
                </SwiperSlide>
   
        ))}

        </Swiper>
      </div>
    </div>
  )
}

export default GetReview
