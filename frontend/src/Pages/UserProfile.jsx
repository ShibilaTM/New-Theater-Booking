import { Box, Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
  return (
<Box width={"100%"} display={"flex"}>
  <Box 
    flexDirection={'column'} 
    justifyContent={'center'} 
    alignItems={"center"} 
    width={"30%"}
  >
    <AccountCircleIcon sx={{ fontSize:"10rem"}}/>
    <Typography 
            padding={1} 
            width={"auto"} 
            textAlign={'center'} 
            border={'1px solid #ccc'}
            borderRadius={6}
    >
     Name:   
    </Typography>
    <Typography 
            padding={1} 
            width={"auto"} 
            textAlign={'center'} 
            marginTop={'10px'}
            border={'1px solid #ccc'}
            borderRadius={6}
    >
     Email:   
    </Typography>

  </Box>
  <Box width={'70%'}></Box>
</Box>

  )
}

export default UserProfile
