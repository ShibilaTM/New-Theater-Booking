import React from 'react'
import { FaPhoneVolume } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import logo from '../../assets/newlogo.PNG'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="sb_footer section_padding">
        <div className="sb_footer-links-div">
                <p><img src={logo} alt='logo'  /></p>       
                <p>The greatest movie booking software to reserve your showing at your preferred theater and on your preferred day and time</p> 
                <div className='socialmedia'>
                    <p><FaFacebookSquare/></p>
                    <p><FaTwitter/></p>
                    <p><FaInstagram /></p>
                    <p><FaLinkedin/></p>
                </div>
            </div>
            <div className="sb_footer-links-div">
                <h4>Quick Links</h4>
                <a href="/login">
                    <p>Login</p>
                </a>
                <a href="/signup">
                    <p>Signup</p>
                </a>
                <a href="/">
                    <p>Home</p>
                </a>
            </div>
            <div className="sb_footer-links-div">
                <h4>Contacts Info</h4>           
                    <p><FaPhoneVolume className='icons'/> +4933-221-245</p>   
                                
                    <p><SiGmail className='icons'/> bookmovie@gmail.com</p>
                                   
                    <p><FaLocationDot className='icons'/> Malappuram,Kerala</p>
            </div>
        </div>
            <hr />
        <div className="sb_footer-below">
            <div className="sb_footer-copyright">
                <p>
                    Copyright {new Date().getFullYear()} <FaRegCopyright/> BookMovie Entertainment Pvt.Ltd.All Rights Reserved
                </p>
            </div>
        </div>
    </div>
    
  )
}

export default Footer
