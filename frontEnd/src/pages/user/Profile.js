import React,{useEffect,useState} from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/UserMenu'
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Components/Layouts/context/auth';

const Profile = () => {
  const [auth,setAuth]=useAuth()

  const navigate = useNavigate();
  const [user_info, setinfo] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfo({
      ...user_info,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      console.log(user_info.password)
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {user_info},{
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        setAuth({...auth, user:res?.data?.updateUser})
        let ls=localStorage.getItem("auth");
        ls=JSON.parse(ls);
        ls.user=res.data.updateUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        alert(res.data.message)


      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


 useEffect(()=>{

   const {email, phoneNo,address,name}=auth?.user;
   setinfo({
    ...user_info,
    email, phoneNo,address,name
   })

 },[])



  return (
    <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
          
          <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <input
              name="name"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Name"
              value={user_info.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              value={user_info.password}
              onChange={handleChange}
           
            />
          </div>
          <div className="mb-3 ">
            <input
              name="email"
              type="emai"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              value={user_info.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div className="mb-3 ">
            <input
              name="address"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Address"
              value={user_info.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 ">
            <input
              name="phoneNo"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Phone Number"
              value={user_info.phoneNo}
              onChange={handleChange}
              required
            />
          </div>

          

          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>

          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Profile