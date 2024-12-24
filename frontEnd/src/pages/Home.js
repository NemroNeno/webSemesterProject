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
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 no-scrollbar items-center">
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
        {/* <div id="default-carousel" className="relative w-full" data-carousel="slide">
          <div className="relative overflow-hidden rounded-lg" style={{ height: "800px" }}>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src="https://m.media-amazon.com/images/I/51M4JArk-yL._SX1500_.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src="https://m.media-amazon.com/images/I/71VcGrxQRBL._SX3000_.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div>
          </div>
          <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div> */}
        <div className="col-12">
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <Product key={p._id} prod={p} addCart={addCart} />
            ))}
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
