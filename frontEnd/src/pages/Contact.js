import React from 'react'
import Layout from '../Components/Layouts/Layout'
import {HiOutlineMailOpen} from "react-icons/hi"
import {AiFillPhone} from "react-icons/ai"
import {BsHeadphones} from "react-icons/bs"



const Contact = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className='col-md-6'>
          <img src="/images/call.jpg" 
            alt="contactUs"
            style={{width:"100%"}}
          />
        </div>
     <div className='col-md-4'>
      <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
      <p className='text-justify mt-2'>Any query and info about product. Feel free to call anytime . Helpline is available 24/7</p>
      <p className='mt-3'>
      <HiOutlineMailOpen/>:www.hasdjfk@gdjla.com

      </p>
      <p className='mt-3'>
       <AiFillPhone/> :2893828900892
        
      </p>

      <p className='mt-3'>
       <BsHeadphones/> :384938-0000-89389 (toll free)
        
      </p>
     </div>

      </div>
    </Layout>
  )
}

export default Contact