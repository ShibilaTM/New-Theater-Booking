// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './Seat.css'
// import toast from 'react-hot-toast';

// const MovieTicketBooking = () => {
//     const [movieDetails, setMovieDetails] = useState(null);
//     const [date, setDate] = useState('');
//     const { id } = useParams();
//     const [bookings, setBookings] = useState({
//         showDate: '',
//         selectedSeats: [],
//         pricePerSeat: '',
//         userEmail: ''
//     });
    
//     useEffect(() => {
//         axios.get(`http://127.0.0.1:4000/page/movie/${id}`)
//             .then((res) => {
//                 setMovieDetails(res.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching movie details:", error);
//             });
//     }, []);

//     const inputHandler = (e) =>{
//         setBookings({
//             ...bookings,
//             [e.target.name]: e.target.value
//         });
//     }


//     const handleCheckboxClick = (index) => {
//         const updatedSelectedSeats = [...bookings.selectedSeats];
//         const seatIndex = updatedSelectedSeats.indexOf(index);
//         if (seatIndex === -1) {
//             updatedSelectedSeats.push(index);
//         } else {
//             updatedSelectedSeats.splice(seatIndex, 1);
//         }
//         setBookings({
//             ...bookings,
//             selectedSeats: updatedSelectedSeats
//         });
//     };
    
 
//     const addHandler = async() => {
    
//         try {
//             const { showDate, selectedSeats, userEmail } = bookings;
//             const totalPrice = selectedSeats.length * movieDetails.tickets[0].ticketRates; // Calculate total price
//                   // Check if any required field is empty
//         if (!bookings.showDate|| !bookings.selectedSeats.length ||!bookings.userEmail) {
//             toast.error('All fields are required', { position: 'top-right' });
//             return;
//         }
//             // Debugging: Log totalPrice, selectedSeats.length, and movieDetails.tickets[0].ticketRates
//             console.log('Total Price:', totalPrice);
//             console.log('Selected Seats Length:', selectedSeats.length);
//             console.log('Ticket Rates:', movieDetails.tickets[0].ticketRates);
    
//             const response = await axios.post(`http://127.0.0.1:4000/page/booktickets/${id}`, {
//                 showDate,
//                 selectedSeats,
//                 pricePerSeat: movieDetails.ticketRate, 
//                 userEmail 
//             });
//             toast.success(response.data.message, { position: 'top-right' });
//             window.location.reload(false);
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 toast.error('Booking failed', { position: 'top-right' });
//             } else {
//                 toast.error('Unauthorized', { position: 'top-right' });
//             }
//         }
//     };
    
    

//     const generateCheckboxes = () => {
//         const checkboxes = [];
//         const { numberOfSeats, bookedSeats } = movieDetails.tickets[0];
        
//         for (let i = 1; i <= numberOfSeats; i++) {
//             const isChecked = bookedSeats.includes(i);
//             const isSelected = bookings.selectedSeats.includes(i); // Check if seat is selected
//             checkboxes.push(
//                 <label key={i} className={`${isChecked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}>
//                     <input
//                         type="checkbox"
//                         name="selectedSeats"
//                         value={i}
//                         checked={isSelected} // Check if seat is selected
//                         onChange={() => handleCheckboxClick(i)}
//                         disabled={isChecked}
//                     />
//                     <span className="seat-number">{i}</span>
//                 </label>
//             );
//             // Add line break after every 10 checkboxes
//             if (i % 10 === 0) {
//                 checkboxes.push(<br key={`br-${i}`} />);
//             }
//         }
        
//         return checkboxes;
//     }
    
//     if (!movieDetails) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className='buytickets'>
//             <div className="s1">
//                 <div className="head">
//                     <h1>{movieDetails.title}</h1>
//                     <h4>{movieDetails.languages}</h4>
//                     <h5>{movieDetails.genre}</h5>
//                 </div>
//                 <div className='tickets'>
//                     <div className='title'>
//                         <h2>Movie Ticket Booking</h2>
//                     </div>
//                     <div className="main">
//                         <input type="date" name="showDate" onChange={e => {setDate(e.target.value);inputHandler(e)}} />
//                     </div>
//                     <div className="showTime">
//                         <input type='text' value={movieDetails.tickets[0]?.showTime} />
//                     </div>
//                     <div className="email">
//                         <input type='email' name='userEmail' placeholder='email'  onChange={inputHandler}/>
//                     </div>

//                     <div className="seats">
//                         <h3>Select your seats:</h3>
//                         {generateCheckboxes()}
//                     </div>
//                     <div className="price">
//     <input type='text' placeholder='Total Price' value={bookings.selectedSeats.length * movieDetails.tickets[0].ticketRates} onChange={inputHandler} readOnly />
// </div>

//                     <div className="price">
//                         <button onClick={addHandler}>Book your slot</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MovieTicketBooking;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Seat.css'
import toast from 'react-hot-toast';
import axiosInstance from '../../axiosInterceptor';

const MovieTicketBooking = () => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [date, setDate] = useState('');
    const { id } = useParams();
    const [bookings, setBookings] = useState({
        showDate: '',
        selectedSeats: [],
        pricePerSeat: ''
    });
    
    useEffect(() => {
        axiosInstance.get(`http://127.0.0.1:4000/page/movie/${id}`)
            .then((res) => {
                setMovieDetails(res.data);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
            });
    }, []);

    const inputHandler = (e) => {
        setBookings({
            ...bookings,
            [e.target.name]: e.target.value
        });
    }

    const handleCheckboxClick = (index) => {
        const updatedSelectedSeats = [...bookings.selectedSeats];
        const seatIndex = updatedSelectedSeats.indexOf(index);
        if (seatIndex === -1) {
            updatedSelectedSeats.push(index);
        } else {
            updatedSelectedSeats.splice(seatIndex, 1);
        }
        setBookings({
            ...bookings,
            selectedSeats: updatedSelectedSeats
        });
    };
    
    const addHandler = async() => {
        try {
            const { showDate, selectedSeats } = bookings;
            // Check if any required field is empty
            if (!showDate || selectedSeats.length === 0) {
                toast.error('All fields are required', { position: 'top-right' });
                return;
            }
            
            const totalPrice = selectedSeats.length * movieDetails.tickets[0].ticketRates; // Calculate total price
            
            const response = await axiosInstance.post(`http://127.0.0.1:4000/page/booktickets/${id}`, {
                showDate,
                selectedSeats,
                pricePerSeat: movieDetails.tickets[0].ticketRates
            });
            
            toast.success(response.data.message, { position: 'top-right' });
            window.location.reload(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Booking failed', { position: 'top-right' });
            } else {
                toast.error('Unauthorized', { position: 'top-right' });
            }
        }
    };

    const generateCheckboxes = () => {
        const checkboxes = [];
        const { numberOfSeats, bookedSeats } = movieDetails.tickets[0];
        
        for (let i = 1; i <= numberOfSeats; i++) {
            const isChecked = bookedSeats.includes(i);
            const isSelected = bookings.selectedSeats.includes(i); // Check if seat is selected
            checkboxes.push(
                <label key={i} className={`${isChecked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}>
                    <input
                        type="checkbox"
                        name="selectedSeats"
                        value={i}
                        checked={isSelected} // Check if seat is selected
                        onChange={() => handleCheckboxClick(i)}
                        disabled={isChecked}
                    />
                    <span className="seat-number">{i}</span>
                </label>
            );
            // Add line break after every 10 checkboxes
            if (i % 10 === 0) {
                checkboxes.push(<br key={`br-${i}`} />);
            }
        }
        
        return checkboxes;
    }
    
    if (!movieDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className='buytickets'>
            <div className="s1">
                <div className="head">
                    <h1>{movieDetails.title}</h1>
                    <h4>{movieDetails.languages}</h4>
                    <h5>{movieDetails.genre}</h5>
                </div>
                <div className='tickets'>
                    <div className='title'>
                        <h2>Movie Ticket Booking</h2>
                    </div>
                    <div className="main">
                        <input type="date" name="showDate" onChange={e => {setDate(e.target.value);inputHandler(e)}} />
                    </div>
                    <div className="showTime">
                        <input type='text' value={movieDetails.tickets[0]?.showTime} />
                    </div>

                    <div className="seats">
                        <h3>Select your seats:</h3>
                        {generateCheckboxes()}
                    </div>
                    <div className="price">
                        <input type='text' placeholder='Total Price' value={bookings.selectedSeats.length * movieDetails.tickets[0].ticketRates} readOnly />
                    </div>

                    <div className="price">
                        <button onClick={addHandler}>Book your slot</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieTicketBooking;
