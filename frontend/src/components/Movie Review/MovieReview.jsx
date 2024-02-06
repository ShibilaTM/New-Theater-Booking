import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import './MovieReview.css';

const MovieReview = () => {
  const [rating, setRating] = useState(Array(5).fill(false));

  const handleStarClick = (index) => {
    const newRating = rating.map((_, i) => i <= index);
    setRating(newRating);
  };

  return (
    <div className='App'>
      <div className='popup'>
        <div className='content'>
          <div className='title'>
            <h2>Movie Review</h2>
          </div>
          <div>
            <h3>Ratings</h3>
            {rating.map((filled, index) =>
              filled ? (
                <IoMdStar
                  key={index}
                  style={{ color: 'orange' }}
                  onClick={() => handleStarClick(index)}
                />
              ) : (
                <IoMdStarOutline
                  key={index}
                  style={{ color: 'orange' }}
                  onClick={() => handleStarClick(index)}
                />
              )
            )}
          </div>
          <textarea placeholder='Comments here...'></textarea>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default MovieReview;

