import { Button, Grid, TextField, Paper } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate()
  const [admin,setAdmin] = useState({
    email:'',
    password:''
  })
  const inputHandler = (e)=>{
    setAdmin({
      ...admin,
      [e.target.name]:e.target.value
    })
  }

  const addHandler=()=>{
    axios.post('http://127.0.0.1:4000/admin/adminlogin',admin)
    .then((res)=>{
      if(res.data.message==='success'){
        sessionStorage.setItem('adminToken', res.data.token);
        toast.success(res.data.message,{position:'top-right'})
        navigate('/admindashboard')
      }
    })
    .catch((error) => {
      console.error(error);
  });
  }

  const paperStyle = { padding: 20, width: '100%', maxWidth: 400, margin: '20px auto' };
  const avatarStyle = { backgroundColor: '#005A92' };
  const buttonStyle = { margin: '15px 0',backgroundColor:"rgb(252, 110, 28)" ,color:'white'};


  return (
    <Grid container justifyContent="center">
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
          
          </Grid>
          <Grid item>
            <h1 sx={{ color: 'purple' }}>Login</h1>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant="outlined" label="Admin Email" name="email" onChange={inputHandler} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              variant="outlined"
              label="Admin Password"
              name="password"
              type="password"
              onChange={inputHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              variant="contained"
              color="secondary"
              style={buttonStyle}
              sx={{ width: '100%' }}
              onClick={addHandler}
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Link to='/' style={{color: 'blue', marginTop: '10px', cursor: 'pointer',textDecoration:'underline'}}>Back to Home page </Link>
        </Grid>
      </Paper>
    </Grid>
  );
};


export default AdminLogin
