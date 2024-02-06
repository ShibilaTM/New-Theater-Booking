import React, { useState } from 'react';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import './MovieReview.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const MovieReview = () => {
  const [rating, setRating] = useState(Array(5).fill(false));

  const handleStarClick = (index) => {
    const newRating = rating.map((_, i) => i <= index);
    setRating(newRating);
  };
  const [comments,setComments] = useState({
    star:'',
    comments:''
  })
  const {id } = useParams()

  const commentHandler = (e)=>{
    setComments({
      ...comments,
      [e.target.name]:e.target.value
    })
  }

  const addCommentHandler = async(e)=>{
    await axios.post(`http://127.0.0.1:4000/page/review/${id}`,comments)
    .then((res)=>{
      setComments(res.data)
      window.location.reload(false);
      toast.success(res.data.message,{position:'top-right'})
    })
    .catch((error)=>{
      if (error.response && error.response.status === 400) {
       
        toast.error('comments added failed', { position: 'top-right' });
      } else {
        // Handle other errors
        toast.error('unauthorized', { position: 'top-right' });
      }
    })
  }


  return (
    <div className='App'>
      <div className='popup'>
        <div className='content'>
          <div className='title'>
            <h2>Movie Review</h2>
          </div>
          <div className='rating'>
            <h3>Ratings</h3>
            {rating.map((filled, index) =>
              filled ? (
                <IoMdStar
                  key={index}
                  style={{ color: 'orange' ,fontSize: '24px' }}
                  onClick={() => handleStarClick(index)}
                  name='star'
                  onChange={commentHandler}
                />
              ) : (
                <IoMdStarOutline
                  key={index}
                  style={{ color: 'orange' ,fontSize: '24px' }}
                  onClick={() => handleStarClick(index)}
                  name='star'
                  onChange={commentHandler}
                />
              )
            )}
          </div>
          <textarea placeholder='Comments here...' rows={4} name='comments' onChange={commentHandler}></textarea>
          <button onClick={addCommentHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default MovieReview;

