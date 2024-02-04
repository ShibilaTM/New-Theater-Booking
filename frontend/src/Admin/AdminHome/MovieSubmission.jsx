import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const labelprops = {
  mt: 1,
  mb: 1,
};

const MovieSubmission = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    potraitImgUrl: '',
    landScapeImgUrl: '',
    rating: '',
    genre: '',
    languages: '',
    type: '',
    duration: '',
    releasedate: '',
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };
  const addHandler = async (e) => {
    try {
      const response = await axios.post('http://127.0.0.1:4000/page/createmovie', movie);
      const { id, message } = response.data;
  
      setMovie(response.data);
      toast.success(message, { position: 'top-right' });
      navigate(`/cast/${id}`);
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
            margin='auto'
            display={'flex'}
            flexDirection={'column'}
            boxShadow={'10px 10px 20px #ccc'}
            >
                <Typography 
                textAlign={'center'}
                variant='h5'
                fontFamily={'verdana'}>
                    Add New Movie
                </Typography>
                <FormLabel sx={labelprops}>Title</FormLabel>
                <TextField name='title' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Description</FormLabel>
                <TextField name='description' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Potrait Image Url</FormLabel>
                <TextField name='potraitImgUrl' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Landscape Image Url</FormLabel>
                <TextField name='landScapeImgUrl' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Rating</FormLabel>
                <TextField name='rating' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Languages</FormLabel>
                <TextField name='languages' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Category</FormLabel>
                <TextField name='type' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Duration</FormLabel>
                <TextField name='duration' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Genre</FormLabel>
                <TextField name='genre' variant='standard' margin='normal' onChange={inputHandler}/>
                <FormLabel sx={labelprops}>Release Date</FormLabel>
                <TextField name='releasedate' variant='standard' margin='normal' onChange={inputHandler}/>
                <Button variant='contained' sx={{
                    margin:'auto',
                    marginTop:'10px',
                    width:'30%' , 
                    backgroundColor:"rgb(252, 110, 28)" , 
                    ":hover":{backgroundColor:"darkorchid"
                    }}} 
                    onClick={addHandler}
                    >
                    Add New Movie </Button>
            </Box>
        </form>
    </div>
    </Sidebar>
  )
}

export default MovieSubmission
