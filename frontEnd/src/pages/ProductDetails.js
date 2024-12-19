import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { json, useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "antd";

const ProductDetails = () => {
  const params = useParams();
  const navigate=useNavigate();

  const [product, setProduct] = useState();
  const [simillar, setSimillar] = useState([]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/product/related-Product/${pid}/${cid}`
      );


      setSimillar([res?.data?.product]);
    
   
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (req, res) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(res?.data?.product);
      if(res?.data?.product._id&&res?.data?.product.category._id)
      getSimilarProduct(res?.data?.product._id,res?.data?.product.category._id);

      console.log(simillar)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          {" "}
          <img
            src={`http://localhost:8080/api/v1/product/get-productphoto/${product?._id}`}
            className="card-img-top"
            height={"400px"}
            width={"200px"}
          />
        </div>
        <div className="col-md-6">
          <h6>Name: {product?.name}</h6>
          <h6>Description: {product?.description}</h6>
          <h6>Price: ${product?.price}</h6>
          <h6>Name: {product?.name}</h6>
          {/* <h6>Category: {product?.category.name}</h6> */}
          <button className="btn btn-secondary m-2">Add to Cart</button>
        </div>
      </div>
      <div className="row m-2">Similar Products
      <div className="d-flex flex-wrap">
      {simillar?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/product/get-productphoto/${p?._id}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p?.name}</h5>
                    <p className="card-text">{p?.description.substring(0,30)}</p>
                    <p className="card-text">${p?.price}</p>
                    <button className="btn btn-primary m-2" onClick={(e)=>{
                      navigate(`/product/${p.slug}`)
                    }}>
                      More details
                    </button>
                    <button className="btn btn-secondary m-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
      </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
