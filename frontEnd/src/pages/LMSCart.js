import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LMSHeader from "../Components/LMSComponents/LMSHeader";
import Footer from "../Components/Layouts/Footer";

const LMSCart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  let auth;
  const navigate = useNavigate();

  if (!auth) {
    let cuser = localStorage.getItem("auth");
    console.log(typeof cuser);
    try {
      auth = JSON.parse(cuser);
      console.log(auth);
    } catch (error) {
      console.error("Parsing error:", error);
    }
  }

  useEffect(() => {
    if (!auth?.user) {
      navigate("/lms-home");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setCart(response?.data?.userCart?.items);
        setTotal(response?.data?.totalPrice);
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert(
          `Error: ${error.response ? error.response.data.message : error.message
          }`
        );
      }
    };
    fetchCart();
  }, []);

  const stripePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/cart/purchase",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      const data = response.data;

      const enrollmentKeys = await handlePurchase();
      alert(enrollmentKeys);

      localStorage.setItem("enrollmentKeys", JSON.stringify(enrollmentKeys));

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(
        `Error: ${error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const handlePurchase = async () => {
    try {
      console.log("clicked");
      const response = await axios.post(
        "http://localhost:5000/cart/enrollmentKeys",
        { cart },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (response) {
        alert("Enrollment Key generated", await response.data.enrollmentKeys);
        return response.data.enrollmentKeys;
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(
        `Error: ${error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const handleCartQuantityChange = (courseId, newQuantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.courseId._id === courseId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });

    setTotal((prevCart) => {
      return cart.reduce(
        (total, item) =>
          item.courseId._id === courseId
            ? total + item.courseId.price * newQuantity
            : total + item.courseId.price * item.quantity,
        0
      );
    });
  };

  return (
    <section className="bg-white antialiased dark:bg-gray-900">
      <LMSHeader />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 py-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Cart Items
        </h2>
        {!cart && (
          <div className="h-full w-full flex justify-center items-center ubuntu-medium">
            Nothing to show here!
          </div>
        )}
        {cart && (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {item?.courseId?.title}
                          </a>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              onClick={() =>
                                handleCartQuantityChange(
                                  item?.courseId,
                                  item.quantity > 1
                                    ? (item.quantity -= 1)
                                    : 1
                                )
                              }
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              ${item?.courseId?.price}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center border-gray-700">
                          <span
                            onClick={() =>
                              handleCartQuantityChange(
                                item?.courseId,
                                item.quantity > 1
                                  ? (item.quantity -= 1)
                                  : 1
                              )
                            }
                            className="border-2 border-gray-300 cursor-pointer rounded-l justify-center flex bg-gray-100 py-1.5 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            -
                          </span>
                          <input
                            className="py-2.5 w-8 border-2 border-gray-300 bg-white text-center text-xs outline-none"
                            type="text"
                            value={item.quantity}
                            min="0"
                          />
                          <span
                            onClick={() =>
                              handleCartQuantityChange(
                                item?.courseId,
                                (item.quantity += 1)
                              )
                            }
                            className="border-2 border-gray-300 cursor-pointer rounded-r justify-center flex bg-gray-100 py-1.5 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${total}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        ${total}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={stripePayment}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Do you have a voucher or gift card?
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default LMSCart;
