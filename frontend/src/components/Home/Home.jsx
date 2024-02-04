
import React from 'react';
import HomeSlider from './HomeSlider';
import MovieCarousel from './MovieCarousel/MovieCarousel';
import Footer from './Footer/Footer';

const Home = () => {
  return (
    <div >
      <HomeSlider/>
      <MovieCarousel />
      <Footer/>
    </div>
  )
}

export default Home
