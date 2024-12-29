import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "./../../Components/Layouts/Layout";
import { useAuth } from "../../Components/Layouts/context/auth";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

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
        `http://localhost:8080/api/v1/auth/Allorders/${auth?.user?.id}`,
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

  const handleChange = async (newVal, id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/order-status/${id}`,
        { newVal },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      getOrders();
    } catch (error) {
      console.log(error);
      alert("Error in updating the status !");
    }
  };

  return (
    <Layout>
      <AdminMenu />
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">Order History</h2>
          <div className="mt-7 border border-gray-300 pt-9">
            {orders?.map((ord, indx) => (
              <div key={indx}>
                <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                  <div className="data">
                    <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #{ord._id}</p>
                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Payment : {new Date(ord.createAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3 max-md:mt-5">
                    <Select
                      bordered={false}
                      onChange={(value) => handleChange(value, ord._id)}
                      defaultValue={ord?.status}
                      className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400"
                    >
                      {status.map((s, i) => (
                        <Option key={i} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                  <path d="M0 1H1216" stroke="#D1D5DB" />
                </svg>
                <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                  <div className="grid grid-cols-4 w-full">
                    <div className="col-span-4 sm:col-span-1">
                      <img src={`http://localhost:8080/api/v1/product/get-productphoto/${ord.products[0]?._id}`} alt="" className="max-sm:mx-auto object-cover" />
                    </div>
                    <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                      <h6 className="font-manrope font-semibold text-xl leading-9 text-black mb-3 whitespace-nowrap">{ord.products[0]?.name}</h6>
                      <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                        <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: {ord.products[0]?.quantity}</span>
                        <p className="font-normal text-lg leading-8 text-black whitespace-nowrap">Price ${ord.products[0]?.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-around mt-5 w-full sm:pl-28 lg:pl-0">
                    <div className="flex flex-col justify-center items-start max-sm:items-center">
                      <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Status</p>
                      <p className={`font-semibold text-lg leading-8 text-left whitespace-nowrap ${ord.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>{ord.status}</p>
                    </div>
                    <div className="flex flex-col justify-center items-start max-sm:items-center">
                      <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Delivery Expected by</p>
                      <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">{new Date(ord.expectedDelivery).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                  <path d="M0 1H1216" stroke="#D1D5DB" />
                </svg>
                <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                  <div className="flex max-sm:flex-col-reverse items-center">
                    <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
                      <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600" d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259" stroke="" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      cancel order
                    </button>
                    <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">Payment Is Successful</p>
                  </div>
                  <p className="font-medium text-xl leading-8 text-black max-sm:py-4"><span className="text-gray-500">Total Price: </span>&nbsp;${ord.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminOrders;
