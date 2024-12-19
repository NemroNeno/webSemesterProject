import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "./../../Components/Layouts/Layout";
import { useAuth } from "../../Components/Layouts/context/auth";
import axios from "axios";
import { Select } from "antd";

const {Option}=Select;




const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const [changeStatus, setChangeStatus] = useState("");

  const [auth, setAuth] = useAuth();

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/Allorders",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


const handleChange = async(newVal,id)=>{

  try {
    const { data } = await axios.put(
      `http://localhost:8080/api/v1/auth/order-status/${id}`,
      {newVal},
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );

    getOrders();
  
    
  } catch (error) {
    console.log(error)
    alert("Error in updating the status !");
  }
}






  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>



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
                        <th>

                 <Select bordered={false} onChange={(value)=>handleChange(value,ord._id)}
                 defaultValue={ord?.status}
                 >
                
               { status.map((s,i)=>(
<Option key={i} value={s}>
   {s}
</Option>

               ))}
                  
                 </Select>


                        </th>
                        <th>{ord?.buyer?.name}</th>
                        <th>{ord?.createAt}</th>
                        <th>{ord?.payment.success? "Success": "Failer"}</th>
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
    </Layout>
  );
};

export default AdminOrders;
