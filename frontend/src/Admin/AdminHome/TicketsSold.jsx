import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import axiosInstance from '../../axiosInterceptor';

const TicketsSold = () => {
  const [ticketsSold, setTicketsSold] = useState([]);

  useEffect(() => {
    axiosInstance.get(`http://127.0.0.1:4000/page/tickets-sold-per-day`)
      .then((res) => {
        setTicketsSold(res.data.ticketsSoldPerDay); // Update state with fetched data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array to run effect only once

  return (
    <Sidebar>
      <Box width={"100%"} display="flex">
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
              {ticketsSold.map((ticket, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: "rgb(78, 77, 77)",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Show Date: {ticket._id.showDate}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "auto", textAlign: "left" }}
                  >
                    Tickets Sold: {ticket.totalTicketsSold}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default TicketsSold;

