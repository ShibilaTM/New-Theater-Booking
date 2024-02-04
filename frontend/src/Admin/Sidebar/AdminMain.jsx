import React from 'react'
import Sidebar from './Sidebar'

const AdminMain = (props) => {
  return (
    <div>
      <Sidebar/>
      {props.child}
    </div>
  )
}

export default AdminMain
