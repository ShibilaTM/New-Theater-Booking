import React, { useState } from 'react';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'; // Import useParams

const labelprops = {
  mt: 1,
  mb: 1,
};

const CastSubmission = () => {
  const { movieId } = useParams(); // Get the movieId from the route parameters

  const [cast, setCast] = useState({
    celebName: '',
    celebRole: '',
    celebImage: '',
  });

  const inputHandler = (e) => {
    setCast({
      ...cast,
      [e.target.name]: e.target.value,
    });
  };

  const addHandler = async (e) => {
    try {
      await axios.post(`http://127.0.0.1:4000/page/addcelebtomovie/${movieId}`, cast);
      // Assuming your backend route for adding cast includes the movieId as a parameter

      setCast({
        celebName: '',
        celebRole: '',
        celebImage: '',
      });

      toast.success('Cast added successfully', { position: 'top-right' });
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
            margin="auto"
            display={'flex'}
            flexDirection={'column'}
            boxShadow={'10px 10px 20px #ccc'}
          >
            <Typography textAlign={'center'} variant="h5" fontFamily={'verdana'}>
              Add Cast
            </Typography>
            {/* Your form fields for cast submission */}
            <Button
              variant="contained"
              sx={{
                margin: 'auto',
                marginTop: '10px',
                width: '30%',
                backgroundColor: 'rgb(252, 110, 28)',
                ':hover': { backgroundColor: 'darkorchid' },
              }}
              onClick={addHandler}
            >
              Add
            </Button>
          </Box>
        </form>
      </div>
    </Sidebar>
  );
};

export default CastSubmission;
