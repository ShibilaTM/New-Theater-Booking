

import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import UserMovieCard from './UserMovieCard';

const UseMovieCarousel = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4000/page/getmovies');
                console.log('Received data from backend:', response.data);

                // Ensure response.data is an array
                if (Array.isArray(response.data.movies)) {
                    setMovies(response.data.movies);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to reload the page
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className='moviecard-container'>
            <h1 className='moviecard-title'>Recommended Movies</h1>
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
                            slidesPerView: 6,
                            spaceBetween: 2,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {Array.isArray(movies) && movies.map((movie) => (
                        <SwiperSlide key={movie._id}>
                            <UserMovieCard {...movie} reloadPage={reloadPage} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default UseMovieCarousel;
