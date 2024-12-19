import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useAuth } from "../Components/Layouts/context/auth";
import { useCart } from "../Components/Layouts/context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [item, setItem] = useCart();
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const removeItem = (pid) => {
    try {
      let myItem = [...item];
      let index = myItem.findIndex((p) => p._id === pid);
      myItem.splice(index, 1);
      setItem(myItem);
      localStorage.setItem(`cart${auth?.user?.name}`, JSON.stringify(myItem));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      item?.map((i) => {
        total = total + i.price;
      });

      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          item,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      setLoading(false);
      localStorage.removeItem("dart");
      setItem([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4 className="text-center">
              {item?.length > 0
                ? `You have ${item.length} in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : `You have no item in your cart  `}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 card">
            {item?.map((p) => (
              <div className="row ">
                <div className="col-md-3 mb-2">
                  <img
                    src={`http://localhost:8080/api/v1/product/get-productphoto/${p?._id}`}
                    className="card-img-top"
                  />
                </div>
                <div className="col-md-6 font-weight-normal">
                  <h4 className="font-weight-bold">Name: {p.name}</h4>
                  <h4>
                    Product Description:{" "}
                    <h6>
                      <p>{p.description}</p>
                    </h6>
                  </h4>
                  <h4>Price: {p.price}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(p._id)}
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}.00 $</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline warnnig"
                      onChange={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login ")}
                    >
                      {" "}
                      Login First
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-2">
              {!clientToken || !item.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={!instance || !auth?.user?.address}
                  >
                    {loading ? "Processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
