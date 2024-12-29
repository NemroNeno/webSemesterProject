import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/Layouts/context/auth.js";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();

  //Getting all the products
  const getAllproducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/product/getall-product_admin/${auth?.user?.id}`
      );
      setProducts(res.data.products);
      products.map((c)=>{
        console.log(c.name);
      })
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }; 

  useEffect(() => {
    getAllproducts();
  }, []);

  return (
    <Layout>
      <AdminMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">All Products List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products?.map((p) => (
            <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`} className="product-link">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between transition-transform transform hover:scale-105">
                <img src={`http://localhost:8080/api/v1/product/get-productphoto/${p._id}`} className="p-8 rounded-t-lg object-cover h-72 w-full" alt="product image" />
                <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{p.name}</h5>
                  <p className="text-gray-600 dark:text-gray-400">{p.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${p.price}</span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
