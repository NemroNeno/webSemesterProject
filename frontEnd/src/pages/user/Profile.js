import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import UserMenu from '../../Components/UserMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from '../../Components/Layouts/context/auth';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [user_info, setinfo] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfo({
      ...user_info,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setinfo({
      ...user_info,
      photo: e.target.files[0],
    });
  };

  const handleDeletePhoto = () => {
    setinfo({
      ...user_info,
      photo: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", user_info.name);
      formData.append("email", user_info.email);
      formData.append("address", user_info.address);
      formData.append("phoneNo", user_info.phoneNo);
      formData.append("password", user_info.password);
      if (user_info.photo) {
        formData.append("photo", user_info.photo);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        formData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
        setAuth({ ...auth, user: res?.data?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        alert(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const { email, phoneNo, address, name, photo } = auth?.user;
    setinfo({
      ...user_info,
      email, phoneNo, address, name, photo
    });
  }, []);

  return (
    <Layout>
      <UserMenu />
      <div className="bg-white w-full flex justify-center px-3 text-[#161931]">
        <div className="px-6 pb-8 mt-8 sm:max-w-2xl sm:rounded-lg w-full">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profile Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src={user_info.photo ? URL.createObjectURL(user_info.photo) : "https://via.placeholder.com/150"}
                  alt="User avatar"
                />
                <div className="flex flex-col space-y-5 sm:ml-8">
                  <label className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer">
                    Change picture
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      hidden
                    />
                  </label>
                  <button
                    type="button"
                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    onClick={handleDeletePhoto}
                  >
                    Delete picture
                  </button>
                </div>
              </div>
              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Enter your Name"
                      value={user_info.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Enter your email"
                      value={user_info.email}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Enter your Address"
                      value={user_info.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="phoneNo"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNo"
                      name="phoneNo"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Enter your Phone Number"
                      value={user_info.phoneNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Enter Your Password"
                      value={user_info.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;