import React, { useEffect, useState } from 'react';
import './Seat.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieTicketBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/page/movie/${id}`)
      .then((res) => {
        setMovieDetails(res.data);
        // Assuming res.data.bookings is an array, you can choose the appropriate index
        const firstBooking = res.data.bookings[0];
        setSelectedSeats([...firstBooking.bookedSeats]);
        setTotalAmount(firstBooking.price);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);
  


  const handleSeatChange = (seatId) => {
    const selectedSeatIndex = selectedSeats.indexOf(seatId);
    if (selectedSeatIndex === -1) {
      setSelectedSeats([...selectedSeats, seatId]);
      setTotalAmount((prevAmount) => prevAmount + 200);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(selectedSeatIndex, 1);
      setSelectedSeats(updatedSeats);
      setTotalAmount((prevAmount) => prevAmount - 200);
    }
  };



  const handleBooking = async () => {
    const movieId = 'your_movie_id'; // Replace with the actual movie ID
    const showDate = 'selected_date'; // Replace with the selected date
    const showTime = 'selected_time'; // Replace with the selected time
    const userEmail = 'user_email'; // Replace with the user's email

    // Make a POST request to your backend to book the tickets
    try {
      const response = await fetch('/your-backend-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
          showDate,
          showTime,
          available: [], // Replace with the available seats (if needed)
          bookedSeats: selectedSeats,
          seatToBook: selectedSeats,
          price: totalAmount,
          userEmail,
        }),
      });

      const data = await response.json();
      console.log(data); // Handle the response from the backend
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 0; i < 59; i++) {
      const isBooked = Math.floor(Math.random() * 2) === 1;
      seats.push(
        <div key={`s${i + 2}`} className={`seat ${isBooked ? 'booked' : ''}`}>
          <input
            type="checkbox"
            name="tickets"
            id={`s${i + 2}`}
            onChange={() => handleSeatChange(`s${i + 2}`)}
          />
          <label htmlFor={`s${i + 2}`}></label>
        </div>
      );
    }
    return seats;
  };


  return (
<div className="center">
  <div className="tickets">
    {movieDetails ? (
      <div className="ticket-selector">
        <div className="head">
          <div className="title">
            <h1>{movieDetails.title}</h1>
          </div>
        </div>
        <div className="seats">
          <div className="status">
            <div className="item">Available</div>
            <div className="item">Booked</div>
            <div className="item">Selected</div>
          </div>
          <div className="all-seats">{renderSeats()}</div>
        </div>
        <div class="timings">
          <div class="dates">
            <input type="radio" name="date" id="d1" checked />
            <label for="d1" class="dates-item">
              <div class="date">{movieDetails.bookings.showDate}</div>
            </label>
          </div>
          <div class="times">
            <input type="radio" name="time" id="t1" checked />
            <label for="t1" class="time">{movieDetails.bookings.showTime}</label>
          </div>
        </div>
        <div className="price">
          <div className="total">
            <span>
              <span className="count">{selectedSeats.length}</span> Tickets
            </span>
            <div className="amount">{totalAmount}</div>
          </div>
          <button type="button" onClick={handleBooking}>
            Book
          </button>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
</div>

  );
};

export default MovieTicketBooking;
