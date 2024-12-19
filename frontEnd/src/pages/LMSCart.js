import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
// import { useAuth } from "../Components/Layouts/context/auth";
import { useNavigate } from "react-router-dom";

// const auth?.token = localStorage.getItem("token");

const LMSCart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null);
  // const { user } = useAuth();
  const navigate = useNavigate();

  let auth;

  if(!auth){
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
            "Authorization": `Bearer ${auth?.token}`,
          },
        });
        setCart(response?.data?.userCart?.items);
        setTotal(response?.data?.totalPrice);
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert(
          `Error: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    };
    fetchCart();
  }, []);

  const stripePayment = async() => {
    try {
        const response = await axios.post('http://localhost:5000/cart/purchase', {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth?.token}`,
            },
        })

        const data = response.data;
        
        const enrollmentKeys = await handlePurchase();
        alert(enrollmentKeys);

        localStorage.setItem("enrollmentKeys", JSON.stringify(enrollmentKeys));

        if(data.session.url){
            window.location.href = data.session.url;
        }

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert(
          `Error: ${
            error.response ? error.response.data.message : error.message
          }`
        );
    }
  }

  const handlePurchase = async() => {
    try {
        console.log("clicked")
        const response = await axios.post('http://localhost:5000/cart/enrollmentKeys',{cart},{headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${auth?.token}`
        }});

        if(response){
            alert("Enrollment Key generated",await response.data.enrollmentKeys);
            return response.data.enrollmentKeys;
        }
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert(
          `Error: ${
            error.response ? error.response.data.message : error.message
          }`
        );
    }
  }

  const handleCartQuantityChange = (courseId, newQuantity) => {
    setCart((prevCart) => {
        return prevCart.map((item) =>
          item.courseId._id === courseId ? { ...item, quantity: newQuantity } : item
        );
      });

      setTotal((prevCart) => {
        return cart.reduce((total, item) =>
          item.courseId._id === courseId ? total + item.courseId.price * newQuantity : total + item.courseId.price * item.quantity
        , 0);
      });
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F3F4F6] overflow-auto p-8">
      <p className="luckiest-guy-regular flex justify-center text-3xl">
        Cart Items
      </p>
      {!cart && <div className="h-full w-full flex justify-center items-center ubuntu-medium">Nothing to show here!</div>}
      {cart && <div className="flex flex-row h-full w-full  p-4">
        {/* First Column of screen */}
        <div className="h-full w-3/5  flex flex-col gap-3 overflow-y-auto">
            {cart?.map((item, index) => {
              return (
                <div className="min-w-full h-1/5 bg-white flex-col justify-evenly shadow-xl rounded-lg border-2 border-gray-200 py-4 px-6">
                  <div className="h-1/2 flex justify-between font-semibold">
                    <p>{item?.courseId?.title}</p>
                    <div class="flex items-center border-gray-700">
                      <span onClick={()=>handleCartQuantityChange(item?.courseId, item.quantity > 1 ? item.quantity -= 1 : 1)} class="border-2 border-gray-300 cursor-pointer rounded-l justify-center flex bg-gray-100 py-1.5 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        -
                      </span>
                      <input
                        class="py-2.5 w-8 border-2 border-gray-300 bg-white text-center text-xs outline-none"
                        type="text"
                        value={item.quantity}
                        min="0"
                      />
                      <span onClick={()=>handleCartQuantityChange(item?.courseId, item.quantity += 1)} class="border-2 border-gray-300 cursor-pointer rounded-r justify-center flex bg-gray-100 py-1.5 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        +
                      </span>
                    </div>
                  </div>
                  <div className="h-1/2 flex justify-between">
                    <p>{item?.courseId?.instructor}</p>
                    <p>$ {item?.courseId?.price}</p>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Second Column of screen */}
        <div className="h-full flex flex-col w-2/5 p-4 gap-4">
          <div className="shadow-xl h-3/5 flex flex-col bg-white border-gray-300 border-2 rounded-lg py-10 px-6 gap-4">
            <div className="flex flex-row justify-between">
              <p className="text-2xl">Subtotal</p>
              <p className="text-2xl">{total}</p>
            </div>
            <div className="h-1 w-full bg-gray-400 mt-4"></div>
            <div className="flex flex-row justify-between">
              <p className="text-2xl font-semibold">Total</p>
              <p className="text-2xl">$ {total}</p>
            </div>
            <button onClick={stripePayment} className="w-full h-full text-white bg-blue-500 mt-4 rounded-md">
              Checkout
            </button>
          </div>
          <div className="h-2/5 shadow-xl bg-white border-gray-300 flex flex-col justify-center items-center border-2 rounded-lg px-8 py-4">
            <div className="flex flex-row justify-between w-full">
              <p className="text-2xl font-semibold">Your Wallet</p>
              <p className="text-2xl">Sum here</p>
            </div>
            <button className="w-full h-16 text-white bg-blue-500 mt-4 rounded-md">
              Use Wallet
            </button>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default LMSCart;
