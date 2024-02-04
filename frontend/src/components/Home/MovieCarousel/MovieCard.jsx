import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ potraitImgUrl, rating, title, genre }) => {
    const navigate =  useNavigate()
  return (
    <div
    className='moviecard'
    onClick={()=>{
        navigate('/login')
    }

    }   
>
      <div className='movieimg' style={{ backgroundImage: `url(${potraitImgUrl})` }}>
        <p className='rating'>
          <BsFillStarFill className='star' />&nbsp;&nbsp;
          {rating}/10
        </p>
      </div>
      <div className='details'>
        <p className='title'><b>{title}</b></p>
        <p className='type'>{genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;





// import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MovieCard = () => {
//   const [cardData, setData] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:4000/page/latestget').then((res) => {
//       setData(res.data); // Set the entire array as the new state
//       console.log(res.data);
//     });
//   }, []);

//   return (
//     <div style={{ margin: '7%' }}>
//       <Grid container spacing={2}>
//         {cardData.map((val, i) => (
//           <Grid item key={i} xs={12} sm={6} md={4}>
//             <Card sx={{ maxWidth: 1000 }}>
//               <CardMedia sx={{ height: 140 }} image={val.imageUrl} rating={val.rating} />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {val.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {val.genre}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default MovieCard;


