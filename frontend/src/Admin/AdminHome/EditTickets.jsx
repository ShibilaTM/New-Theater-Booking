import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInterceptor';

const labelprops = {
  mt: 1,
  mb: 1,
};

const EditTickets = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState({
        showDate:"",
        showTime:"",
        numberOfSeats:"",
        bookedSeats:[],
        ticketRates:""
    });

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axiosInstance.get(`http://127.0.0.1:4000/page/movie/${id}`);
                const movieData = response.data;
                if (movieData.tickets && movieData.tickets.length > 0) {
                    // Assuming only one ticket can be added, so we'll display existing ticket information
                    const firstTicket = movieData.tickets[0];
                    setTickets({
                        showDate: firstTicket.showDate,
                        showTime: firstTicket.showTime,
                        numberOfSeats: firstTicket.numberOfSeats,
                        bookedSeats: firstTicket.bookedSeats.join(', '), // Convert array to comma-separated string
                        ticketRates: firstTicket.ticketRates
                    });
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
                toast.error('Error fetching movie details. Please try again later.', { position: 'top-right' });
            }
        };

        fetchMovieDetails();
    }, [id]);

    const inputHandler = (e)=>{
        setTickets({
            ...tickets,
            [e.target.name]: e.target.value
        });
    };

    // const updateHandler = async(e)=>{
    //     try {
    //         const { showDate, showTime, numberOfSeats, bookedSeats, ticketRates } = tickets;
    //         if (!showDate || !showTime || !numberOfSeats || !ticketRates) {
    //             toast.error('All fields are required', { position: 'top-right' });
    //             return;
    //         }
            
    //         // Assuming only one ticket can be added, so we'll restrict the update if tickets already exist
    //         const response = await axiosInstance.put(`http://127.0.0.1:4000/page/tickets/${id}`, tickets);
    //         toast.success(response.data.message, { position: 'top-right' });
    //         navigate('/admindashboard');
    //     } catch (error) {
    //         console.log('Error in axios request', error);  
    //         toast.error('Error updating tickets. Please try again later.', { position: 'top-right' });
    //     }
    // };
    const updateHandler = async(e)=>{
        try {
            const { showDate, showTime, numberOfSeats, bookedSeats, ticketRates } = tickets;
            if (!showDate || !showTime || !numberOfSeats || !ticketRates) {
                toast.error('All fields are required', { position: 'top-right' });
                return;
            }
            const payload = {
                showDate,
                showTime,
                numberOfSeats,
                bookedSeats: bookedSeats.split(',').map(seat => parseInt(seat.trim())),
                ticketRates
            };
            const response = await axiosInstance.put(`http://127.0.0.1:4000/page/tickets/${id}`, payload);
            toast.success(response.data.message, { position: 'top-right' });
            navigate('/admindashboard');
        } catch (error) {
            console.log('Error in axios request', error);  
        }
    };

    return (
        <Sidebar>
            <div>
                <form>
                    <Box 
                        width={'50%'}
                        padding={10}
                        margin='auto'
                        display={'flex'}
                        flexDirection={'column'}
                        boxShadow={'10px 10px 20px #ccc'}
                    >
                        <Typography 
                            textAlign={'center'}
                            variant='h5'
                            fontFamily={'verdana'}
                        >
                            Edit Tickets & Seats
                        </Typography>
                        <FormLabel sx={labelprops}>Show Date</FormLabel>
                        <TextField name='showDate' variant='standard' margin='normal' onChange={inputHandler} value={tickets.showDate} />
                        <FormLabel sx={labelprops}>Show Time</FormLabel>
                        <TextField name='showTime' variant='standard' margin='normal' onChange={inputHandler} value={tickets.showTime} />
                        <FormLabel sx={labelprops}>Number Of Seats</FormLabel>
                        <TextField name='numberOfSeats' variant='standard' margin='normal' onChange={inputHandler} value={tickets.numberOfSeats} />
                        <FormLabel sx={labelprops}>Booked Seats</FormLabel>
                        <TextField name='bookedSeats' variant='standard' margin='normal' onChange={inputHandler} value={tickets.bookedSeats} />
                        <FormLabel sx={labelprops}>Ticket Price</FormLabel>
                        <TextField name='ticketRates' variant='standard' margin='normal' onChange={inputHandler} value={tickets.ticketRates} />
                        <Button 
                            variant='contained' 
                            sx={{
                                margin:'auto',
                                marginTop:'10px',
                                width:'30%' , 
                                backgroundColor:"rgb(252, 110, 28)" , 
                                ":hover":{backgroundColor:"darkorchid"}
                            }} 
                            onClick={updateHandler}
                            disabled={tickets.showDate && tickets.showTime && tickets.numberOfSeats && tickets.ticketRates ? false : true}
                        >
                            Update Tickets
                        </Button>
                    </Box>
                </form>
            </div>
        </Sidebar>
    );
}

export default EditTickets;

