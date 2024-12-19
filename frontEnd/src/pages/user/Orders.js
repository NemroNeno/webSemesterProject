import React,{useState,useEffect} from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/UserMenu'
import axios from 'axios';
import { useAuth } from '../../Components/Layouts/context/auth';


const Orders = () => {
  const [auth,setAuth]=useAuth()

const [orders,setOrders]=useState([]);


const getOrders= async ()=>{

  try {

    const {data}= await axios.get("http://localhost:8080/api/v1/auth/orders",{
      headers: {
        Authorization: auth?.token,
      },
    })
    
    setOrders(data);

  } catch (error) {
    console.log(error)
  }
}

 useEffect(()=>{

  if(auth?.token)
  getOrders()

 },[auth?.token])

  return (
    <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
          <h1>Your order history</h1>
                <div className='border shadow'>
                  <table className='table'>
                    <thead>
                      <td scope='col'>#</td>
                      <td scope='col'>Status</td>
                      <td scope='col'>Buyer</td>
                      <td scope='col'>Orders</td>
                      <td scope='col'>Payment</td>
                      <td scope='col'>Quantity</td>
                    </thead>
                    <tbody>
           {
            orders?.map((ord,indx)=>{
              return(
                <>

                      <tr>
                        <th>{indx+1}</th>
                        <th>{ord?.status}</th>
                        <th>{ord?.buyer?.name}</th>
                        <th>{ord?.createAt}</th>
                        <th>{ord?.payment.success? "Success": "Failure"}</th>
                        <th>{ord?.products?.length}</th>
                      </tr>

                      <div className='container'>

                      {ord?.products?.map((p) => (
              <div className="row ">
                <div className="col-md-3 mb-2">
                  <img
                    src={`http://localhost:8080/api/v1/product/get-productphoto/${p?._id}`}
                    className="card-img-top"
                  />
                </div>
                <div className="col-md-6 font-weight-normal">
                  <h6 className="font-weight-bold">Name: {p.name}</h6>
                  
                  <h6>Price: {p.price}</h6>
                  
                </div>
              </div>
            ))}
                      </div>

                </>
                 

              )
            })
           }

                    </tbody>
                  </table>
                </div>
            
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Orders