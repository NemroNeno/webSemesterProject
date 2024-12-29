import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/Layouts/context/cart";
import Product from "../Components/Routes/Product";
import { useSearch } from "../Components/Layouts/context/search";
import { useAuth } from "../Components/Layouts/context/auth";
import Carousel from "./Carousal";
import '../App.css';

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Getting All the Categories
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/getall-category"
      );
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
    setSelectedCategory(id);
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
      <div className="row">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 no-scrollbar items-center pb-0 mb-0">
          <li className="me-2 flex overflow-auto scrollbar-hide md:w-4/5">
            {categories?.map((c) => (
              <label
                key={c?._id}
                className={`flex cursor-pointer items-center border border-gray-200 transition hover:bg-gray-50 h-fit p-2 ${selectedCategory === c._id ? "bg-blue-100" : ""}`}
                onClick={() => handleFilter(true, c._id)}
              >
                <strong className="font-medium text-gray-900 dark:text-white overflow-auto text-nowrap">
                  {c?.name}
                </strong>
              </label>
            ))}
          </li>
          <li className="flex-1">
            <div className="relative">
              <button
                id="dropdown-button"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="z-10 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 w-full justify-center"
              >
                <p className="text-sm m-0 p-0 font-semibold">Price Range</p>
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 shadow w-full dark:bg-gray-700 ${dropdownOpen ? "block" : "hidden"}`}
              >
                <ul className="text-gray-700 dark:text-gray-200">
                  {prices.map((p) => (
                    <li key={p?._id}>
                      <button
                        className="w-full cursor-pointer justify-between border border-gray-100 bg-white p-2 shadow-sm hover:border-gray-200"
                        onClick={() => {
                          const valueArray = p.array;
                          setRadio([...valueArray]);
                        }}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
          <li className="flex-3 px-3">
            <button
              className="inline-block cursor-pointer dark:text-gray-500"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </li>
        </ul>
        <div className="relative z-0">
          <Carousel />
        </div>
        <div className="col-12 relative z-10" style={{ marginTop: "-150px" }}>
          <div className="d-flex flex-wrap md:px-5 md:mx-5 md:gap-3">
            {products.map((p) => (
              <Product key={p._id} prod={p} addCart={addCart} />
            ))}
          </div>
          <div className="m-2 p-3 text-center">
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
          <div className="m-2 p-3 text-center">
            <button
              className="btn btn-primary p-2 px-4"
              onClick={() => navigate("/categories")}
            >
              View All Categories
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
