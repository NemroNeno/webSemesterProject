import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    
    <div className="list-group">
    <h2>User Panel</h2>

    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Manage Profile</NavLink>
    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">View Orders</NavLink>
  </div>
  )
}

export default UserMenu