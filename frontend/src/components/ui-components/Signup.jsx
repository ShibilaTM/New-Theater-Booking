import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const navigate=useNavigate()
  const [user,setUser] =useState({
     
      name:'',
      email:'',
      password:'',
      
  })
  const [errors,setErrors] = useState({
    name:'',
    email:'',
    password:'',
    
  })
  const inputHandler= (e)=>{
    setUser({...user,
      [e.target.name]:e.target.value,
    })
    setErrors({
        ...errors,
        [e.target.name]:'',

    })

  }
  const validateEmail = (email)=>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const validatePassword = (password)=>{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/.test(password);
  }


  const addHandler = async (e) => {
    let isValid = true;
    const newErrors = {};
  
    if (!validateEmail(user.email)) {
      newErrors.email = 'Invalid Email address';
      isValid = false;
    }
  
    if (!validatePassword(user.password)) {
      newErrors.password = 'Password must be 8-12 characters and include at least one uppercase letter, one lowercase letter, and one digit';
      isValid = false;
    }
  
    setErrors(newErrors);
  
    if (isValid) {
   
  
      axios.post('http://127.0.0.1:4000/user/add', user)
        .then((response) => {
          //alert('Successfully registered');
          navigate('/login')
          toast.success(response.data.message,{position:'top-right'})
          
        })
        .catch((error) => {
          console.log('Error in axios request', error);
          if (error.response) {
            console.error('Server responded with status code:', error.response.status);
            alert('Already registered');
            console.error('Response data:', error.response.data);
          }
        });
    }
  };
  

  return (
    <Box
      display='flex'
      flexDirection={'column'}
      maxWidth={400}
      marginTop={10}
      marginLeft={55}
      alignItems='center'
      background='rgb(78, 77, 77)'
      padding={3}
      borderRadius={5}
      boxShadow={'5px 5px 10px #ccc'}
      sx={{
        ':hover': {
          boxShadow: '10px 10px 20px #ccc',
        },
        '@media (max-width:600px)': {
          marginLeft: 0,
          marginTop: 10,
          padding: 2,
          fontSize: '14px',
        },
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="div" sx={{ fontSize: '24px', color: 'darkred' }}>
        Sign Up
      </Typography>
    
      
      <TextField label="Name" name='name' onChange={inputHandler}  variant="outlined" sx={{ width: '100%', marginTop: '20px' }} />
      <TextField label="Email" name='email' onChange={inputHandler}  error={!!errors.email}
          helperText={errors.email}  variant="outlined" sx={{ width: '100%', marginTop: '10px' }} />
      <TextField label="Password"  error={!!errors.password}
          helperText={errors.password} name='password' onChange={inputHandler}  type="password" variant="outlined" sx={{ width: '100%', marginTop: '10px' }} />
      <Button variant="contained" onClick={addHandler} sx={{ width: '100%', marginTop: '20px', background: 'rgb(252, 110, 28)', color: 'white', ':hover': { background: 'lightblue',color:'black' } }}>
        Register
      </Button>
      <p style={{marginTop:'10px'}}>Already registered  <Link to='/login' style={{color: 'purple', marginTop: '10px', cursor: 'pointer',textDecoration:'underline'}}>Login</Link></p>
    </Box>
  );
};

export default Signup;