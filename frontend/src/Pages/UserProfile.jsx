import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axiosInstance from '../axiosInterceptor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Fragment } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    console.log("Fetching data...");
    axiosInstance.get(`http://127.0.0.1:4000/page/bookedtickets`)
      .then((res) => {
        console.log("Data fetched:", res.data);
        setUser(res.data.user); // Extracting user data from the response
        setBookings(res.data.bookedTickets); // Extracting booked tickets from the response
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const handleDelete = async (movieId, bookingId) => {
  //   try {
  //     if (!movieId || !bookingId) {
  //       console.error('Invalid credentials:', movieId, bookingId);
  //       return;
  //     }
  
  //     // Send a DELETE request to the backend API to delete the booking
  //     const response = await axiosInstance.delete(`http://127.0.0.1:4000/bookings/${movieId}/${bookingId}`);
      
  //     // Handle successful deletion
  //     console.log('Booking deleted successfully:', response.data.message);
      
  //     // Remove the deleted booking from the local state
  //     setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
      
  //     // Implement any further logic if needed, such as updating the UI or fetching updated data
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error deleting booking:', error.response.data.error);
  //     // Implement error handling logic if needed
  //   }
  // };
  
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name: {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {user.email}
            </Typography>
          </Box>
        )}
        {bookings.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie: {booking.movieTitle}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Show Date: {new Date(booking.showDate).toLocaleDateString()}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Show Time: {booking.showTime}
                    </ListItemText>
               
                    {/* <IconButton
            onClick={() => handleDelete(booking.movieId, booking._id)}
            color="error"
          >
            <DeleteForeverIcon />
          </IconButton> */}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
}

export default UserProfile;





