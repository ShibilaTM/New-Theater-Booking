import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import './GetReviewCard.css';


const GetReviewCard = ({star , comments}) => {

    return (
      <div className='reviewcard'>
        <div className='review'>
          <p className='reviewRating'>
            <BsFillStarFill className='star' />&nbsp;&nbsp;
            {star}/5
          </p>
        </div>
        <div className='reviewDetails'>
          <p className='comments'><b>{comments}</b></p>
        </div>
      </div>
    );
  
}

export default GetReviewCard
