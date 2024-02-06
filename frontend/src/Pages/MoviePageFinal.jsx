
import React from 'react';
import MoviePage from './MoviePage';
import UserFooter from '../components/Home/Footer/UserFooter';
import MovieReview from '../components/Movie Review/MovieReview';

const MoviePageFinal = () => {
  return (
    <div>
      <MoviePage/>
      <MovieReview/>
      <UserFooter/>
      
    </div>
  )
}

export default MoviePageFinal



