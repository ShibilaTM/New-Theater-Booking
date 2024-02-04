import React, { useState } from 'react'
import logo from '../assets/newlogo.PNG';
import { BiSearch, BiUserCircle } from "react-icons/bi";
import {Link} from 'react-router-dom'
const UserNavbar = () => {
    
  return (
   <nav>
    <div className='left'>
        <img src={logo} alt='logo' width={100} height={100}/>
        <div className="searchbox">
            <BiSearch className='searchbtn' />
            <input type='text' placeholder='Search For a Movie'/>
        </div>
    </div>
    
    <div className='right'>
            <Link className='signup' to={'/user'}>Home</Link>
            <Link className='signup' to={'/'}>Logout</Link>
            <Link className='linkstylenone'>
                <BiUserCircle className='theme_icon1'/>
            </Link>
        
              
    </div>
   </nav>
  )
}

export default UserNavbar



