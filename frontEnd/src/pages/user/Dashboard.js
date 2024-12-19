import React from 'react'
import { NavLink } from 'react-router-dom'
import UserMenu from '../../Components/UserMenu'
import Layout from '../../Components/Layouts/Layout'
import { useAuth } from '../../Components/Layouts/context/auth'

export const Dashboard = () => {
  const [auth]=useAuth()


  return (
    <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
          <h3>User Name: {auth.user.name}</h3>
            
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

