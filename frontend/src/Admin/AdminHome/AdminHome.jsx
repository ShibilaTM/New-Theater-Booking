import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import '../Sidebar/Sidebar'
import Sidebar from '../Sidebar/Sidebar';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInterceptor';

const AdminHome = () => {
  const [cardData, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get('http://127.0.0.1:4000/page/movies').then((res) => {
      setData(res.data); // Set the entire array as the new state
      console.log(cardData);
    });
  }, []);

  const deleteMovie = async(movieId)=>{
    await axiosInstance.delete(`http://localhost:4000/page/remove/${movieId}`)
    .then((response)=>{ 
        setData((prevMovie)=>prevMovie.filter((val)=>val._id !==movieId))
        toast.success(response.data.message,{position:'top-right'})
    }).catch((error)=>{
        console.log(error)
    })
  }

  return (
    <Sidebar>
    <div style={{ margin: '5%' }}>
    <Grid container spacing={3}>
      {cardData.map((val, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <Card sx={{ 
            maxWidth: 250,
            height:420,
            borderRadius:5,
            ":hover":{
              boxShadow:'10px 10px 20px #ccc'
            }
            }}>
            <CardMedia
              sx={{ height: 250 }}
              image={val.potraitImgUrl}
              title={val.title}
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                {val.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {val.genre}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
              size="small" 
              sx={{  
                color:'rgb(252, 110, 28)',
                '&:hover': { backgroundColor: 'rgb(245, 169, 126)',color:'black' } 
                }}
              onClick={()=>deleteMovie(val._id)}  >
                Delete
              </Button>
              <Button size="small" 
              sx={{ 
                color:'rgb(252, 110, 28)',
                '&:hover': { backgroundColor: 'rgb(245, 169, 126)',
                color:'black'
                }}}><Link to={`/tickets/`+ val._id} style={{   color:'rgb(252, 110, 28)','&:hover': { backgroundColor: 'rgb(245, 169, 126)',
                color:'white'}}}>Tickets</Link>              
              </Button>
              <Button size="small" 
              sx={{ 
                color:'rgb(252, 110, 28)',
                '&:hover': { backgroundColor: 'rgb(245, 169, 126)',
                color:'black'
                }}}><Link to={`/edit/`+ val._id} style={{   color:'rgb(252, 110, 28)','&:hover': { backgroundColor: 'rgb(245, 169, 126)',
                color:'white'}}}>Update</Link>              
              </Button>
            </CardActions>

          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
  </Sidebar>
  );
};

export default AdminHome;

