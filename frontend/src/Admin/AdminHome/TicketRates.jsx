import React, { useState } from 'react';
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

const TicketRates = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState({
        showDate:"",
        showTime:"",
        numberOfSeats:"",
        bookedSeats:[],
        ticketRates:""
    })
    const inputHandler = (e)=>{
        setTickets({
            ...tickets,
            [e.target.name]: e.target.name === 'bookedSeats' ? e.target.value.split(',').map(seat => parseInt(seat.trim())) : e.target.value
        })
    }

    const addHandler = async(e)=>{
        try {
            const { showDate, showTime, numberOfSeats, bookedSeats, ticketRates} = tickets
            if (!showDate || !showTime ||!numberOfSeats||!ticketRates) {
                toast.error('All fields are required', { position: 'top-right' });
                return;
            }
            const payload = [tickets];
            console.log('Request Payload:', payload);
            const response = await axiosInstance.post(`http://127.0.0.1:4000/page/tickets/${id}`, payload);
            console.log('Response:', response.data);
            toast.success(response.data.message, { position: 'top-right' });
            navigate('/admindashboard')
        
            // Update local state with the new cast information
            setTickets({
                showDate:"",
                showTime:"",
                numberOfSeats:"",
                bookedSeats:[],
                ticketRates:""
            });
        } catch (error) {
            console.log('Error in axios request', error); 
            toast.error('tickets are already posted',{position: 'top-right'}) 
        }
    }

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
                fontFamily={'verdana'}>
                    Add Tickets & Seats
                </Typography>
                <FormLabel sx={labelprops}>Show Date</FormLabel>
                <TextField name='showDate' variant='standard' margin='normal' onChange={inputHandler} />
                <FormLabel sx={labelprops}>Show Time</FormLabel>
                <TextField name='showTime' variant='standard' margin='normal' onChange={inputHandler} />
                <FormLabel sx={labelprops}>Number Of Seats</FormLabel>
                <TextField name='numberOfSeats' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Booked Seats</FormLabel>
                <TextField name='bookedSeats' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Ticket Price</FormLabel>
                <TextField name='ticketRates' variant='standard' margin='normal' onChange={inputHandler}/>
                <Button variant='contained' sx={{
                    margin:'auto',
                    marginTop:'10px',
                    width:'30%' , 
                    backgroundColor:"rgb(252, 110, 28)" , 
                    ":hover":{backgroundColor:"darkorchid"
                    }}} 
                    onClick={addHandler}
                    >
                    Add Tickets </Button>
            </Box>
        </form>
    </div>
    </Sidebar>
  )
}

export default TicketRates;



