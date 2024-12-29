import React, { useState, useEffect } from 'react';
import UserMenu from '../../Components/UserMenu';
import Layout from '../../Components/Layouts/Layout';
import { useAuth } from '../../Components/Layouts/context/auth';
import axios from 'axios';

export const Dashboard = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <UserMenu />
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row justify-around text-[#161931]">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">User Dashboard</h2>
          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="User avatar"
              />
              <div className="flex flex-col space-y-5 sm:ml-8">
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                >
                  Change picture
                </button>
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
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
                    User Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    value={auth.user.name}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    value={auth.user.email}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    value={auth.user.role === 1 ? 'Admin' : 'User'}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-3xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Order History</h2>
          <div className="grid max-w-2xl mx-auto mt-8 overflow-x-auto">
            <div className="border shadow min-w-full">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 font-semibold">#</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                    <th className="px-4 py-2 font-semibold">Buyer</th>
                    <th className="px-4 py-2 font-semibold">Orders</th>
                    <th className="px-4 py-2 font-semibold">Payment</th>
                    <th className="px-4 py-2 font-semibold">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((ord, indx) => (
                    <React.Fragment key={indx}>
                      <tr>
                        <th className="px-4 py-2">{indx + 1}</th>
                        <th className="px-4 py-2">{ord?.status}</th>
                        <th className="px-4 py-2">{ord?.buyer?.name}</th>
                        <th className="px-4 py-2">{new Date(ord?.createAt).toLocaleDateString()}</th>
                        <th className="px-4 py-2">{ord?.payment.success ? "Success" : "Failure"}</th>
                        <th className="px-4 py-2">{ord?.products?.length}</th>
                      </tr>
                      <tr>
                        <td colSpan="6">
                          <div className="container">
                            {ord?.products?.map((p) => (
                              <div className="row flex" key={p?._id}>
                                <div className="col-md-3 mb-2">
                                  <img
                                    src={`http://localhost:8080/api/v1/product/get-productphoto/${p?._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                  />
                                </div>
                                <div className="flex col-md-6 font-weight-normal">
                                  <h6 className="font-weight-bold">Name: {p.name}</h6>
                                  <h6>Price: {p.price}</h6>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

