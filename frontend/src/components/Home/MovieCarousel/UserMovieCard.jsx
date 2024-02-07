
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillStarFill } from "react-icons/bs";
import './MovieCard.css'

const UserMovieCard = ({ potraitImgUrl, rating, title, genre }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Function to reload the page
    const reloadPage = () => {
        window.location.reload();
        window.scrollTo(0, 0);
    };

    const handleClick = () => {
        // Navigate to the MoviePage component with the selected movie title
        navigate(`/movie/${encodeURIComponent(title)}`);
        // Reload the page
        reloadPage();
    };

    return (
        <div
            className='moviecard'
            onClick={handleClick}
        >
            <div className='movieimg' style={{ backgroundImage: `url(${potraitImgUrl})` }}>
                <p className='rating'>
                    <BsFillStarFill className='star' />&nbsp;&nbsp;
                    {rating}/10
                </p>
            </div>
            <div className="details">
                <p className='title'>
                    <b>{title}</b>
                </p>
                <p className='type'>
                    {genre}
                </p>
            </div>
        </div>
    );
};

export default UserMovieCard;
