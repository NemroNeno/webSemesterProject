import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loader from "../gifs/loader.svg";
import Modal from "react-modal";

const Register = () => {
  let subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      innerHeight: "100%",
      outerHeight: "100%",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user_info, setinfo] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
    answer: "",
    rePassword: "",
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

    if (
      !user_info.name ||
      !user_info.email ||
      !user_info.address ||
      !user_info.phoneNo ||
      !user_info.password ||
      !user_info.rePassword
    ) {
      console.log("coming here");
      toast.error("Enter all the fields!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(user_info);
      return;
    }

    if (user_info.password !== user_info.rePassword) {
      toast.error("Password does not match", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        user_info
      );
      setLoading(false);
      if (res.data.success) {
        await toast.success("Succesfully Signed Up", {
          position: "bottom-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login");
      } else {
        toast.error("Something went wrong", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <Layout>
      <section class="bg-gray-50 dark:bg-gray-900 !w-screen">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 !w-screen">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white pt-2"
          >
            <img
              class="w-8 h-8 mr-2 "
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </a>
          <div class="!w-5/12 bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create account
              </h1>
              <form class="space-y-4 md:space-y-6 w-full" action="#">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    value={user_info.name}
                    onChange={handleChange}
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-12/12"
                    placeholder="user name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user_info.email}
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div className="flex flex-row w-full gap-6">
                  <div className="w-6/12">
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={user_info.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="w-6/12">
                    <label
                      for="confirm-password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="confirm-password"
                      name="rePassword"
                      id="confirm-password"
                      value={user_info.rePassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-6">
                  <div className="w-6/12">
                    <label
                      for="address"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Address
                    </label>
                    <input
                      type="address"
                      name="address"
                      value={user_info.address}
                      onChange={handleChange}
                      id="address"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div className="w-6/12">
                    <label
                      for="phoneNo"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Phone Number
                    </label>
                    <input
                      type="phone"
                      name="phoneNo"
                      value={user_info.phoneNo}
                      onChange={handleChange}
                      id="phoneNo"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="+92-xxxx-xxxxxxx"
                      required=""
                    />
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  onClick={openModal}
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? (
                    <>
                      <img
                        src={loader}
                        className="w-[30px] h-[40px] bg-blend-color-dodge mx-auto my-0 py-0"
                      />
                    </>
                  ) : (
                    <>Create Account</>
                  )}
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className="h-2/6 w-4/12  bg-blue-200/65 mt-[250px] !mx-auto border-2 border-black/20 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:ring-primary-600 dark:ring-offset-gray-800"
          contentLabel="Ask Question"
          S
        >
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            className="text-black font-sans text-center mt-3 text-xl"
          >
            Enter your favourite movie name?{" "}
          </h2>
          <input
            placeholder="Star-Wars"
            onChange={handleChange}
            name="answer"
            value={user_info.answer}
            className="w-6/12 h-[40px] !ml-[120px] my-[40px] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
          />
          <button
            disabled={user_info.answer.length < 1}
            onClick={(e) => {
              closeModal();
              handleSubmit(e);
            }}
            className=" !ml-[180px] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Register
          </button>
        </Modal>
      </section>
    </Layout>
  );
};

export default Register;
