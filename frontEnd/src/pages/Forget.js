import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/Layouts/context/auth";

const Forget = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user_info, setinfo] = useState({
    email: "",

    newPassword: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setinfo({
      ...user_info,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        user_info
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error.response);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="register">
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <input
              name="email"
              type="emai"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              value={user_info.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              name="answer"
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Favourite movie character"
              value={user_info.answer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              name="newPassword"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
              value={user_info.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forget;
