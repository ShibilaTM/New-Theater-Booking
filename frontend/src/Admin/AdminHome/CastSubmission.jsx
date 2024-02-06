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
  const { id } = useParams();
console.log('Movie ID:', id);
 // Get the movieId from the route parameters

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
      const payload = [cast];
      console.log('Request Payload:', payload);
      const response = await axios.post(`http://127.0.0.1:4000/page/addcelebtomovie/${id}`, payload);
      console.log('Response:', response.data);
      toast.success(response.data.message, { position: 'top-right' });
  
      // Update local state with the new cast information
      setCast({
        celebName: '',
        celebRole: '',
        celebImage: '',
      });
    } catch (err) {
      console.log('Error in axios request', err);
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
            <FormLabel sx={labelprops}>Name</FormLabel>
                <TextField name='celebName' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Role</FormLabel>
                <TextField name='celebRole' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Image Url</FormLabel>
                <TextField name='celebImage' variant='standard' margin='normal' onChange={inputHandler}/>
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
