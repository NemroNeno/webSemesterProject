import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";

import axios from "axios";
import toast from "react-hot-toast";

import { Checkbox, Radio } from "antd";
import { genComponentStyleHook } from "antd/es/theme/internal";
import { prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/Layouts/context/cart";
import Product from "../Components/Routes/Product";
import { useSearch } from "../Components/Layouts/context/search";

import { faArrowLeft } from "react-icons/fa";
import { useAuth } from "../Components/Layouts/context/auth";

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [item, setItem] = useCart([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useSearch();
  const [searchUsed, setSearchUsed] = useState(false);

 

  //Getting All the Categories
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/getall-category"
      );

      // alert("Home: ", );
      

      if (res.data.success) {
        setCategories(res?.data.category);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getTotal = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();

  }, []);

  useEffect(() => {
    setProducts(search.results);
  }, [search.results]);

  //Getting all the products
  const getAllproducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      setProducts(res.data?.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllproducts();
  }, [checked, radio]);

  useEffect(() => {
    getAllproducts();
   
  }, []);

  const handleFilter = (value, id) => {
  
    let arr = [...checked];
    if (value) {
      arr.push(id);
    } else {
      arr = arr.filter((c) => c !== id);
    }
 
    setChecked(arr);
  };

  //Filterd Products
  const FilterProducts = async () => {
 
    const res = await axios.post(
      "http://localhost:8080/api/v1/product/product-filter",
      { checked, radio }
    );
    try {
      setProducts(res.data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) FilterProducts();
  }, [checked, radio]);

  const LoadMore = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(true);
      setProducts((prevProducts) => [...prevProducts, ...res.data.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page]);

  const addCart = (p) => {
    setItem([...item, p]);
    toast.success("Product is added to cart");
    localStorage.setItem(
      `cart${auth?.user?.name}`,
      JSON.stringify([...item, p])
    );
  };

  return (
    <Layout>
      <div className="row mt-3 ">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            <fieldset className="ml-[10px] mb-[80px]">
              <legend className="sr-only">Checkboxes</legend>

              <div className="space-y-2 mx-auto"> 
                {categories?.map((c) => (
                  <label
                    htmlFor="Option3"
                    className="h-[50px] w-[300px] flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50 has-[:checked]:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-900 dark:has-[:checked]:bg-blue-700/10"
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input
                        key={c?._id}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                        type="checkbox"
                        className="size-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900"
                        id="Option3"
                      />
                    </div>

                    <div>
                      <strong className="text-pretty font-medium text-gray-900 dark:text-white">
                        {c?.name}
                      </strong>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
            <fieldset className="space-y-4">
              <legend className="sr-only">Delivery</legend>

              <div>
                {prices.map((p) => (
                  <label className="h-[50px] w-[300px] ml-[10px] mt-[5px] flex cursor-pointer justify-between  rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
                    <div>
                      <p className="text-gray-700 dark:text-gray-200">
                        {p.name}
                      </p>
                    </div>

                    <input
                      onChange={(e) => {
                      
                        const valueArray = JSON.parse(e.target.value);
                        setRadio([...valueArray]);
                      }}
                      type="radio"
                      key={p?._id}
                      name="DeliveryOption"
                      value={JSON.stringify(p?.array)}
                      id="DeliveryPriority"
                      className="size-5 border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                    />
                  </label>
                ))}
              </div>

              <div></div>
            </fieldset>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9 max-w-fit ">
          <h1>
            <faArrowLeft />
            df
          </h1>
          <div className="d-flex ">
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <Product prod={p} addCart={addCart} />
              ))}
            </div>
            {total}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading...." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
