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
     <div className="row">
    
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products List</h1>

        <div className="d-flex flex-wrap">{products?.map((p) => (
        <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`} className="product-link"><div className="card" style={{ width: "18rem" }} >
            <img   src={`http://localhost:8080/api/v1/product/get-productphoto/${p._id}`} className="card-img-top"  />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>
            </div>
            
          </div></Link>
          
        ))}</div>
        
      </div>
      </div>
    </Layout>
  );
};

export default Products;
