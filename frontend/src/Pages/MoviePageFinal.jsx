
import React from 'react';
import MoviePage from './MoviePage';
import UserFooter from '../components/Home/Footer/UserFooter';
import MovieReview from '../components/Movie Review/MovieReview';
import GetReview from '../components/Movie Review/GetReview';

const MoviePageFinal = () => {
  return (
    <div>
      <MoviePage/>
      <MovieReview/>
      <GetReview/>
      <UserFooter/>     
    </div>
  )
}

export default MoviePageFinal



