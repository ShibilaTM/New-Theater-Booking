import React, { useState, useRef, useEffect } from 'react';
import MoviePage from './MoviePage';
import UserFooter from '../components/Home/Footer/UserFooter';
import MovieReview from '../components/Movie Review/MovieReview';
import './MoviePageFinal.css';

const MoviePageFinal = () => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowReviewPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleReviewPopup = () => {
    setShowReviewPopup(!showReviewPopup);
  };

  return (
    <div>
      <MoviePage />
      {showReviewPopup && (
        <div className="popup" ref={popupRef}>
          <div className="content">
            <h1>Movie Review</h1>
            <h2>Add Your Review</h2>
            <MovieReview />
          </div>
        </div>
      )}
      <div className="add-review-link" onClick={toggleReviewPopup}>
        <h1>Movie Review</h1>
        <h2>Add Your Review</h2>
      </div>
      <UserFooter />
    </div>
  );
};

export default MoviePageFinal;




