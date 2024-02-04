import React from 'react'
import HomeSlider from './HomeSlider'
import UseMovieCarousel from './MovieCarousel/UseMovieCarousel'
import UserFooter from './Footer/UserFooter'

const UserHome = () => {
  return (
    <div>
      <HomeSlider/>
      <UseMovieCarousel/>
      <UserFooter/> 
    </div>
  )
}

export default UserHome
