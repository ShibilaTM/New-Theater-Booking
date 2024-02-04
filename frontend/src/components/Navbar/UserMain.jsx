import React from 'react'
import UserNavbar from './UserNavbar'

const UserMain = (props) => {
  return (
    <div>
      <UserNavbar/>
      {props.child}
    </div>
  )
}

export default UserMain
