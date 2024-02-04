import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsShare } from 'react-icons/bs';
import { BsFillStarFill } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCarousel from '../components/Home/MovieCarousel/MovieCarousel';
import CelebCard from './CelebCard/CelebCard';
import './MoviePage.css';
import UseMovieCarousel from '../components/Home/MovieCarousel/UseMovieCarousel';

const MoviePage = () => {
  const [moviePage, setMoviePage] = useState([]);
  const navigate = useNavigate();

    const { title ,id } = useParams(); // Extract title from route parameters


  // useEffect(() => {
  //   console.log("Fetching data...");
  //   axios.get(`http://127.0.0.1:4000/page/movies`)
  //     .then((res) => {
  //       console.log("Data fetched:", res.data);
  //       setMoviePage(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    console.log("Fetching data...");
    axios.get(`http://127.0.0.1:4000/page/movies`)
    .then((res) => {
      console.log("Data fetched:", res.data);
      setMoviePage(res.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  
  }, []);
  

  // Check if the title is not available yet
  if (!title) {
    console.log("Title is not available yet.");
    return <p>Loading...</p>;
  }

  // Find the selected movie based on the title
  const selectedMovie = moviePage.find((movie) => movie.title === title);

  // Check if the selected movie is found
  if (!selectedMovie) {
    console.log("Selected movie not found:", title);
    return <p>Loading...</p>;
  }
  
  // Check if the title is not available yet
  if (!title) {
    console.log("Title is not available yet.");
    return <p>Loading...</p>;
  }

  const genreToShow = Array.isArray(selectedMovie.genre) ? selectedMovie.genre.join(', ') : selectedMovie.genre;

  const {
    potraitImgUrl,
    landScapeImgUrl,
    rating,
    genre,
    languages,
    type,
    duration,
    releasedate,
    description,
    cast,
    
  } = selectedMovie;
 



  return (
    <>
   
    <div className='moviepage' >
      <div className='c1' style = {{
        backgroundImage:`url(${landScapeImgUrl})`
      }}>
          <div className='c11'>
              <div className='left'>
                <div className='movie_poster'
                    style={{
                        backgroundImage:`url(${potraitImgUrl})`
                    }}>
                      <p>In Cinemas</p>
              </div>

              <div className="movie_details">
                    <p className="title">
                      {title}
                    </p>
                    <p className="rating">
                      <BsFillStarFill className='star'/>&nbsp;&nbsp;
                      {rating}/10
                    </p>
                   
                    <div className="movie_languages">
                    <p className='languages'>
                      {languages.map((language,index)=>{
                        return(
                          <span key={index}>{language}</span>
                        )
                      })}
                    </p>
                    </div>
                    <p className="duration_type_releasedat">
                      <span className="duration">
                        {duration}
                      </span>
                      <span>.</span>
                      <span className="type">
                        {genreToShow}
                      </span>
                      <span>.</span>
                      <span className="category">
                      {type}
                    </span>
                    <span>.</span>
                    <span className="releasedat">
                      {releasedate}
                    </span>
                    </p>
                    <Link to={`/buytickets/${selectedMovie._id}`} className='linkstylenone'>
                      <button className='bookbtn'>Book Tickets</button>
                    </Link>
              </div>
            </div>  
              <div className='right'>
                <button className='sharebtn'><BsShare className='shareicon' />Share</button>
              </div>
          </div>
        </div>
        <div className="c2">
          <h1>About The Movie</h1>
          <p>{description}</p>
  
          {
                cast.length > 0 && (

                  <div className='circlecardslider'>
                  <div className='line'>
              
                  <h1>Cast</h1>
                  <Swiper
                      slidesPerView={1}
                      spaceBetween={1}
                      pagination={{
                          clickable: true,
                      }}
                      breakpoints={{
                          '@0.00': {
                              slidesPerView: 1,
                              spaceBetween: 2,
                          },
                          '@0.75': {
                              slidesPerView: 2,
                              spaceBetween: 2,
                          },
                          '@1.00': {
                              slidesPerView: 3,
                              spaceBetween: 2,
                          },
                          '@1.50': {
                              slidesPerView: 6,
                              spaceBetween: 2,
                          },
                      }}
                      className="mySwiper"
                  >
                      {cast.map((celeb, index) => (
                          <SwiperSlide key={index}>
                              <CelebCard {...celeb} />
                          </SwiperSlide>
                      ))}
                  </Swiper>
              </div>
          </div>    
                )
}

                        <div className='line'></div>
                      
                        < UseMovieCarousel/>
                    </div>
        </div>
            
        </>
  )
}

export default MoviePage
