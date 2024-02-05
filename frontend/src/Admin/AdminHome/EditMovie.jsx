import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const labelprops = {
  mt: 1,
  mb: 1,
};
const EditMovie = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [movieDetails,setMovieDetails] = useState({
    title: '',
    description: '',
    potraitImgUrl: '',
    landScapeImgUrl: '',
    rating: '',
    genre: '',
    languages: '',
    type: '',
    duration: '',
    releasedate: ''
  })
  const inputChangeHandler = (e) =>{
    setMovieDetails({
      ...movieDetails,
      [e.target.name]:e.target.value
    })
  }

  useEffect(()=>{
    axios.get(`http://127.0.0.1:4000/page/movie/${id}`)
    .then((response)=>{
      setMovieDetails(response.data)
    }).catch((error)=>{
        console.log(error)
    })
  },[id])

  const addChangeHandler = async(e)=>{
    e.preventDefault()
    await axios.put(`http://127.0.0.1:4000/page/update/${id}`,movieDetails)
    .then((response)=>{
      toast.success(response.data.message,{position:'top-right'})
      navigate('/admindashboard')
    }
    )
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
                    Update Movie
                </Typography>
                <FormLabel sx={labelprops}>Title</FormLabel>
                <TextField name='title' value={movieDetails.title} variant='standard' margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Description</FormLabel>
                <TextField name='description' value={movieDetails.description} variant='standard' margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Potrait Image Url</FormLabel>
                <TextField name='potraitImgUrl' value={movieDetails.potraitImgUrl} variant='standard' margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Landscape Image Url</FormLabel>
                <TextField name='landScapeImgUrl' value={movieDetails.landScapeImgUrl} variant='standard' margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Rating</FormLabel>
                <TextField name='rating' variant='standard' value={movieDetails.rating} margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Languages</FormLabel>
                <TextField name='languages' variant='standard' value={movieDetails.languages} margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Category</FormLabel>
                <TextField name='type' variant='standard' value={movieDetails.type} margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Duration</FormLabel>
                <TextField name='duration' variant='standard' value={movieDetails.duration} margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Genre</FormLabel>
                <TextField name='genre' variant='standard' value={movieDetails.genre} margin='normal' onChange={inputChangeHandler}/>
                <FormLabel sx={labelprops}>Release Date</FormLabel>
                <TextField name='releasedate' variant='standard' value={movieDetails.releasedate} margin='normal' onChange={inputChangeHandler}/>
                <Button variant='contained' sx={{
                    margin:'auto',
                    marginTop:'10px',
                    width:'30%' , 
                    backgroundColor:"rgb(252, 110, 28)" , 
                    ":hover":{backgroundColor:"darkorchid"
                    }}} 
                    onClick={addChangeHandler}
                    >
                    Update Movie </Button>
            </Box>
        </form>
    </div>
    </Sidebar>
  )
}

export default EditMovie
