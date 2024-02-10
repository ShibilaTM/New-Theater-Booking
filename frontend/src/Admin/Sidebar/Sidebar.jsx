// Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';
import { FaTh, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { MdMovieCreation, MdMovieFilter } from 'react-icons/md';
import { BsTicketDetailedFill } from "react-icons/bs";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/admindashboard',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/moviesubmission',
      name: 'Movie Submissions',
      icon: <MdMovieCreation />,
    },
    {
      path: '/ticketsSold',
      name: 'Sold Tickets',
      icon: <BsTicketDetailedFill />
    },
    {
      path: '/',
      name: 'Logout',
      icon: <IoLogOut />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? '300px' : '50px' }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
            Admin
          </h1>
          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;

