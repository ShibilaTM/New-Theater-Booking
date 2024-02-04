import React from 'react'
import Navbar from './Navbar'

const Main = (props) => {
  return (
    <div>
      <Navbar/>
      {props.child}
    </div>
  )
}

export default Main
